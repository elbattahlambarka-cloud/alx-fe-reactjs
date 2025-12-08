// src/components/PostsComponent.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Function to fetch posts from API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

function PostsComponent() {
  const [showDetails, setShowDetails] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Use React Query to fetch posts
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    isFetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Function to toggle post details
  const togglePostDetails = (postId) => {
    setShowDetails(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    setSelectedPostId(postId);
  };

  // Function to clear cache and refetch
  const handleForceRefresh = () => {
    refetch();
  };

  // Function to simulate navigation away and back
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  if (!isComponentVisible) {
    return (
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Component Hidden (Simulating Navigation)
        </h2>
        <p className="text-gray-600 mb-6">
          The component is unmounted. Click the button below to remount it and observe caching behavior.
        </p>
        <button
          onClick={() => setIsComponentVisible(true)}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
        >
          Show Posts Component
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Header with controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Posts from JSONPlaceholder API
            </h2>
            <p className="text-gray-600">
              Demonstrating React Query's caching, loading states, and refetching
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleForceRefresh}
              disabled={isRefetching}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
              {isRefetching ? 'Refreshing...' : 'Force Refresh'}
            </button>
            
            <button
              onClick={() => setIsComponentVisible(false)}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Hide Component
            </button>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${isFetching ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
            <span className="text-sm text-gray-600">
              {isFetching ? 'Fetching data...' : 'Data ready'}
            </span>
          </div>
          
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${isRefetching ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm text-gray-600">
              {isRefetching ? 'Refetching...' : 'Not refetching'}
            </span>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            Error Loading Posts
          </h3>
          <p className="text-red-600 mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
          >
            Retry
          </button>
        </div>
      )}

      {/* Success state - Display posts */}
      {!isLoading && !isError && posts && (
        <>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">
              React Query Cache Behavior:
            </h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Data is automatically cached for 5 minutes</li>
              <li>• Click "Hide Component" then "Show Posts" to see cache in action</li>
              <li>• "Force Refresh" bypasses cache and fetches fresh data</li>
              <li>• Background refetching is disabled for demonstration</li>
            </ul>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Posts ({posts.length})
              </h3>
              <span className="text-sm text-gray-500">
                Click on any post to view details
              </span>
            </div>
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 12).map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      Post #{post.id}
                    </span>
                    <span className="text-xs text-gray-500">
                      User {post.userId}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.body}
                  </p>
                  
                  <button
                    onClick={() => togglePostDetails(post.id)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                  >
                    {showDetails[post.id] ? 'Hide Details' : 'View Details'}
                    <svg 
                      className={`ml-1 w-4 h-4 transition-transform ${showDetails[post.id] ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Detailed view */}
                  {showDetails[post.id] && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-gray-700 text-sm">{post.body}</p>
                      <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                        <span>Post ID: {post.id}</span>
                        <span>User ID: {post.userId}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Cache demonstration info */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-3">
              Cache Demonstration Instructions:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">1. Observe Caching:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Click "Hide Component" button</li>
                  <li>• Wait a few seconds</li>
                  <li>• Click "Show Posts Component"</li>
                  <li>• Note: No loading spinner appears (data from cache)</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">2. Observe Refetching:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Click "Force Refresh" button</li>
                  <li>• Loading spinner appears briefly</li>
                  <li>• Fresh data is fetched from API</li>
                  <li>• Cache is updated with new data</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>
          This demo uses React Query to manage data fetching, caching, and state.
          Check the React Query DevTools (bottom-right) to inspect cache behavior.
        </p>
        <p className="mt-2">
          API: <a 
            href="https://jsonplaceholder.typicode.com/posts" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://jsonplaceholder.typicode.com/posts
          </a>
        </p>
      </div>
    </div>
  );
}

export default PostsComponent;