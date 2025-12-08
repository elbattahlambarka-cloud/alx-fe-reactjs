import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders initial todos correctly', () => {
    render(<TodoList />);
    
    // Check for initial todos
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check that one todo is completed initially
    expect(screen.getByText('Build Todo App')).toHaveStyle('text-decoration: line-through');
  });

  test('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add a new todo
    await user.type(input, 'New Test Todo');
    await user.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check that input is cleared
    expect(input).toHaveValue('');
  });

  test('does not add empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const initialItems = screen.getAllByRole('listitem');
    const initialCount = initialItems.length;
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Try to add empty todo
    await user.type(input, '   ');
    await user.click(addButton);
    
    // Check that no new todo was added
    const currentItems = screen.getAllByRole('listitem');
    expect(currentItems.length).toBe(initialCount);
  });

  test('toggles todo completion status', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Get the first todo item
    const firstTodo = screen.getByText('Learn React');
    
    // Initially should not be completed
    expect(firstTodo).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle
    await user.click(firstTodo);
    
    // Now should be completed
    expect(firstTodo).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    await user.click(firstTodo);
    
    // Should not be completed again
    expect(firstTodo).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Check initial count
    const initialItems = screen.getAllByRole('listitem');
    const initialCount = initialItems.length;
    
    // Delete the first todo
    const firstDeleteButton = screen.getByTestId('delete-button-1');
    await user.click(firstDeleteButton);
    
    // Check that todo is deleted
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check that count decreased
    const currentItems = screen.getAllByRole('listitem');
    expect(currentItems.length).toBe(initialCount - 1);
  });

  test('maintains todo list functionality after multiple operations', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add a new todo
    await user.type(input, 'Test Todo 1');
    await user.click(addButton);
    
    // Toggle the new todo
    const newTodo = screen.getByText('Test Todo 1');
    await user.click(newTodo);
    expect(newTodo).toHaveStyle('text-decoration: line-through');
    
    // Add another todo
    await user.type(input, 'Test Todo 2');
    await user.click(addButton);
    
    // Delete the first new todo
    const deleteButton = screen.getByTestId(`delete-button-${Date.now() - 1}`);
    await user.click(deleteButton);
    
    // Verify the correct todos remain
    expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });
});