import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

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
  test('Verify that a new todo can be added', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');
    
    // Use fireEvent to simulate user input and form submission
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(button);
    
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  // Test Toggling Todos
  test('Verify that a todo item can be toggled between completed and not completed', () => {
    render(<TodoList />);
    
    const todo = screen.getByText('Learn React');
    
    // Initially not completed
    expect(todo).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle
    fireEvent.click(todo);
    
    // Should be completed
    expect(todo).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    fireEvent.click(todo);
    
    // Should not be completed again
    expect(todo).not.toHaveStyle('text-decoration: line-through');
  });

  // Test Deleting Todos
  test('Verify that a todo item can be deleted', () => {
    render(<TodoList />);
    
    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});