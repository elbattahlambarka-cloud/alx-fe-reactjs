import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// Test suite for TodoList component
describe('TodoList Component', () => {
  
  test('renders initial todo items correctly', () => {
    render(<TodoList />);
    
    // Verify that the TodoList component renders correctly
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Ensure that the initial state (a few demo todos) is rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check that "Build Todo App" is completed
    const completedTodo = screen.getByText('Build Todo App');
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
  });

  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    // Get input and button
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');
    
    // Use fireEvent to simulate user input and form submission
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(button);
    
    // Verify that a new todo can be added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    // Get a todo item
    const todo = screen.getByText('Learn React');
    
    // Initially should not be completed
    expect(todo).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle
    fireEvent.click(todo);
    
    // Verify that a todo item can be toggled between completed and not completed
    expect(todo).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    fireEvent.click(todo);
    
    // Should not be completed again
    expect(todo).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    // Get initial count
    const initialTodos = screen.getAllByTestId(/todo-item-/);
    const initialCount = initialTodos.length;
    
    // Click delete button for first todo
    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);
    
    // Verify that a todo item can be deleted
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Verify count decreased
    const currentTodos = screen.getAllByTestId(/todo-item-/);
    expect(currentTodos.length).toBe(initialCount - 1);
  });

  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');
    
    // Get initial count
    const initialTodos = screen.getAllByTestId(/todo-item-/);
    const initialCount = initialTodos.length;
    
    // Try to add empty todo
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);
    
    // Count should remain the same
    const currentTodos = screen.getAllByTestId(/todo-item-/);
    expect(currentTodos.length).toBe(initialCount);
  });
});