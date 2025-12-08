// src/components/AddTodoForm.jsx
import React, { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') {
      setError('Todo cannot be empty');
      return;
    }
    
    onAddTodo(inputValue);
    setInputValue('');
    setError('');
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputGroup}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="What needs to be done?"
          style={styles.input}
          aria-label="Add new todo"
          data-testid="todo-input"
        />
        <button 
          type="submit" 
          style={styles.button}
          aria-label="Add todo"
        >
          Add Todo
        </button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
      <p style={styles.helperText}>
        Press Enter or click "Add Todo" to add a new item
      </p>
    </form>
  );
}

const styles = {
  form: {
    marginBottom: '2rem',
  },
  inputGroup: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '2px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  error: {
    color: '#ef4444',
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
  },
  helperText: {
    color: '#6b7280',
    fontSize: '0.875rem',
  },
};

export default AddTodoForm;