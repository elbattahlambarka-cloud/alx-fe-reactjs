import useRecipeStore from './recipeStore'

const SearchBar = () => {
  const searchTerm = useRecipeStore((state) => state.searchTerm)
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm)

  return (
    <div style={{ 
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px'
    }}>
      <input
        type="text"
        placeholder="Search recipes by title or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          outline: 'none'
        }}
      />
      {searchTerm && (
        <div style={{ 
          marginTop: '10px', 
          fontSize: '14px', 
          color: '#666' 
        }}>
          Found {useRecipeStore.getState().filteredRecipes.length} recipes matching "{searchTerm}"
        </div>
      )}
    </div>
  )
}

export default SearchBar