import { useState } from 'react';
import { fetchUserData, advancedSearch } from '../services/githubService';

const Search = () => {
  const [searchType, setSearchType] = useState('basic');
  const [username, setUsername] = useState('');
  const [advancedParams, setAdvancedParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: '',
    sort: 'best-match',
  });
  const [userData, setUserData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);
    setSearchResults(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    if (!advancedParams.username.trim() && !advancedParams.location.trim()) {
      setError('Please provide at least a username or location to search');
      return;
    }

    setLoading(true);
    setError(null);
    setUserData(null);
    setSearchResults(null);

    try {
      const data = await advancedSearch({
        ...advancedParams,
        page: currentPage,
      });
      setSearchResults(data);
    } catch (err) {
      setError('Failed to search users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    setLoading(true);

    try {
      const data = await advancedSearch({
        ...advancedParams,
        page: nextPage,
      });
      setSearchResults(prev => ({
        ...data,
        users: [...prev.users, ...data.users],
      }));
      setCurrentPage(nextPage);
    } catch (err) {
      setError('Failed to load more users');
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setUsername('');
    setAdvancedParams({
      username: '',
      location: '',
      minRepos: '',
      language: '',
      sort: 'best-match',
    });
    setUserData(null);
    setSearchResults(null);
    setError(null);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🔍 GitHub User Search
          </h1>
          <p className="text-lg text-gray-600">
            Find GitHub users with advanced search capabilities
          </p>
        </div>

        {/* Search Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 border">
            <button
              onClick={() => setSearchType('basic')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                searchType === 'basic'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Basic Search
            </button>
            <button
              onClick={() => setSearchType('advanced')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                searchType === 'advanced'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Advanced Search
            </button>
          </div>
        </div>

        {/* Search Forms */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {searchType === 'basic' ? (
            // Basic Search Form
            <form onSubmit={handleBasicSearch} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter GitHub username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Searching...' : 'Search User'}
                </button>
                <button
                  type="button"
                  onClick={resetSearch}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          ) : (
            // Advanced Search Form
            <form onSubmit={handleAdvancedSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="adv-username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username (optional)
                  </label>
                  <input
                    type="text"
                    id="adv-username"
                    value={advancedParams.username}
                    onChange={(e) => setAdvancedParams(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Filter by username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location (optional)
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={advancedParams.location}
                    onChange={(e) => setAdvancedParams(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Filter by location"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Repositories (optional)
                  </label>
                  <input
                    type="number"
                    id="minRepos"
                    value={advancedParams.minRepos}
                    onChange={(e) => setAdvancedParams(prev => ({ ...prev, minRepos: e.target.value }))}
                    placeholder="e.g., 10"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                    Programming Language (optional)
                  </label>
                  <input
                    type="text"
                    id="language"
                    value={advancedParams.language}
                    onChange={(e) => setAdvancedParams(prev => ({ ...prev, language: e.target.value }))}
                    placeholder="e.g., JavaScript"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Searching...' : 'Advanced Search'}
                </button>
                <button
                  type="button"
                  onClick={resetSearch}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-600 font-medium">{error}</div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Searching GitHub users...</p>
          </div>
        )}

        {/* Basic Search Results */}
        {userData && !loading && !error && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Found</h2>
            <UserCard user={userData} />
          </div>
        )}

        {/* Advanced Search Results */}
        {searchResults && !loading && !error && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results ({searchResults.total_count} users found)
              </h2>
              {searchResults.incomplete_results && (
                <span className="text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                  Some results may be incomplete
                </span>
              )}
            </div>
            
            {/* This is the key part - using map function to display results */}
            <div className="space-y-4">
              {searchResults.users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            {/* Load More Button */}
            {searchResults.users.length < searchResults.total_count && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-gray-100 text-gray-700 py-3 px-8 rounded-lg font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Loading...' : 'Load More Users'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// User Card Component with enhanced display
const UserCard = ({ user }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-16 h-16 rounded-full border-2 border-gray-200"
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {user.name || user.login}
              </h3>
              <p className="text-gray-600">@{user.login}</p>
              {user.bio && (
                <p className="text-gray-700 mt-2 text-sm">{user.bio}</p>
              )}
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              View Profile
            </a>
          </div>

          {/* Enhanced User Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{user.public_repos || 0}</div>
              <div className="text-sm text-gray-600">Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{user.followers || 0}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{user.following || 0}</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {user.public_gists || 0}
              </div>
              <div className="text-sm text-gray-600">Gists</div>
            </div>
          </div>

          {/* Enhanced Additional Info - location and more details */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            {user.location && (
              <span className="flex items-center gap-1">
                📍 {user.location}
              </span>
            )}
            {user.company && (
              <span className="flex items-center gap-1">
                🏢 {user.company}
              </span>
            )}
            {user.blog && (
              <span className="flex items-center gap-1">
                🌐 <a href={user.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{user.blog}</a>
              </span>
            )}
            {user.twitter_username && (
              <span className="flex items-center gap-1">
                🐦 @{user.twitter_username}
              </span>
            )}
          </div>

          {/* Created at information */}
          {user.created_at && (
            <div className="mt-3 text-xs text-gray-500">
              Joined GitHub: {new Date(user.created_at).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;