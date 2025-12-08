// src/__tests__/TodoItem.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../components/TodoItem';

describe('TodoItem Component', () => {
  const mockToggle = jest.fn();
  const mockDelete = jest.fn();
  
  const todo = {
    id: 1,
    text: 'Test Todo',
    completed: false,
  };

  const completedTodo = {
    ...todo,
    completed: true,
  };

  beforeEach(() => {
    mockToggle.mockClear();
    mockDelete.mockClear();
  });

  test('renders todo item with text', () => {
    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete todo:/ })).toBeInTheDocument();
  });

  test('renders completed todo with strikethrough', () => {
    render(<TodoItem todo={completedTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const todoText = screen.getByText('Test Todo');
    expect(todoText).toHaveStyle('text-decoration: line-through');
  });

  test('calls onToggle when todo content is clicked', async () => {
    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const todoElement = screen.getByTestId('todo-item-1');
    await userEvent.click(todoElement);
    
    expect(mockToggle).toHaveBeenCalledWith(1);
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test('calls onDelete when delete button is clicked', async () => {
    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const deleteButton = screen.getByTestId('delete-button-1');
    await userEvent.click(deleteButton);
    
    expect(mockDelete).toHaveBeenCalledWith(1);
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  test('shows checkmark for completed todo', () => {
    render(<TodoItem todo={completedTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const checkbox = screen.getByText('✓');
    expect(checkbox).toBeInTheDocument();
  });

  test('does not show checkmark for incomplete todo', () => {
    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const checkbox = screen.queryByText('✓');
    expect(checkbox).not.toBeInTheDocument();
  });
});