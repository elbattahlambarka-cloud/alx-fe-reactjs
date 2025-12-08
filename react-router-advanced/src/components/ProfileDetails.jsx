// src/components/ProfileDetails.jsx
function ProfileDetails({ user }) {
  return (
    <div>
      <h2 style={styles.title}>Profile Details</h2>
      <div style={styles.details}>
        <div style={styles.detailItem}>
          <span style={styles.label}>Username:</span>
          <span style={styles.value}>{user?.username}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.label}>Role:</span>
          <span style={styles.value}>{user?.role}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.label}>Member Since:</span>
          <span style={styles.value}>January 2024</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.label}>Email:</span>
          <span style={styles.value}>{user?.username}@example.com</span>
        </div>
      </div>
      <p style={styles.note}>
        This is a nested route within the Profile component. Navigation between
        profile sections doesn't reload the entire page.
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
  details: {
    backgroundColor: '#f9fafb',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    marginBottom: '1.5rem',
  },
  detailItem: {
    display: 'flex',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e5e7eb',
  },
  label: {
    width: '150px',
    fontWeight: '500',
    color: '#6b7280',
  },
  value: {
    color: '#1f2937',
  },
  note: {
    color: '#6b7280',
    fontStyle: 'italic',
  },
};

export default ProfileDetails;