import React, { useState } from 'react';

function AddTodoForm({ onAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo"
        data-testid="todo-input"
      />
      <button type="submit" data-testid="add-button">
        Add Todo
      </button>
    </form>
  );
}

export default AddTodoForm;