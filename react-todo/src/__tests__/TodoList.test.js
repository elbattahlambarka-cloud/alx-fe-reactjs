import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

// Test suite for TodoList component
describe('TodoList Component', () => {
  // Write Initial Render Test
  test('Verify that the TodoList component renders correctly', () => {
    render(<TodoList />);
    
    // Ensure that the initial state (a few demo todos) is rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  // Test Adding Todos
  test('Write a test to verify that a new todo can be added', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');
    
    // Use fireEvent to simulate user input and form submission
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(button);
    
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  // Test Toggling Todos
  test('Write a test to verify that a todo item can be toggled between completed and not completed', () => {
    render(<TodoList />);
    
    const todo = screen.getByText('Learn React');
    
    expect(todo).not.toHaveStyle('text-decoration: line-through');
    
    fireEvent.click(todo);
    
    expect(todo).toHaveStyle('text-decoration: line-through');
    
    fireEvent.click(todo);
    
    expect(todo).not.toHaveStyle('text-decoration: line-through');
  });

  // Test Deleting Todos
  test('Write a test to verify that a todo item can be deleted', () => {
    render(<TodoList />);
    
    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});