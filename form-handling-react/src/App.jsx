// src/App.jsx
import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>React Form Handling Comparison</h1>
      
      <div style={styles.formsContainer}>
        {/* Controlled Components Form */}
        <RegistrationForm />
        
        {/* Formik Form */}
        <FormikForm />
      </div>
      
      <div style={styles.comparison}>
        <h2 style={styles.comparisonTitle}>Comparison Summary</h2>
        <div style={styles.comparisonGrid}>
          <div style={styles.comparisonCard}>
            <h3 style={styles.comparisonSubtitle}>Controlled Components</h3>
            <ul style={styles.comparisonList}>
              <li>Manual state management with useState</li>
              <li>Custom validation logic</li>
              <li>More control but more code</li>
              <li>Good for simple forms</li>
            </ul>
          </div>
          <div style={styles.comparisonCard}>
            <h3 style={styles.comparisonSubtitle}>Formik</h3>
            <ul style={styles.comparisonList}>
              <li>Built-in form state management</li>
              <li>Integrated validation with Yup</li>
              <li>Less boilerplate code</li>
              <li>Better for complex forms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '1rem',
  },
  mainTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  formsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '2rem',
    maxWidth: '80rem',
    margin: '0 auto',
  },
  comparison: {
    maxWidth: '80rem',
    margin: '2rem auto 0',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
  },
  comparisonTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
  },
  comparisonCard: {
    padding: '1rem',
    borderRadius: '0.5rem',
  },
  comparisonSubtitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  comparisonList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
};

export default App;