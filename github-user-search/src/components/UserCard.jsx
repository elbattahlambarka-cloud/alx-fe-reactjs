const UserCard = ({ user }) => {
  return (
    <div style={{
      border: '1px solid #e1e4e8',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '16px',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid #e1e4e8'
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ 
                margin: '0 0 8px 0',
                fontSize: '18px',
                color: '#0366d6'
              }}>
                {user.name || user.login}
              </h3>
              <p style={{ 
                margin: '0 0 8px 0',
                color: '#586069',
                fontSize: '14px'
              }}>
                @{user.login}
              </p>
              {user.bio && (
                <p style={{ 
                  margin: '8px 0',
                  color: '#24292e',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  {user.bio}
                </p>
              )}
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '6px 12px',
                backgroundColor: '#f6f8fa',
                color: '#24292e',
                textDecoration: 'none',
                border: '1px solid #e1e4e8',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0366d6';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f6f8fa';
                e.target.style.color = '#24292e';
              }}
            >
              View Profile
            </a>
          </div>
          
          <div style={{ 
            display: 'flex',
            gap: '16px',
            marginTop: '12px',
            fontSize: '13px',
            color: '#586069'
          }}>
            {user.followers !== undefined && (
              <span>
                <strong>{user.followers}</strong> followers
              </span>
            )}
            {user.following !== undefined && (
              <span>
                <strong>{user.following}</strong> following
              </span>
            )}
            {user.public_repos !== undefined && (
              <span>
                <strong>{user.public_repos}</strong> repositories
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;