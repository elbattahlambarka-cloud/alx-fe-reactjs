import React, { useState } from 'react';

const AddTodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new todo"
        data-testid="todo-input"
      />
      <button type="submit" data-testid="add-button">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;