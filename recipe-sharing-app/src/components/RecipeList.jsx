import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes)
  const searchTerm = useRecipeStore((state) => state.searchTerm)

  const displayRecipes = searchTerm ? filteredRecipes : recipes

  return (
    <div>
      <h2>Recipes {searchTerm && `(Search: "${searchTerm}")`}</h2>
      
      {displayRecipes.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          color: '#666'
        }}>
          {searchTerm ? (
            <div>
              <p>No recipes found matching "{searchTerm}"</p>
              <p>Try a different search term or check your spelling.</p>
            </div>
          ) : (
            <p>No recipes yet. Add your first recipe!</p>
          )}
        </div>
      ) : (
        displayRecipes.map((recipe) => (
          <div key={recipe.id} style={{ 
            border: '1px solid #ccc', 
            padding: '15px', 
            margin: '10px 0',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            backgroundColor: 'white'
          }}>
            <Link 
              to={`/recipe/${recipe.id}`}
              style={{ 
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <h3 style={{ 
                color: 'navy', 
                marginBottom: '10px',
                fontSize: '20px'
              }}>
                {recipe.title}
              </h3>
              <p style={{ 
                color: '#555',
                lineHeight: '1.5'
              }}>
                {recipe.description}
              </p>
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

export default RecipeList