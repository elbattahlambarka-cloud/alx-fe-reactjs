import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const FavoritesList = () => {
  const favorites = useRecipeStore((state) => 
    state.favorites.map(id => state.recipes.find(recipe => recipe.id === id)).filter(Boolean)
  )
  const removeFavorite = useRecipeStore((state) => state.removeFavorite)

  if (favorites.length === 0) {
    return (
      <div style={{ 
        border: '1px solid #ffd700', 
        padding: '20px', 
        borderRadius: '8px',
        backgroundColor: '#fffdf0',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#b8860b', marginBottom: '10px' }}>⭐ My Favorites</h2>
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          You haven't added any favorites yet. Click the star icon on recipes to add them to your favorites!
        </p>
      </div>
    )
  }

  return (
    <div style={{ 
      border: '1px solid #ffd700', 
      padding: '20px', 
      borderRadius: '8px',
      backgroundColor: '#fffdf0',
      marginBottom: '20px'
    }}>
      <h2 style={{ color: '#b8860b', marginBottom: '15px' }}>⭐ My Favorites ({favorites.length})</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {favorites.map((recipe) => (
          <div key={recipe.id} style={{ 
            border: '1px solid #ffeb3b', 
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
            <button
              onClick={() => removeFavorite(recipe.id)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                marginLeft: '10px'
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritesList