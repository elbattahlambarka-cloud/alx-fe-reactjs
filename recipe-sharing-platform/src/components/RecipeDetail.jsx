// src/components/RecipeDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data.json');
        const recipes = await response.json();
        const foundRecipe = recipes.find(r => r.id === parseInt(id));
        
        if (foundRecipe) {
          setRecipe(foundRecipe);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to load recipe');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-green-600">Loading recipe details...</div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist.</p>
          <Link 
            to="/" 
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              to="/" 
              className="text-green-600 hover:text-green-800 font-semibold text-lg flex items-center"
            >
              ← Back to Recipes
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Recipe Details</h1>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Recipe Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="md:flex">
            {/* Recipe Image */}
            <div className="md:w-1/2">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            
            {/* Recipe Info */}
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {recipe.title}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                {recipe.description}
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">⏱️</div>
                  <div className="text-sm text-gray-600">Prep Time</div>
                  <div className="font-semibold">{recipe.prepTime}</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-700">🔥</div>
                  <div className="text-sm text-gray-600">Cook Time</div>
                  <div className="font-semibold">{recipe.cookTime}</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">👥</div>
                  <div className="text-sm text-gray-600">Servings</div>
                  <div className="font-semibold">{recipe.servings}</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">📊</div>
                  <div className="text-sm text-gray-600">Difficulty</div>
                  <div className="font-semibold">{recipe.difficulty}</div>
                </div>
              </div>
              
              {/* Nutrition Info */}
              {recipe.nutrition && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Nutrition Facts (per serving)</h3>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="text-center">
                      <div className="font-bold">{recipe.nutrition.calories}</div>
                      <div className="text-gray-500">Calories</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{recipe.nutrition.protein}</div>
                      <div className="text-gray-500">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{recipe.nutrition.carbs}</div>
                      <div className="text-gray-500">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{recipe.nutrition.fat}</div>
                      <div className="text-gray-500">Fat</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
              🛒 Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
              👨‍🍳 Cooking Instructions
            </h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex">
                  <span className="bg-green-100 text-green-800 font-bold rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
            Print Recipe
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
            Save Recipe
          </button>
          <Link 
            to="/" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition duration-300 text-center"
          >
            Back to All Recipes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;