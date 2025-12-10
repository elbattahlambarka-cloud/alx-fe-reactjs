import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// Test suite for TodoList component
describe('TodoList Component', () => {
  
  // Test 1: Initial render with demo todos
  test('renders initial todo items correctly', () => {
    render(<TodoList />);
    
    // Check initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check that Build Todo App is completed (has line-through)
    const completedTodo = screen.getByText('Build Todo App');
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
  });

  // Test 2: Adding a new todo
  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add new todo
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    // Check new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  // Test 3: Toggling todo completion
  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    const todoToToggle = screen.getByText('Learn React');
    
    // Initially should not have line-through
    expect(todoToToggle).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle
    fireEvent.click(todoToToggle);
    
    // Should now have line-through
    expect(todoToToggle).toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Deleting a todo
  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });

  // Test 5: Form validation
  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    const initialTodos = screen.getAllByTestId(/todo-item-/).length;
    
    // Try to add empty todo
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    const currentTodos = screen.getAllByTestId(/todo-item-/).length;
    expect(currentTodos).toBe(initialTodos);
  });
});