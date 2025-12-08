import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import TodoItem from '../components/TodoItem';

describe('TodoItem Component', () => {
  const mockTodo = {
    id: 1,
    text: 'Test Todo',
    completed: false,
  };

  test('renders todo text correctly', () => {
    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();
    
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('calls onToggle when todo text is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();
    
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    
    const todoText = screen.getByTestId('todo-text-1');
    await user.click(todoText);
    
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  test('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();
    
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    
    const deleteButton = screen.getByTestId('delete-button-1');
    await user.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test('shows completed style when todo is completed', () => {
    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();
    
    const completedTodo = {
      ...mockTodo,
      completed: true,
    };
    
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    
    const todoText = screen.getByTestId('todo-text-1');
    expect(todoText).toHaveStyle('text-decoration: line-through');
  });
});