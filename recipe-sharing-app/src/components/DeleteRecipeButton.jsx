import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe)
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = () => {
    deleteRecipe(recipeId)
    navigate('/')
  }

  if (!showConfirm) {
    return (
      <button
        onClick={() => setShowConfirm(true)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Delete Recipe
      </button>
    )
  }

  return (
    <div style={{ 
      border: '1px solid #ff6b6b', 
      padding: '15px', 
      borderRadius: '8px',
      backgroundColor: '#ffe6e6'
    }}>
      <p style={{ marginBottom: '10px', color: '#d32f2f' }}>
        Are you sure you want to delete this recipe?
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={handleDelete}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Yes, Delete
        </button>
        <button 
          onClick={() => setShowConfirm(false)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#757575',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteRecipeButton