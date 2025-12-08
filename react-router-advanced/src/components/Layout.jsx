// src/components/Layout.jsx
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Layout({ isAuthenticated: propIsAuthenticated, onLogout: propOnLogout }) {
  const navigate = useNavigate();
  const { isAuthenticated: hookIsAuthenticated, logout: hookLogout, user } = useAuth();
  
  // Use hook values if available, otherwise use props (for backward compatibility)
  const isAuthenticated = hookIsAuthenticated !== undefined ? hookIsAuthenticated : propIsAuthenticated;
  const logout = hookLogout || propOnLogout;

  const handleLogout = () => {
    if (logout) {
      logout();
    }
    navigate('/');
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <Link to="/" style={styles.logo}>
            Advanced Router Demo
          </Link>
          
          <div style={styles.navLinks}>
            <NavLink 
              to="/" 
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive && styles.activeLink)
              })}
            >
              Home
            </NavLink>
            
            <NavLink 
              to="/blog" 
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive && styles.activeLink)
              })}
            >
              Blog
            </NavLink>
            
            <NavLink 
              to="/products" 
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive && styles.activeLink)
              })}
            >
              Products
            </NavLink>
            
            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/dashboard" 
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    ...(isActive && styles.activeLink)
                  })}
                >
                  Dashboard
                </NavLink>
                
                <NavLink 
                  to="/profile" 
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    ...(isActive && styles.activeLink)
                  })}
                >
                  Profile
                </NavLink>
                
                <div style={styles.userInfo}>
                  <span style={styles.username}>Hi, {user?.username}</span>
                  <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <NavLink 
                to="/login" 
                style={({ isActive }) => ({
                  ...styles.navLink,
                  ...(isActive && styles.activeLink)
                })}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main style={styles.main}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>Advanced React Router Demo with Protected Routes</p>
          <div style={styles.footerLinks}>
            <Link to="/" style={styles.footerLink}>Home</Link>
            <Link to="/blog" style={styles.footerLink}>Blog</Link>
            <Link to="/products" style={styles.footerLink}>Products</Link>
          </div>
          <p style={styles.authStatus}>
            Authentication System: Custom <code>useAuth</code> hook with localStorage persistence
          </p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9fafb',
  },
  navbar: {
    backgroundColor: '#1f2937',
    padding: '1rem 0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  navLink: {
    color: '#d1d5db',
    textDecoration: 'none',
    padding: '0.5rem 0',
    position: 'relative',
    transition: 'color 0.2s',
  },
  activeLink: {
    color: 'white',
    fontWeight: '600',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  username: {
    color: '#d1d5db',
    fontSize: '0.875rem',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
  main: {
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
    width: '100%',
  },
  footer: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '2rem 0',
    marginTop: 'auto',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    textAlign: 'center',
  },
  footerText: {
    marginBottom: '1rem',
    fontSize: '1.125rem',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '1rem',
  },
  footerLink: {
    color: '#d1d5db',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  authStatus: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    marginTop: '1rem',
  },
};

export default Layout;