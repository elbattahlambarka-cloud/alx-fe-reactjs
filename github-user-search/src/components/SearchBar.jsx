import { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div style={{ 
      marginBottom: '30px',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        color: '#333',
        marginBottom: '20px',
        fontSize: '2.5rem'
      }}>
        🔍 GitHub User Search
      </h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter GitHub username..."
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0366d6'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: loading ? '#ccc' : '#0366d6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        <p style={{ 
          marginTop: '10px', 
          color: '#666',
          fontSize: '14px'
        }}>
          Search for GitHub users by their username
        </p>
      </form>
    </div>
  );
};

export default SearchBar;