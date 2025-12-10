import React, { useState } from 'react';

const TodoList = () => {
  // Initialize component state with a few todos for demonstration
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build Todo App', completed: true },
    { id: 3, text: 'Write Tests', completed: false }
  ]);
  
  const [inputValue, setInputValue] = useState('');

  // Method for adding todos
  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // Method for toggling todos
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Method for deleting todos
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      
      {/* AddTodoForm */}
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          data-testid="todo-input"
        />
        <button 
          type="submit" 
          data-testid="add-button"
        >
          Add Todo
        </button>
      </form>
      
      {/* Display list of todos */}
      <ul data-testid="todo-list">
        {todos.map(todo => (
          <li 
            key={todo.id}
            data-testid={`todo-item-${todo.id}`}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              data-testid={`todo-text-${todo.id}`}
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              data-testid={`delete-button-${todo.id}`}
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