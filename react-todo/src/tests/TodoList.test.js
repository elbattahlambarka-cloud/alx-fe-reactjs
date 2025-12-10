import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders initial todo items correctly', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    const completedTodo = screen.getByText('Build Todo App');
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
  });

  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');
    
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(button);
    
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    const todo = screen.getByText('Learn React');
    
    expect(todo).not.toHaveStyle('text-decoration: line-through');
    
    fireEvent.click(todo);
    
    expect(todo).toHaveStyle('text-decoration: line-through');
    
    fireEvent.click(todo);
    
    expect(todo).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});