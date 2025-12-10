import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1 from task: "Write Initial Render Test"
  test('renders initial todo items correctly', () => {
    render(<TodoList />);
    
    // Verify that the TodoList component renders correctly
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Ensure that the initial state (a few demo todos) is rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  // Test 2 from task: "Test Adding Todos"
  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');
    
    // Use fireEvent to simulate user input and form submission
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(button);
    
    // Verify that a new todo can be added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  // Test 3 from task: "Test Toggling Todos"
  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    const todo = screen.getByText('Learn React');
    
    // Verify that a todo item can be toggled between completed and not completed
    expect(todo).not.toHaveStyle('text-decoration: line-through');
    
    fireEvent.click(todo);
    
    expect(todo).toHaveStyle('text-decoration: line-through');
    
    fireEvent.click(todo);
    
    expect(todo).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4 from task: "Test Deleting Todos"
  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);
    
    // Verify that a todo item can be deleted
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});