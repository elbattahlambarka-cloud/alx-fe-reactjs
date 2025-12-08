// src/components/Dashboard.jsx
import { Link } from 'react-router-dom';

function Dashboard({ user }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>
          Protected route - Only accessible when authenticated
        </p>
      </div>
      
      <div style={styles.welcome}>
        <h2 style={styles.welcomeTitle}>Welcome, {user?.username}!</h2>
        <p style={styles.welcomeText}>
          This is a protected route. If you were not logged in, you would have been
          redirected to the login page.
        </p>
      </div>
      
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h3 style={styles.statTitle}>Profile</h3>
          <p style={styles.statValue}>Complete</p>
          <Link to="/profile" style={styles.statLink}>
            View Profile →
          </Link>
        </div>
        
        <div style={styles.statCard}>
          <h3 style={styles.statTitle}>Last Login</h3>
          <p style={styles.statValue}>Today</p>
        </div>
        
        <div style={styles.statCard}>
          <h3 style={styles.statTitle}>Account Status</h3>
          <p style={styles.statValue}>Active</p>
        </div>
      </div>
      
      <div style={styles.instructions}>
        <h3 style={styles.instructionsTitle}>How Protected Routes Work:</h3>
        <ol style={styles.instructionsList}>
          <li>Try logging out and accessing this page</li>
          <li>You'll be redirected to the login page</li>
          <li>After login, you'll be brought back here</li>
          <li>The URL you tried to access is preserved</li>
        </ol>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
  },
  header: {
    marginBottom: '2rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid #e5e7eb',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#6b7280',
  },
  welcome: {
    backgroundColor: '#f0f9ff',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    marginBottom: '2rem',
  },
  welcomeTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: '0.5rem',
  },
  welcomeText: {
    color: '#0c4a6e',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  statCard: {
    backgroundColor: '#f9fafb',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    textAlign: 'center',
  },
  statTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: '0.5rem',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  statLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
  },
  instructions: {
    backgroundColor: '#fef3c7',
    padding: '1.5rem',
    borderRadius: '0.75rem',
  },
  instructionsTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#92400e',
    marginBottom: '1rem',
  },
  instructionsList: {
    color: '#92400e',
    lineHeight: '1.8',
    paddingLeft: '1.5rem',
  },
};

export default Dashboard;