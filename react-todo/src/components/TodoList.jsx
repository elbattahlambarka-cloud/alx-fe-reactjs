import React, { useState } from 'react';

const TodoList = () => {
  // Initial state with demo todos
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build Todo App', completed: true },
    { id: 3, text: 'Write Tests', completed: false }
  ]);
  
  const [inputValue, setInputValue] = useState('');

  // Method to add new todo
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

  // Method to toggle todo completion
  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Method to delete todo
  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      
      {/* AddTodoForm */}
      <form onSubmit={addTodo} className="add-todo-form">
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
      
      {/* Todo List */}
      <ul data-testid="todo-list">
        {todos.map(todo => (
          <li 
            key={todo.id}
            className={todo.completed ? 'completed' : ''}
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
              className="delete-btn"
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