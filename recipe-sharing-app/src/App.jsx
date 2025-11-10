import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'
import './App.css'

function App() {
  return (
    <Router>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#333',
          marginBottom: '10px'
        }}>
          🍳 Recipe Sharing App
        </h1>
        
        <p style={{ 
          textAlign: 'center', 
          color: '#666',
          marginBottom: '30px'
        }}>
          Share, discover, and manage your favorite recipes
        </p>
        
        <Routes>
          <Route path="/" element={
            <>
              <AddRecipeForm />
              <FavoritesList />
              <RecommendationsList />
              <SearchBar />
              <RecipeList />
            </>
          } />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App