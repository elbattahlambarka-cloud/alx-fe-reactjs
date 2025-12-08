// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the location they tried to access before redirect
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple authentication simulation
    if (username && password) {
      // Use the login function from useAuth hook
      login(username);
      // Call the onLogin prop if provided (for backward compatibility)
      if (onLogin) onLogin(username);
      // Redirect to the page they tried to access, or home
      navigate(from, { replace: true });
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <p style={styles.subtitle}>
          {from !== '/' ? `Redirected from ${from}` : 'Access protected routes'}
        </p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Enter username"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter password"
              required
            />
          </div>
          
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        
        <div style={styles.authInfo}>
          <h4>Authentication System:</h4>
          <p>This app uses a custom <code>useAuth</code> hook for authentication.</p>
          <p>The <code>ProtectedRoute</code> component uses <code>useAuth()</code> to check authentication status.</p>
        </div>
        
        <div style={styles.demoNote}>
          <p style={styles.noteText}>
            <strong>Demo Note:</strong> Any username/password will work for this demo
          </p>
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
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  subtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  form: {
    marginBottom: '1.5rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    color: '#374151',
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    transition: 'border-color 0.2s',
  },
  button: {
    width: '100%',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  authInfo: {
    backgroundColor: '#f0f9ff',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #bae6fd',
  },
  demoNote: {
    backgroundColor: '#fef3c7',
    border: '1px solid #fde68a',
    borderRadius: '0.5rem',
    padding: '1rem',
  },
  noteText: {
    color: '#92400e',
    margin: 0,
    fontSize: '0.875rem',
  },
};

export default Login;