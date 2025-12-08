// src/components/Profile.jsx
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

function Profile({ user }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Profile</h1>
        <p style={styles.subtitle}>Welcome, {user?.username}!</p>
      </div>
      
      <div style={styles.profileLayout}>
        {/* Sidebar with nested route links */}
        <nav style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Profile Sections</h3>
          <NavLink 
            to="details" 
            style={({ isActive }) => ({
              ...styles.sidebarLink,
              ...(isActive && styles.sidebarLinkActive)
            })}
          >
            Profile Details
          </NavLink>
          <NavLink 
            to="settings" 
            style={({ isActive }) => ({
              ...styles.sidebarLink,
              ...(isActive && styles.sidebarLinkActive)
            })}
          >
            Settings
          </NavLink>
        </nav>
        
        {/* Nested route content */}
        <div style={styles.content}>
          {/* Nested routes using Routes and Route components */}
          <Routes>
            <Route path="details" element={<ProfileDetails user={user} />} />
            <Route path="settings" element={<ProfileSettings user={user} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.125rem',
    opacity: 0.9,
  },
  profileLayout: {
    display: 'flex',
    minHeight: '400px',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#f9fafb',
    padding: '2rem',
    borderRight: '1px solid #e5e7eb',
  },
  sidebarTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  sidebarLink: {
    display: 'block',
    padding: '0.75rem 1rem',
    color: '#6b7280',
    textDecoration: 'none',
    borderRadius: '0.375rem',
    marginBottom: '0.5rem',
    transition: 'all 0.2s',
  },
  sidebarLinkActive: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: '2rem',
  },
};

export default Profile;