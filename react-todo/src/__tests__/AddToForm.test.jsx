// src/__tests__/AddTodoForm.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTodoForm from '../components/AddTodoForm';

describe('AddTodoForm Component', () => {
  const mockAddTodo = jest.fn();

  beforeEach(() => {
    mockAddTodo.mockClear();
  });

  test('renders form with input and button', () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
  });

  test('calls onAddTodo with input value when form is submitted', async () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Add Todo');
    
    await userEvent.type(input, 'Test Todo');
    await userEvent.click(button);
    
    expect(mockAddTodo).toHaveBeenCalledWith('Test Todo');
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
  });

  test('clears input after submission', async () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Add Todo');
    
    await userEvent.type(input, 'Test Todo');
    expect(input).toHaveValue('Test Todo');
    
    await userEvent.click(button);
    
    expect(input).toHaveValue('');
  });

  test('shows error when trying to add empty todo', async () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const button = screen.getByText('Add Todo');
    
    await userEvent.click(button);
    
    expect(screen.getByText('Todo cannot be empty')).toBeInTheDocument();
    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  test('clears error when user starts typing', async () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Add Todo');
    
    // Trigger error
    await userEvent.click(button);
    expect(screen.getByText('Todo cannot be empty')).toBeInTheDocument();
    
    // Start typing
    await userEvent.type(input, 'Test');
    
    // Error should be cleared
    expect(screen.queryByText('Todo cannot be empty')).not.toBeInTheDocument();
  });

  test('submits form when Enter key is pressed', async () => {
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    
    await userEvent.type(input, 'Test Todo{enter}');
    
    expect(mockAddTodo).toHaveBeenCalledWith('Test Todo');
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
  });
});