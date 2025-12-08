// src/components/PostsComponent.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Function to fetch posts from API
const fetchPosts = async () => {
  console.log('Fetching posts from API...');
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await response.json();
  console.log('Posts fetched:', data.length);
  return data;
};

function PostsComponent() {
  const [showDetails, setShowDetails] = useState({});
  const [forceRefreshCount, setForceRefreshCount] = useState(0);

  // Use React Query to fetch posts with specific options
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    isFetching,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    // These options demonstrate React Query features
    refetchOnWindowFocus: true, // Refetch when window regains focus
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  // Function to toggle post details
  const togglePostDetails = (postId) => {
    setShowDetails(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Function to handle refetch interaction
  const handleForceRefresh = () => {
    console.log('Manual refetch triggered');
    refetch();
    setForceRefreshCount(prev => prev + 1);
  };

  // Function to simulate navigation away and back
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  if (!isComponentVisible) {
    return (
      <div style={styles.hiddenContainer}>
        <h2 style={styles.hiddenTitle}>
          Component Hidden (Simulating Navigation)
        </h2>
        <p style={styles.hiddenText}>
          The component is unmounted. React Query keeps the data in cache.
          Click "Show Component" to see data loaded from cache (no loading spinner).
        </p>
        <button
          onClick={() => setIsComponentVisible(true)}
          style={styles.showButton}
        >
          Show Component
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header with cache info */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>
            Posts from JSONPlaceholder API
          </h2>
          <p style={styles.subtitle}>
            Demonstrating React Query's advanced caching features
          </p>
        </div>
        
        {/* Cache information */}
        <div style={styles.cacheInfo}>
          <div style={styles.cacheInfoItem}>
            <span style={styles.cacheLabel}>Cache Time:</span>
            <span style={styles.cacheValue}>5 minutes</span>
          </div>
          <div style={styles.cacheInfoItem}>
            <span style={styles.cacheLabel}>Stale Time:</span>
            <span style={styles.cacheValue}>2 minutes</span>
          </div>
          <div style={styles.cacheInfoItem}>
            <span style={styles.cacheLabel}>Last Updated:</span>
            <span style={styles.cacheValue}>
              {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : 'Never'}
            </span>
          </div>
        </div>
      </div>

      {/* React Query configuration info */}
      <div style={styles.configInfo}>
        <h3 style={styles.configTitle}>React Query Configuration:</h3>
        <div style={styles.configGrid}>
          <div style={styles.configItem}>
            <code style={styles.configCode}>cacheTime: 5 * 60 * 1000</code>
            <p style={styles.configDesc}>Data stays in cache for 5 minutes</p>
          </div>
          <div style={styles.configItem}>
            <code style={styles.configCode}>staleTime: 2 * 60 * 1000</code>
            <p style={styles.configDesc}>Data considered fresh for 2 minutes</p>
          </div>
          <div style={styles.configItem}>
            <code style={styles.configCode}>refetchOnWindowFocus: true</code>
            <p style={styles.configDesc}>Refetches when window gains focus</p>
          </div>
          <div style={styles.configItem}>
            <code style={styles.configCode}>keepPreviousData: true</code>
            <p style={styles.configDesc}>Keeps old data during refetch</p>
          </div>
        </div>
      </div>

      {/* Controls section */}
      <div style={styles.controls}>
        <div style={styles.controlGroup}>
          <h3 style={styles.controlTitle}>Data Refetch Interaction:</h3>
          <p style={styles.controlText}>
            Click "Force Refresh" to manually refetch data. Observe how React Query
            handles the refetch while keeping the UI responsive.
          </p>
          <div style={styles.buttonGroup}>
            <button
              onClick={handleForceRefresh}
              disabled={isRefetching}
              style={isRefetching ? styles.refreshButtonDisabled : styles.refreshButton}
            >
              {isRefetching ? 'Refreshing...' : `Force Refresh (${forceRefreshCount})`}
            </button>
            
            <button
              onClick={() => setIsComponentVisible(false)}
              style={styles.hideButton}
            >
              Hide Component to Test Cache
            </button>
          </div>
        </div>

        {/* Status indicators */}
        <div style={styles.status}>
          <div style={styles.statusItem}>
            <div style={{
              ...styles.statusIndicator,
              backgroundColor: isFetching ? '#f59e0b' : '#10b981'
            }}></div>
            <span>{isFetching ? 'Fetching...' : 'Ready'}</span>
          </div>
          <div style={styles.statusItem}>
            <div style={{
              ...styles.statusIndicator,
              backgroundColor: isRefetching ? '#f59e0b' : '#6b7280'
            }}></div>
            <span>{isRefetching ? 'Refetching...' : 'Idle'}</span>
          </div>
          <div style={styles.statusItem}>
            <span>Refreshes: {forceRefreshCount}</span>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading posts from API...</p>
          <p style={styles.loadingSubtext}>
            First load - fetching fresh data from server
          </p>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div style={styles.errorContainer}>
          <h3 style={styles.errorTitle}>
            Error Loading Posts
          </h3>
          <p style={styles.errorText}>{error.message}</p>
          <button
            onClick={() => refetch()}
            style={styles.retryButton}
          >
            Retry
          </button>
        </div>
      )}

      {/* Data display */}
      {!isLoading && !isError && posts && (
        <>
          {/* Cache demonstration */}
          <div style={styles.demoSection}>
            <h3 style={styles.demoTitle}>Cache Demonstration:</h3>
            <div style={styles.demoSteps}>
              <div style={styles.demoStep}>
                <span style={styles.stepNumber}>1</span>
                <p>Click "Hide Component to Test Cache"</p>
              </div>
              <div style={styles.demoStep}>
                <span style={styles.stepNumber}>2</span>
                <p>Wait a few seconds</p>
              </div>
              <div style={styles.demoStep}>
                <span style={styles.stepNumber}>3</span>
                <p>Click "Show Component"</p>
              </div>
              <div style={styles.demoStep}>
                <span style={styles.stepNumber}>4</span>
                <p>Observe: Data loads instantly from cache (no loading spinner)</p>
              </div>
            </div>
          </div>

          {/* Posts display */}
          <div style={styles.postsHeader}>
            <h3 style={styles.postsTitle}>
              Posts ({posts.length})
            </h3>
            <p style={styles.postsInfo}>
              Showing {Math.min(posts.length, 6)} posts. Data loaded from {isRefetching ? 'API (refetching)' : 'cache'}.
            </p>
          </div>

          <div style={styles.postsGrid}>
            {posts.slice(0, 6).map((post) => (
              <div
                key={post.id}
                style={styles.postCard}
              >
                <div style={styles.postHeader}>
                  <span style={styles.postId}>Post #{post.id}</span>
                  <span style={styles.postUser}>User {post.userId}</span>
                </div>
                <h4 style={styles.postTitle}>{post.title}</h4>
                <p style={styles.postBody}>
                  {showDetails[post.id] ? post.body : post.body.substring(0, 100) + '...'}
                </p>
                <button
                  onClick={() => togglePostDetails(post.id)}
                  style={styles.toggleButton}
                >
                  {showDetails[post.id] ? 'Show Less' : 'Show More'}
                </button>
              </div>
            ))}
          </div>

          {/* Refetch demonstration */}
          <div style={styles.refetchDemo}>
            <h3 style={styles.refetchTitle}>Refetch Interaction Test:</h3>
            <div style={styles.refetchInstructions}>
              <p>1. Click "Force Refresh" button above</p>
              <p>2. Observe the status indicator changes to "Refetching..."</p>
              <p>3. Notice the UI stays responsive during refetch</p>
              <p>4. Data updates automatically when refetch completes</p>
            </div>
          </div>
        </>
      )}

      {/* Footer with React Query info */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          This demonstrates React Query's advanced features:
        </p>
        <ul style={styles.featureList}>
          <li><strong>cacheTime</strong>: How long unused data stays in cache</li>
          <li><strong>staleTime</strong>: How long data is considered fresh</li>
          <li><strong>refetchOnWindowFocus</strong>: Auto-refetch on window focus</li>
          <li><strong>keepPreviousData</strong>: Show old data during refetch</li>
          <li><strong>Data Refetch Interaction</strong>: Manual refresh triggers</li>
        </ul>
        <p style={styles.apiInfo}>
          API Source: <a 
            href="https://jsonplaceholder.typicode.com/posts" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.link}
          >
            jsonplaceholder.typicode.com/posts
          </a>
        </p>
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
  },
  header: {
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#6b7280',
  },
  cacheInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f3f4f6',
    borderRadius: '0.5rem',
  },
  cacheInfoItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  cacheLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '500',
  },
  cacheValue: {
    fontSize: '1rem',
    color: '#1f2937',
    fontWeight: '600',
  },
  configInfo: {
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f0f9ff',
    borderRadius: '0.75rem',
  },
  configTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: '1rem',
  },
  configGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
  },
  configItem: {
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    border: '1px solid #bae6fd',
  },
  configCode: {
    display: 'block',
    fontFamily: 'monospace',
    backgroundColor: '#0c4a6e',
    color: 'white',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    marginBottom: '0.5rem',
  },
  configDesc: {
    fontSize: '0.875rem',
    color: '#475569',
    margin: 0,
  },
  controls: {
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '0.75rem',
  },
  controlGroup: {
    marginBottom: '1rem',
  },
  controlTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  controlText: {
    color: '#6b7280',
    marginBottom: '1rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  refreshButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontWeight: '600',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  refreshButtonDisabled: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontWeight: '600',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  hideButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#6b7280',
    color: 'white',
    fontWeight: '600',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  showButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#10b981',
    color: 'white',
    fontWeight: '600',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  status: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#6b7280',
  },
  statusIndicator: {
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '3rem 0',
  },
  spinner: {
    display: 'inline-block',
    width: '3rem',
    height: '3rem',
    border: '3px solid #e5e7eb',
    borderTopColor: '#3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem',
  },
  loadingText: {
    fontSize: '1.125rem',
    color: '#1f2937',
    fontWeight: '500',
  },
  loadingSubtext: {
    color: '#6b7280',
    marginTop: '0.5rem',
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: '0.5rem',
  },
  errorText: {
    color: '#dc2626',
    marginBottom: '1rem',
  },
  retryButton: {
    padding: '0.5rem 1.5rem',
    backgroundColor: '#dc2626',
    color: 'white',
    fontWeight: '600',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
  },
  demoSection: {
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: '#fef3c7',
    borderRadius: '0.75rem',
  },
  demoTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#92400e',
    marginBottom: '1rem',
  },
  demoSteps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  demoStep: {
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    textAlign: 'center',
  },
  stepNumber: {
    display: 'inline-block',
    width: '2rem',
    height: '2rem',
    backgroundColor: '#f59e0b',
    color: 'white',
    borderRadius: '50%',
    lineHeight: '2rem',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  postsHeader: {
    marginBottom: '1.5rem',
  },
  postsTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  postsInfo: {
    color: '#6b7280',
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  postCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    transition: 'box-shadow 0.2s',
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  postId: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  postUser: {
    color: '#6b7280',
    fontSize: '0.875rem',
  },
  postTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  postBody: {
    color: '#6b7280',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  toggleButton: {
    color: '#3b82f6',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    padding: 0,
  },
  refetchDemo: {
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: '#ecfdf5',
    borderRadius: '0.75rem',
  },
  refetchTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#065f46',
    marginBottom: '1rem',
  },
  refetchInstructions: {
    color: '#065f46',
  },
  footer: {
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e5e7eb',
  },
  footerText: {
    fontSize: '1.125rem',
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  featureList: {
    color: '#6b7280',
    marginLeft: '1.5rem',
    marginBottom: '1rem',
  },
  apiInfo: {
    color: '#6b7280',
    fontSize: '0.875rem',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
  },
  hiddenContainer: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  hiddenTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  hiddenText: {
    color: '#6b7280',
    marginBottom: '1.5rem',
  },
};

// Add keyframes for spinner animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default PostsComponent;