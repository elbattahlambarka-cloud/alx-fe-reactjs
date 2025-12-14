import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

// Test names MUST match task description
describe('TodoList Component', () => {
  // Test 1: Initial render
  test('Verify that the TodoList component renders correctly', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  // Test 2: Adding todos
  test('Write a test to verify that a new todo can be added', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');
    
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(button);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  // Test 3: Toggling todos
  test('Write a test to verify that a todo item can be toggled between completed and not completed', () => {
    render(<TodoList />);
    
    const todo = screen.getByText('Learn React');
    
    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: line-through');
    
    fireEvent.click(todo);
    expect(todo).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Deleting todos
  test('Write a test to verify that a todo item can be deleted', () => {
    render(<TodoList />);
    
    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});