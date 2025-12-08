// src/__tests__/TodoList.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial Render Test
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the component renders
    expect(screen.getByText('📝 React Todo List')).toBeInTheDocument();
    expect(screen.getByText('A fully functional todo app with testing')).toBeInTheDocument();
    
    // Verify that the initial state (a few demo todos) is rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check for stats
    expect(screen.getByText('3')).toBeInTheDocument(); // Total todos
    expect(screen.getByText('1')).toBeInTheDocument(); // Completed todos
    expect(screen.getByText('2')).toBeInTheDocument(); // Pending todos
    
    // Check for input field
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  // Test 2: Adding Todos
  test('allows adding a new todo', async () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add Todo');
    
    // Add a new todo
    await userEvent.type(input, 'New Test Todo');
    await userEvent.click(addButton);
    
    // Verify the new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check that stats update
    expect(screen.getByText('4')).toBeInTheDocument(); // Total should now be 4
    
    // Test with Enter key
    await userEvent.type(input, 'Another Todo{enter}');
    expect(screen.getByText('Another Todo')).toBeInTheDocument();
  });

  // Test 3: Test empty todo validation
  test('shows error when adding empty todo', async () => {
    render(<TodoList />);
    
    const addButton = screen.getByText('Add Todo');
    
    // Try to add empty todo
    await userEvent.click(addButton);
    
    // Should show error message
    expect(screen.getByText('Todo cannot be empty')).toBeInTheDocument();
  });

  // Test 4: Toggling Todos
  test('allows toggling todo completion status', async () => {
    render(<TodoList />);
    
    // Find a todo that is not completed initially
    const todoText = screen.getByText('Build a Todo App');
    const todoItem = todoText.closest('[data-testid^="todo-item-"]');
    
    // Get initial state
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle completion
    await userEvent.click(todoItem);
    
    // Should now be completed
    expect(todoText).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    await userEvent.click(todoItem);
    
    // Should not be completed
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 5: Deleting Todos
  test('allows deleting a todo', async () => {
    render(<TodoList />);
    
    // Find delete button for "Write Tests" todo
    const deleteButton = screen.getByTestId('delete-button-3'); // ID 3 is "Write Tests"
    
    // Count todos before deletion
    const todosBefore = screen.getAllByText(/Learn React|Build a Todo App|Write Tests/);
    expect(todosBefore).toHaveLength(3);
    
    // Delete the todo
    await userEvent.click(deleteButton);
    
    // Wait for deletion
    await waitFor(() => {
      const todosAfter = screen.getAllByText(/Learn React|Build a Todo App/);
      expect(todosAfter).toHaveLength(2);
    });
    
    // Verify "Write Tests" is gone
    expect(screen.queryByText('Write Tests')).not.toBeInTheDocument();
    
    // Check stats update
    expect(screen.getByText('2')).toBeInTheDocument(); // Total should now be 2
  });

  // Test 6: Statistics update correctly
  test('updates statistics correctly', async () => {
    render(<TodoList />);
    
    // Initial stats
    expect(screen.getByText('3')).toBeInTheDocument(); // Total
    expect(screen.getByText('1')).toBeInTheDocument(); // Completed
    expect(screen.getByText('2')).toBeInTheDocument(); // Pending
    
    // Toggle a todo to completed
    const todoToToggle = screen.getByText('Build a Todo App');
    await userEvent.click(todoToToggle);
    
    // Stats should update
    expect(screen.getByText('2')).toBeInTheDocument(); // Completed should be 2
    expect(screen.getByText('1')).toBeInTheDocument(); // Pending should be 1
    
    // Add a new todo
    const input = screen.getByPlaceholderText('What needs to be done?');
    await userEvent.type(input, 'New Todo{enter}');
    
    // Stats should update
    expect(screen.getByText('4')).toBeInTheDocument(); // Total should be 4
    expect(screen.getByText('2')).toBeInTheDocument(); // Completed should still be 2
    expect(screen.getByText('2')).toBeInTheDocument(); // Pending should be 2
    
    // Delete a todo
    const deleteButton = screen.getByTestId('delete-button-1'); // Delete "Learn React"
    await userEvent.click(deleteButton);
    
    // Wait for update
    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument(); // Total should be 3
    });
  });

  // Test 7: Empty state message
  test('shows empty message when no todos', async () => {
    render(<TodoList />);
    
    // Delete all todos
    const deleteButtons = screen.getAllByRole('button', { name: /Delete todo:/ });
    
    for (const button of deleteButtons) {
      await userEvent.click(button);
    }
    
    // Wait for all deletions
    await waitFor(() => {
      expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    });
    
    // Add a new todo
    const input = screen.getByPlaceholderText('What needs to be done?');
    await userEvent.type(input, 'First Todo{enter}');
    
    // Empty message should disappear
    expect(screen.queryByText('No todos yet. Add one above!')).not.toBeInTheDocument();
    expect(screen.getByText('First Todo')).toBeInTheDocument();
  });

  // Test 8: Input clearing after adding todo
  test('clears input after adding todo', async () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add Todo');
    
    // Add a todo
    await userEvent.type(input, 'Test Todo');
    expect(input).toHaveValue('Test Todo');
    
    await userEvent.click(addButton);
    
    // Input should be cleared
    expect(input).toHaveValue('');
  });
});