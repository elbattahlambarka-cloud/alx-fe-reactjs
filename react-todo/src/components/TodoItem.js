import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span
        onClick={() => onToggle(todo.id)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer',
          flexGrow: 1,
        }}
        data-testid={`todo-text-${todo.id}`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        data-testid={`delete-button-${todo.id}`}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;