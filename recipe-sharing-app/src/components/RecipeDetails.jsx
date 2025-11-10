import { useParams, Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'
import EditRecipeForm from './EditRecipeForm'
import DeleteRecipeButton from './DeleteRecipeButton'

const RecipeDetails = () => {
  const { id } = useParams()
  const recipeId = parseInt(id)
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  )

  if (!recipe) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Recipe not found</h2>
        <Link to="/" style={{ color: 'blue', textDecoration: 'none' }}>
          ← Back to Recipes
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Link 
        to="/" 
        style={{ 
          color: 'blue', 
          textDecoration: 'none',
          marginBottom: '20px',
          display: 'inline-block'
        }}
      >
        ← Back to Recipes
      </Link>
      
      <div style={{ 
        border: '1px solid #ccc', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h1 style={{ color: 'navy', marginBottom: '15px' }}>{recipe.title}</h1>
        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6',
          color: '#555',
          marginBottom: '20px'
        }}>
          {recipe.description}
        </p>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <EditRecipeForm recipe={recipe} />
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails