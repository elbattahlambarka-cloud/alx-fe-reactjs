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
                {/* form inputs with inline styling */}
            </form>
        </div>
    );
}