import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li data-testid={`todo-item-${todo.id}`}>
      <span
        onClick={() => onToggle(todo.id)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer',
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
}

export default TodoItem;