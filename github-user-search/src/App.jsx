import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import githubService from './services/githubApi';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await githubService.searchUsers(query);
      // Fetch detailed information for each user
      const usersWithDetails = await Promise.all(
        response.items.map(async (user) => {
          try {
            const userDetails = await githubService.getUser(user.login);
            return userDetails;
          } catch (err) {
            console.error(`Error fetching details for ${user.login}:`, err);
            return user; // Return basic user info if details fetch fails
          }
        })
      );
      setUsers(usersWithDetails);
    } catch (err) {
      setError('Failed to search users. Please try again.');
      console.error('Search error:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f6f8fa',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto'
      }}>
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {error && (
          <div style={{
            padding: '16px',
            backgroundColor: '#ffebe9',
            border: '1px solid #ff8182',
            borderRadius: '6px',
            marginBottom: '20px',
            color: '#cf222e'
          }}>
            {error}
          </div>
        )}
        
        <UserList users={users} loading={loading} />
      </div>
    </div>
  );
}

export default App;