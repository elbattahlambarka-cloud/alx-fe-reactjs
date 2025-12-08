// src/__tests__/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1: Verify initial render with demo todos
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the component renders
    expect(screen.getByText('📝 React Todo List')).toBeInTheDocument();
    
    // Verify that the initial state (a few demo todos) is rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check for input field
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  // Test 2: Test adding a new todo
  test('allows adding a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add Todo');
    
    // Add a new todo
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    // Verify the new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  // Test 3: Test toggling todo completion status
  test('allows toggling todo completion status', () => {
    render(<TodoList />);
    
    // Find a todo that is not completed initially
    const todoText = screen.getByText('Build a Todo App');
    
    // Click to toggle completion
    fireEvent.click(todoText);
    
    // Should now be completed (have line-through style or different appearance)
    // Note: We check for the visual change by looking for the completed class/style
    expect(todoText).toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Test deleting a todo
  test('allows deleting a todo', () => {
    render(<TodoList />);
    
    // Find delete buttons (the 🗑️ emoji buttons)
    const deleteButtons = screen.getAllByRole('button', { name: /Delete todo:/ });
    
    // Count todos before deletion
    const todosBefore = screen.getAllByText(/Learn React|Build a Todo App|Write Tests/);
    expect(todosBefore).toHaveLength(3);
    
    // Delete the first todo
    fireEvent.click(deleteButtons[0]);
    
    // Verify first todo is gone
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Verify remaining todos
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  // Test 5: Test empty todo validation
  test('shows error when adding empty todo', () => {
    render(<TodoList />);
    
    const addButton = screen.getByText('Add Todo');
    
    // Try to add empty todo
    fireEvent.click(addButton);
    
    // Should show error message
    expect(screen.getByText('Todo cannot be empty')).toBeInTheDocument();
  });

  // Test 6: Test statistics display
  test('displays correct statistics', () => {
    render(<TodoList />);
    
    // Check initial statistics
    expect(screen.getByText('3')).toBeInTheDocument(); // Total todos
    expect(screen.getByText('1')).toBeInTheDocument(); // Completed todos (Learn React is completed)
    expect(screen.getByText('2')).toBeInTheDocument(); // Pending todos
  });
});