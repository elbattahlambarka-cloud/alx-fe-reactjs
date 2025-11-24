import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations)
  const addFavorite = useRecipeStore((state) => state.addFavorite)
  const favorites = useRecipeStore((state) => state.favorites)

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div style={{ 
      border: '1px solid #4CAF50', 
      padding: '20px', 
      borderRadius: '8px',
      backgroundColor: '#f0fff0',
      marginBottom: '20px'
    }}>
      <h2 style={{ color: '#2e7d32', marginBottom: '15px' }}>💡 Recommended For You</h2>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
        Based on your favorites and preferences
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {recommendations.map((recipe) => (
          <div key={recipe.id} style={{ 
            border: '1px solid #81c784', 
            padding: '15px', 
            borderRadius: '6px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Link 
              to={`/recipe/${recipe.id}`}
              style={{ 
                textDecoration: 'none',
                color: 'inherit',
                flex: 1
              }}
            >
              <h3 style={{ color: 'navy', margin: '0 0 5px 0' }}>{recipe.title}</h3>
              <p style={{ color: '#555', margin: 0, fontSize: '14px' }}>
                {recipe.description}
              </p>
            </Link>
            {!favorites.includes(recipe.id) && (
              <button
                onClick={() => addFavorite(recipe.id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  marginLeft: '10px'
                }}
              >
                ⭐ Favorite
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendationsList