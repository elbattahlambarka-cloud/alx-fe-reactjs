// src/components/ProfileSettings.jsx
import { useState } from 'react';

function ProfileSettings({ user }) {
  const [email, setEmail] = useState(`${user?.username}@example.com`);
  const [notifications, setNotifications] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved! (This is a demo)');
  };

  return (
    <div>
      <h2 style={styles.title}>Profile Settings</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={user?.username}
            disabled
            style={styles.input}
          />
          <small style={styles.helperText}>Username cannot be changed</small>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              style={styles.checkbox}
            />
            Receive email notifications
          </label>
        </div>
        
        <button type="submit" style={styles.button}>
          Save Settings
        </button>
      </form>
      
      <p style={styles.note}>
        This is another nested route. Notice how the URL changes but only this
        section updates, not the entire page.
      </p>
    </div>
  );
}

const styles = {
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem',
  },
  form: {
    backgroundColor: '#f9fafb',
    padding: '1.5rem',
    borderRadius: '0.75rem',
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
  },
  helperText: {
    display: 'block',
    color: '#6b7280',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  checkbox: {
    marginRight: '0.5rem',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  note: {
    color: '#6b7280',
    fontStyle: 'italic',
  },
};

export default ProfileSettings;