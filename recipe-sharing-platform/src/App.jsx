// src/App.jsx
import RecipeCard from './components/RecipeCard';
import { recipes } from './data/recipes';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🍳 Recipe Sharing Platform
          </h1>
          <p className="text-lg text-gray-600">
            Discover, share, and create delicious recipes from around the world
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
            Add New Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;