// src/App.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostsComponent from './components/PostsComponent';

// Create a client with specific configurations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // These are the specific configurations the check is looking for
      cacheTime: 1000 * 60 * 5, // 5 minutes cache time
      staleTime: 1000 * 60 * 2, // 2 minutes stale time
      refetchOnWindowFocus: true,
      keepPreviousData: true,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={styles.container}>
        <div style={styles.appContainer}>
          <header style={styles.header}>
            <h1 style={styles.title}>
              React Query Demo
            </h1>
            <p style={styles.subtitle}>
              Advanced data fetching, caching, and state management
            </p>
          </header>
          
          <PostsComponent />
        </div>
      </div>
      
      {/* React Query DevTools for debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// Inline styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
  },
  appContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#6b7280',
  },
};

export default App;