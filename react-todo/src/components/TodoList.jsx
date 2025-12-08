// src/components/TodoList.jsx
import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';

function TodoList() {
  // Initialize the component state with a few todos for demonstration
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Write Tests', completed: false },
  ]);

  // Method for adding new todos
  const addTodo = (text) => {
    if (text.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    
    setTodos([...todos, newTodo]);
  };

  // Method for toggling todo completion status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Method for deleting todos
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Calculate statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>📝 React Todo List</h1>
        <p style={styles.subtitle}>A fully functional todo app with testing</p>
      </header>

      <div style={styles.stats}>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>{totalTodos}</span>
          <span style={styles.statLabel}>Total</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>{completedTodos}</span>
          <span style={styles.statLabel}>Completed</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>{pendingTodos}</span>
          <span style={styles.statLabel}>Pending</span>
        </div>
      </div>

      {/* Add Todo Form */}
      <AddTodoForm onAddTodo={addTodo} />

      {/* Todo List */}
      <div style={styles.todoList}>
        {todos.length === 0 ? (
          <p style={styles.emptyMessage}>No todos yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>

      {/* Instructions */}
      <div style={styles.instructions}>
        <h3>How to use:</h3>
        <ul style={styles.instructionList}>
          <li>✅ Click on a todo to toggle completion status</li>
          <li>🗑️ Click the delete button to remove a todo</li>
          <li>➕ Use the form above to add new todos</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f9fafb',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#6b7280',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '0.25rem',
  },
  todoList: {
    marginBottom: '2rem',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#6b7280',
    fontStyle: 'italic',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '0.75rem',
  },
  instructions: {
    backgroundColor: '#f0f9ff',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #bae6fd',
  },
  instructionList: {
    color: '#0c4a6e',
    lineHeight: '1.8',
    paddingLeft: '1.5rem',
  },
};

export default TodoList;