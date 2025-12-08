// src/components/formikForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function FormikForm() {
  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  // Yup validation schema with exact string().required pattern
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted:', values);
    alert(`Registration successful for ${values.username}!`);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>User Registration (Formik)</h1>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Username Field */}
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="username">
                  Username *
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  style={styles.input}
                  placeholder="Enter username"
                />
                <ErrorMessage name="username" component="div" style={styles.error} />
              </div>

              {/* Email Field */}
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="email">
                  Email *
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  style={styles.input}
                  placeholder="Enter email"
                />
                <ErrorMessage name="email" component="div" style={styles.error} />
              </div>

              {/* Password Field */}
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="password">
                  Password *
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  style={styles.input}
                  placeholder="Enter password"
                />
                <ErrorMessage name="password" component="div" style={styles.error} />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={styles.button}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>

        <div style={styles.footer}>
          <p>* All fields are required</p>
          <p>This form uses Formik with Yup validation schema.</p>
          <p>Validation includes: string().required() for all fields.</p>
        </div>
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  formContainer: {
    maxWidth: '28rem',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '1.5rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    color: '#374151',
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    width: '100%',
    backgroundColor: '#7c3aed',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  error: {
    color: '#ef4444',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  footer: {
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
    textAlign: 'center',
  },
};

export default FormikForm;