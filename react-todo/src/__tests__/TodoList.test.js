import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  
  test('renders initial todo items correctly', () => {
    render(<TodoList />);
    
    // Check that initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check that "Build Todo App" is completed (has line-through)
    const completedTodo = screen.getByText('Build Todo App');
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
  });

  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add a new todo
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    // Check new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check input is cleared
    expect(input.value).toBe('');
  });

  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    // Get a todo that is not completed initially
    const todoToToggle = screen.getByText('Learn React');
    
    // Initially should not have line-through
    expect(todoToToggle).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle completion
    fireEvent.click(todoToToggle);
    
    // Should now have line-through
    expect(todoToToggle).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    fireEvent.click(todoToToggle);
    
    // Should not have line-through again
    expect(todoToToggle).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    // Get initial count of todos
    const initialTodos = screen.getAllByTestId(/todo-item-/);
    const initialCount = initialTodos.length;
    
    // Delete the first todo (id: 1)
    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);
    
    // Check todo is removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check count decreased by 1
    const currentTodos = screen.getAllByTestId(/todo-item-/);
    expect(currentTodos.length).toBe(initialCount - 1);
  });

  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Get initial number of todos
    const initialTodos = screen.getAllByTestId(/todo-item-/);
    const initialCount = initialTodos.length;
    
    // Try to add empty todo (spaces only)
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    // Number of todos should remain the same
    const currentTodos = screen.getAllByTestId(/todo-item-/);
    expect(currentTodos.length).toBe(initialCount);
  });
});