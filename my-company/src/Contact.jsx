import { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted! Thank you for contacting us.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: 'darkred' }}>Contact Us</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ 
                        display: 'block', 
                        margin: '10px 0', 
                        padding: '10px',
                        width: '100%',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ 
                        display: 'block', 
                        margin: '10px 0', 
                        padding: '10px',
                        width: '100%',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    style={{ 
                        display: 'block', 
                        margin: '10px 0', 
                        padding: '10px',
                        width: '100%',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                    required
                />
                <button 
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: 'navy',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default Contact;