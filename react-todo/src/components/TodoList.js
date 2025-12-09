import React, { useState } from 'react';

const TodoList = () => {
  // Initial state with demo todos as specified
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build Todo App', completed: true },
    { id: 3, text: 'Write Tests', completed: false }
  ]);
  
  const [newTodoText, setNewTodoText] = useState('');

  // Add new todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: newTodoText.trim(),
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  // Toggle todo completion
  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      
      <form onSubmit={handleAddTodo} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo..."
          data-testid="todo-input"
          style={{ 
            padding: '8px', 
            marginRight: '10px',
            width: '300px'
          }}
        />
        <button 
          type="submit" 
          data-testid="add-button"
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Todo
        </button>
      </form>
      
      <ul data-testid="todo-list" style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            data-testid={`todo-item-${todo.id}`}
            style={{ 
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: todo.completed ? '#d4edda' : '#f8f9fa',
              border: '1px solid #ddd',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span
              onClick={() => handleToggleTodo(todo.id)}
              data-testid={`todo-text-${todo.id}`}
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                flex: 1
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              data-testid={`delete-button-${todo.id}`}
              style={{ 
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;