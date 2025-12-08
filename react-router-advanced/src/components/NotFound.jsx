// src/components/NotFound.jsx
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <h2 style={styles.subtitle}>Page Not Found</h2>
        <p style={styles.text}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            Go Home
          </Link>
          <Link to="/blog" style={styles.linkSecondary}>
            Visit Blog
          </Link>
          <Link to="/products" style={styles.linkSecondary}>
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    textAlign: 'center',
  },
  content: {
    maxWidth: '500px',
  },
  title: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#3b82f6',
    margin: 0,
    lineHeight: 1,
  },
  subtitle: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.125rem',
    color: '#6b7280',
    marginBottom: '2rem',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    display: 'inline-block',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    fontWeight: '500',
    width: '200px',
  },
  linkSecondary: {
    display: 'inline-block',
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default NotFound;