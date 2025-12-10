import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// Test suite for TodoList component
describe('TodoList Component', () => {
  
  // Test 1: Initial render with demo todos
  test('renders initial todo items correctly', () => {
    // Render the component
    render(<TodoList />);
    
    // Verify that initial todos are displayed
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Verify that "Build Todo App" is completed (has line-through)
    const completedTodo = screen.getByText('Build Todo App');
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
  });

  // Test 2: Adding a new todo
  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    // Get input and button elements
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Simulate user typing and submitting
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    // Verify new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Verify input is cleared
    expect(input.value).toBe('');
  });

  // Test 3: Toggling todo completion
  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    // Get a todo item
    const todoToToggle = screen.getByText('Learn React');
    
    // Initially should not be completed
    expect(todoToToggle).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle completion
    fireEvent.click(todoToToggle);
    
    // Should now be completed
    expect(todoToToggle).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    fireEvent.click(todoToToggle);
    
    // Should not be completed again
    expect(todoToToggle).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Deleting a todo
  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    // Count initial todos
    const initialTodos = screen.getAllByTestId(/todo-item-/);
    const initialCount = initialTodos.length;
    
    // Click delete button for first todo
    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);
    
    // Verify todo is removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Verify count decreased
    const currentTodos = screen.getAllByTestId(/todo-item-/);
    expect(currentTodos.length).toBe(initialCount - 1);
  });

  // Test 5: Form validation (no empty todos)
  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Count initial todos
    const initialTodos = screen.getAllByTestId(/todo-item-/);
    const initialCount = initialTodos.length;
    
    // Try to add empty todo (spaces only)
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    // Count should remain the same
    const currentTodos = screen.getAllByTestId(/todo-item-/);
    expect(currentTodos.length).toBe(initialCount);
  });
});