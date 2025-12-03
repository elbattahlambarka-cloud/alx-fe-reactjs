// src/components/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // ✅ This line is REQUIRED

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error loading recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-green-600">Loading delicious recipes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            🍳 Recipe Sharing Platform
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover, share, and create delicious recipes from around the world. 
            Browse our collection and find your next favorite dish!
          </p>
          <Link to="/add-recipe">
  <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg">
    Add New Recipe
  </button>
</Link>
        </header>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {recipes.map(recipe => (
            <Link 
              to={`/recipe/${recipe.id}`} 
              key={recipe.id}
              className="block" // ✅ Link wrapper with className="block"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                {/* Recipe Image */}
                <div className="h-56 md:h-64 overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Recipe Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-green-700 transition-colors duration-200">
                    {recipe.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {recipe.summary}
                  </p>
                  
                  {/* Recipe Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>⏱️ {recipe.prepTime}</span>
                    <span>👥 Serves {recipe.servings}</span>
                    <span>📊 {recipe.difficulty}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 hover:text-green-800 font-medium text-sm md:text-base transition-colors duration-200">
                      View Recipe →
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-gray-500 text-sm">4.5</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Recipes Found</h3>
            <p className="text-gray-500">Be the first to add a recipe!</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>Showing {recipes.length} delicious recipes</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;