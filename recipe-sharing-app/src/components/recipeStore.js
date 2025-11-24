import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper."
    },
    {
      id: 2, 
      title: "Chocolate Chip Cookies",
      description: "Soft and chewy cookies with melted chocolate chips."
    },
    {
      id: 3,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy stir fry with fresh vegetables and soy sauce."
    },
    {
      id: 4,
      title: "Chicken Alfredo Pasta",
      description: "Creamy pasta with grilled chicken and Parmesan cheese."
    },
    {
      id: 5,
      title: "Berry Smoothie Bowl",
      description: "Healthy breakfast bowl with mixed berries and granola."
    },
    {
      id: 6,
      title: "Beef Tacos",
      description: "Mexican-style tacos with seasoned ground beef and fresh toppings."
    }
  ],
  searchTerm: '',
  filteredRecipes: [
    // same initial recipes
  ],
  favorites: [],
  recommendations: [],
  
  // Initialize filtered recipes
  setRecipes: (recipes) => set({ 
    recipes, 
    filteredRecipes: recipes,
    recommendations: recipes.slice(0, 2) // Initial recommendations
  }),
  
  // Recipe management actions
  addRecipe: (newRecipe) => set((state) => {
    const updatedRecipes = [...state.recipes, newRecipe]
    return { 
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    }
  }),
  
  updateRecipe: (id, updatedRecipe) => set((state) => {
    const updatedRecipes = state.recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    }
  }),
  
  deleteRecipe: (id) => set((state) => {
    const updatedRecipes = state.recipes.filter((recipe) => recipe.id !== id)
    const updatedFavorites = state.favorites.filter(favId => favId !== id)
    return {
      recipes: updatedRecipes,
      favorites: updatedFavorites,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    }
  }),
  
  // Search and filtering actions
  setSearchTerm: (term) => set((state) => {
    const filtered = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term.toLowerCase()) ||
      recipe.description.toLowerCase().includes(term.toLowerCase())
    )
    return { 
      searchTerm: term,
      filteredRecipes: filtered
    }
  }),
  
  // Favorites actions
  addFavorite: (recipeId) => set((state) => {
    const newFavorites = state.favorites.includes(recipeId) 
      ? state.favorites 
      : [...state.favorites, recipeId]
    
    // Generate new recommendations when favorites change
    const recommendations = get().generateRecommendations(newFavorites, state.recipes)
    
    return { 
      favorites: newFavorites,
      recommendations 
    }
  }),
  
  removeFavorite: (recipeId) => set((state) => {
    const newFavorites = state.favorites.filter(id => id !== recipeId)
    
    // Generate new recommendations when favorites change
    const recommendations = get().generateRecommendations(newFavorites, state.recipes)
    
    return { 
      favorites: newFavorites,
      recommendations 
    }
  }),
  
  toggleFavorite: (recipeId) => set((state) => {
    const isCurrentlyFavorite = state.favorites.includes(recipeId)
    const newFavorites = isCurrentlyFavorite
      ? state.favorites.filter(id => id !== recipeId)
      : [...state.favorites, recipeId]
    
    // Generate new recommendations when favorites change
    const recommendations = get().generateRecommendations(newFavorites, state.recipes)
    
    return { 
      favorites: newFavorites,
      recommendations 
    }
  }),
  
  // Recommendations logic
  generateRecommendations: (favorites, allRecipes) => {
    if (favorites.length === 0) {
      // If no favorites, show random recipes
      return allRecipes
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
    }
    
    // Find recipes similar to favorites (mock implementation)
    const favoriteTitles = favorites.map(favId => {
      const recipe = allRecipes.find(r => r.id === favId)
      return recipe ? recipe.title.toLowerCase() : ''
    })
    
    // Recommend recipes that share keywords with favorites
    const recommendations = allRecipes
      .filter(recipe => !favorites.includes(recipe.id)) // Don't recommend already favorited
      .filter(recipe => {
        const title = recipe.title.toLowerCase()
        return favoriteTitles.some(favTitle => 
          title.includes(favTitle.split(' ')[0]) || // Share first word
          favTitle.includes(title.split(' ')[0])
        )
      })
      .slice(0, 3) // Limit to 3 recommendations
    
    // If not enough recommendations, add random ones
    if (recommendations.length < 3) {
      const randomRecipes = allRecipes
        .filter(recipe => !favorites.includes(recipe.id) && !recommendations.includes(recipe))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3 - recommendations.length)
      
      return [...recommendations, ...randomRecipes]
    }
    
    return recommendations
  }
}))

// Initialize recommendations
useRecipeStore.getState().setRecipes(useRecipeStore.getState().recipes)

export default useRecipeStore