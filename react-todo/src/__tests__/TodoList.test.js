import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  
  test('renders initial todo items from static array', () => {
    render(<TodoList />);
    
    // Check initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check total number of todos
    const todoItems = screen.getAllByTestId(/todo-item-/);
    expect(todoItems).toHaveLength(3);
  });

  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add new todo
    fireEvent.change(input, { target: { value: 'Test New Todo' } });
    fireEvent.click(addButton);
    
    // Check new todo is added
    expect(screen.getByText('Test New Todo')).toBeInTheDocument();
    
    // Check input is cleared
    expect(input.value).toBe('');
    
    // Check we now have 4 todos
    const todoItems = screen.getAllByTestId(/todo-item-/);
    expect(todoItems).toHaveLength(4);
  });

  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    // Get the first todo
    const firstTodo = screen.getByText('Learn React');
    
    // Initially should not be completed
    expect(firstTodo).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle
    fireEvent.click(firstTodo);
    
    // Should now be completed
    expect(firstTodo).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    fireEvent.click(firstTodo);
    
    // Should not be completed again
    expect(firstTodo).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    // Get initial count
    const initialTodoItems = screen.getAllByTestId(/todo-item-/);
    const initialCount = initialTodoItems.length;
    
    // Delete the first todo
    const firstDeleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(firstDeleteButton);
    
    // Check todo is removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check count decreased
    const currentTodoItems = screen.getAllByTestId(/todo-item-/);
    expect(currentTodoItems.length).toBe(initialCount - 1);
  });

  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    const initialCount = screen.getAllByTestId(/todo-item-/).length;
    
    // Try to add empty todo
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    // Count should remain the same
    const currentCount = screen.getAllByTestId(/todo-item-/).length;
    expect(currentCount).toBe(initialCount);
  });

  test('maintains todo state after multiple operations', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add a todo
    fireEvent.change(input, { target: { value: 'Todo 1' } });
    fireEvent.click(addButton);
    
    // Toggle it
    const todo1 = screen.getByText('Todo 1');
    fireEvent.click(todo1);
    expect(todo1).toHaveStyle('text-decoration: line-through');
    
    // Add another todo
    fireEvent.change(input, { target: { value: 'Todo 2' } });
    fireEvent.click(addButton);
    
    // Delete the first new todo
    const todo1Item = screen.getByTestId(/todo-item-/).parentElement;
    const deleteButton = screen.getAllByText('Delete')[3]; // The delete button for Todo 1
    fireEvent.click(deleteButton);
    
    // Check Todo 1 is gone, Todo 2 remains
    expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });
});