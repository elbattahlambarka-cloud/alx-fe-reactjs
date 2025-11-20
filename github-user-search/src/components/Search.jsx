import { useState } from 'react';
import githubService from '../services/githubApi';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await githubService.fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#333',
        marginBottom: '30px'
      }}>
        GitHub User Search
      </h1>

      {/* Search Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '6px',
              outline: 'none'
            }}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: loading ? '#ccc' : '#0366d6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            Search
          </button>
        </div>
      </form>

      {/* Loading State */}
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          fontSize: '18px',
          color: '#666'
        }}>
          Loading...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          border: '1px solid #ff6b6b',
          borderRadius: '6px',
          backgroundColor: '#ffe6e6'
        }}>
          <p style={{ 
            fontSize: '18px', 
            color: '#d32f2f',
            margin: 0
          }}>
            {error}
          </p>
        </div>
      )}

      {/* User Data Display */}
      {userData && !loading && !error && (
        <div style={{ 
          border: '1px solid #e1e4e8',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '2px solid #e1e4e8'
              }}
            />
            <div>
              <h2 style={{ 
                margin: '0 0 8px 0',
                color: '#0366d6',
                fontSize: '24px'
              }}>
                {userData.name || userData.login}
              </h2>
              <p style={{ 
                margin: '0 0 8px 0',
                color: '#586069',
                fontSize: '16px'
              }}>
                @{userData.login}
              </p>
              {userData.bio && (
                <p style={{ 
                  margin: '8px 0',
                  color: '#24292e',
                  fontSize: '14px'
                }}>
                  {userData.bio}
                </p>
              )}
            </div>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0366d6' }}>
                {userData.public_repos}
              </div>
              <div style={{ fontSize: '14px', color: '#586069' }}>Repositories</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0366d6' }}>
                {userData.followers}
              </div>
              <div style={{ fontSize: '14px', color: '#586069' }}>Followers</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0366d6' }}>
                {userData.following}
              </div>
              <div style={{ fontSize: '14px', color: '#586069' }}>Following</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 20px',
                backgroundColor: '#0366d6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              View GitHub Profile
            </a>
            {userData.blog && (
              <a
                href={userData.blog}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f6f8fa',
                  color: '#24292e',
                  textDecoration: 'none',
                  border: '1px solid #e1e4e8',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Website
              </a>
            )}
          </div>

          {userData.location && (
            <div style={{ 
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#f6f8fa',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#586069'
            }}>
              📍 {userData.location}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;