// src/components/TodoItem.jsx
import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={{
      ...styles.todoItem,
      ...(todo.completed && styles.completedTodo)
    }}>
      <div 
        style={styles.todoContent}
        onClick={() => onToggle(todo.id)}
        role="button"
        tabIndex={0}
        aria-label={`Toggle todo: ${todo.text}`}
        data-testid={`todo-item-${todo.id}`}
      >
        <span style={styles.checkbox}>
          {todo.completed ? '✓' : ''}
        </span>
        <span style={{
          ...styles.todoText,
          ...(todo.completed && styles.completedText)
        }}>
          {todo.text}
        </span>
      </div>
      
      <button
        onClick={() => onDelete(todo.id)}
        style={styles.deleteButton}
        aria-label={`Delete todo: ${todo.text}`}
        data-testid={`delete-button-${todo.id}`}
      >
        🗑️
      </button>
    </div>
  );
}

const styles = {
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    marginBottom: '0.75rem',
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  completedTodo: {
    opacity: 0.7,
    backgroundColor: '#f0fdf4',
  },
  todoContent: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    marginRight: '1rem',
    border: '2px solid #3b82f6',
    borderRadius: '50%',
    color: 'white',
    backgroundColor: '#3b82f6',
    fontWeight: 'bold',
  },
  todoText: {
    fontSize: '1.125rem',
    color: '#1f2937',
  },
  completedText: {
    textDecoration: 'line-through',
    color: '#6b7280',
  },
  deleteButton: {
    padding: '0.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '1.25rem',
    transition: 'background-color 0.2s',
  },
};

export default TodoItem;