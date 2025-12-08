import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import AddTodoForm from '../components/AddTodoForm';

describe('AddTodoForm Component', () => {
  test('calls onAdd with input value when form is submitted', async () => {
    const mockOnAdd = jest.fn();
    const user = userEvent.setup();
    
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');
    
    await user.type(input, 'New Task');
    await user.click(button);
    
    expect(mockOnAdd).toHaveBeenCalledWith('New Task');
    expect(input).toHaveValue('');
  });

  test('clears input after submission', async () => {
    const mockOnAdd = jest.fn();
    const user = userEvent.setup();
    
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');
    
    await user.type(input, 'Another Task');
    await user.click(button);
    
    expect(input).toHaveValue('');
  });
});