import UserCard from './UserCard';

const UserList = ({ users, loading }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ 
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          ⏳
        </div>
        <p style={{ color: '#666' }}>Searching GitHub users...</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ 
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          🔍
        </div>
        <h3 style={{ color: '#586069', marginBottom: '8px' }}>
          No users found
        </h3>
        <p style={{ color: '#666' }}>
          Try searching for a GitHub username
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ 
        marginBottom: '20px',
        color: '#24292e',
        fontSize: '1.5rem'
      }}>
        Found {users.length} user{users.length !== 1 ? 's' : ''}
      </h2>
      <div>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;