// src/components/HomePage.jsx
import React, { useState, useEffect } from 'react';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from JSON file
    const loadRecipes = async () => {
      try {
        // In a real app, you'd fetch from an API
        // For now, we'll import the JSON directly
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
          <div className="mt-8">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg">
              Add New Recipe
            </button>
          </div>
        </header>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {recipes.map(recipe => (
            <div 
              key={recipe.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
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
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <button className="text-green-600 hover:text-green-800 font-medium text-sm md:text-base transition-colors duration-200">
                    View Recipe →
                  </button>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-gray-500 text-sm">4.5</span>
                  </div>
                </div>
              </div>
              
              {/* Hover Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
            </div>
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