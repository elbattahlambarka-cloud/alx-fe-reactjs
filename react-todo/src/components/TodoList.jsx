import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';

function TodoList() {
  // Initialize the component state with a few todos for demonstration
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build Todo App', completed: true },
    { id: 3, text: 'Write Tests', completed: false }
  ]);

  // Method for adding todos
  const addTodo = (text) => {
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
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
    <div className="TodoList">
      <h1>Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul data-testid="todo-list">
        {todos.map(todo => (
          <li 
            key={todo.id} 
            data-testid={`todo-item-${todo.id}`}
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
              data-testid={`delete-button-${todo.id}`}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;