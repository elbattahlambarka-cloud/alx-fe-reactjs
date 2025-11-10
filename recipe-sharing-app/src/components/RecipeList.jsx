import useRecipeStore from '../store/recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ 
            border: '1px solid #ccc', 
            padding: '15px', 
            margin: '10px 0',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: 'navy', marginBottom: '10px' }}>{recipe.title}</h3>
            <p style={{ color: '#555' }}>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default RecipeList