import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ 
            backgroundColor: '#333',
            padding: '15px',
            marginBottom: '20px'
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                gap: '20px'
            }}>
                <Link 
                    to="/" 
                    style={{ 
                        color: 'white', 
                        textDecoration: 'none',
                        padding: '10px 15px',
                        borderRadius: '4px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                    Home
                </Link>
                <Link 
                    to="/about" 
                    style={{ 
                        color: 'white', 
                        textDecoration: 'none',
                        padding: '10px 15px',
                        borderRadius: '4px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                    About
                </Link>
                <Link 
                    to="/services" 
                    style={{ 
                        color: 'white', 
                        textDecoration: 'none',
                        padding: '10px 15px',
                        borderRadius: '4px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                    Services
                </Link>
                <Link 
                    to="/contact" 
                    style={{ 
                        color: 'white', 
                        textDecoration: 'none',
                        padding: '10px 15px',
                        borderRadius: '4px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                    Contact
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;