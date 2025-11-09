import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ 
            textAlign: 'center', 
            margin: '20px',
            padding: '20px',
            border: '2px solid #333',
            borderRadius: '10px',
            backgroundColor: '#f5f5f5'
        }}>
            <h2 style={{ color: 'darkblue' }}>Counter Application</h2>
            <p style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                color: 'green'
            }}>Current Count: {count}</p>
            <div>
                <button 
                    onClick={() => setCount(count + 1)}
                    style={{
                        margin: '5px',
                        padding: '10px 15px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Increment
                </button>
                <button 
                    onClick={() => setCount(count - 1)}
                    style={{
                        margin: '5px',
                        padding: '10px 15px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Decrement
                </button>
                <button 
                    onClick={() => setCount(0)}
                    style={{
                        margin: '5px',
                        padding: '10px 15px',
                        backgroundColor: '#008CBA',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Counter;