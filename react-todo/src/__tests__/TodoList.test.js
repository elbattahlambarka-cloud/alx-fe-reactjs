import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// Test suite for TodoList component
describe('TodoList Component', () => {
  // Test 1: Verify that the TodoList component renders correctly
  test('renders initial todo items correctly', () => {
    render(<TodoList />);
    
    // Ensure that the initial state (a few demo todos) is rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check that Build Todo App is completed
    const completedTodo = screen.getByText('Build Todo App');
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
  });

  // Test 2: Verify that a new todo can be added
  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Use fireEvent to simulate user input and form submission
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    // Verify new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  // Test 3: Verify that a todo item can be toggled
  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    const todoText = screen.getByText('Learn React');
    
    // Initially not completed
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle
    fireEvent.click(todoText);
    
    // Now should be completed
    expect(todoText).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    fireEvent.click(todoText);
    
    // Should not be completed again
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Verify that a todo item can be deleted
  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    // Get initial count
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

  // Test 5: Form validation
  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Get initial count
    const initialTodos = screen.getAllByTestId(/todo-item-/);
    const initialCount = initialTodos.length;
    
    // Try to add empty todo
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    // Count should remain the same
    const currentTodos = screen.getAllByTestId(/todo-item-/);
    expect(currentTodos.length).toBe(initialCount);
  });
});