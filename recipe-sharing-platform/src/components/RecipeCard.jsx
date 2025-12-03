// src/components/RecipeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <Link 
      to={`/recipe/${recipe.id}`} 
      className="block"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full cursor-pointer">
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
  );
}

export default RecipeCard;