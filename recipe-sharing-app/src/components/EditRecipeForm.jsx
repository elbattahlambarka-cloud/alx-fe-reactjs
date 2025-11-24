import { useState } from 'react'
import useRecipeStore from './recipeStore'

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(recipe.title)
  const [description, setDescription] = useState(recipe.description)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (title.trim() && description.trim()) {
      updateRecipe(recipe.id, { title, description })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setTitle(recipe.title)
    setDescription(recipe.description)
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#FFA500',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Edit Recipe
      </button>
    )
  }

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '15px', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ marginBottom: '15px' }}>Edit Recipe</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          style={{
            display: 'block',
            width: '100%',
            padding: '8px',
            margin: '5px 0',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          rows="3"
          style={{
            display: 'block',
            width: '100%',
            padding: '8px',
            margin: '5px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            resize: 'vertical'
          }}
          required
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Save
          </button>
          <button 
            type="button"
            onClick={handleCancel}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditRecipeForm