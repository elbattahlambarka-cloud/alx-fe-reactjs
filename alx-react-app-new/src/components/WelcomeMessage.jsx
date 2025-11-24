function WelcomeMessage() {
    return (
        <div style={{ 
            backgroundColor: 'lightgreen',
            padding: '15px',
            margin: '10px',
            borderRadius: '5px',
            textAlign: 'center'
        }}>
            <h1 style={{ 
                color: 'darkgreen',
                fontSize: '28px',
                marginBottom: '10px'
            }}>Hello everyone, I am learning React at ALX!</h1>
            <p style={{ 
                fontSize: '16px',
                margin: '5px 0',
                color: '#333'
            }}>This is a simple JSX component.</p>
            <p style={{ 
                fontSize: '16px',
                margin: '5px 0',
                color: '#333',
                fontWeight: 'bold'
            }}>I am learning about JSX!</p>
        </div>
    );
}

export default WelcomeMessage;