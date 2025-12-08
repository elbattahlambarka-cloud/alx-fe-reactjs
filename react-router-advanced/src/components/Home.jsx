// src/components/Home.jsx
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Advanced React Router Demo</h1>
        <p style={styles.subtitle}>
          Demonstrating nested routes, dynamic routing, and protected routes
        </p>
      </div>

      <div style={styles.features}>
        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Nested Routes</h3>
          <p style={styles.featureText}>
            Profile section with nested routes for details and settings
          </p>
          <Link to="/profile" style={styles.featureLink}>
            View Profile Routes →
          </Link>
        </div>

        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Dynamic Routing</h3>
          <p style={styles.featureText}>
            Blog posts and products with dynamic URL parameters
          </p>
          <Link to="/blog/post/1" style={styles.featureLink}>
            View Dynamic Routes →
          </Link>
        </div>

        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Protected Routes</h3>
          <p style={styles.featureText}>
            Dashboard and profile require authentication
          </p>
          <Link to="/dashboard" style={styles.featureLink}>
            Try Protected Route →
          </Link>
        </div>
      </div>

      <div style={styles.demoInstructions}>
        <h2 style={styles.instructionsTitle}>Demo Instructions</h2>
        <ol style={styles.instructionsList}>
          <li>Click "Login" to access protected routes</li>
          <li>Navigate to Profile to see nested routes</li>
          <li>Explore Blog for dynamic routing examples</li>
          <li>Check Products for parameter-based routing</li>
          <li>Try accessing Dashboard without login (redirects to login)</li>
        </ol>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '3rem',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#6b7280',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  feature: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  featureText: {
    color: '#6b7280',
    marginBottom: '1.5rem',
  },
  featureLink: {
    display: 'inline-block',
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
  },
  demoInstructions: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  instructionsTitle: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  instructionsList: {
    color: '#6b7280',
    lineHeight: '1.8',
    paddingLeft: '1.5rem',
  },
};

export default Home;