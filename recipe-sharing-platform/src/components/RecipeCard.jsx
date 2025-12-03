// src/components/RecipeCard.jsx
import React from 'react';

function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500"></div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h3>
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-green-600">{recipe.category}</span>
          <span className="text-sm text-gray-500">⭐ {recipe.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;