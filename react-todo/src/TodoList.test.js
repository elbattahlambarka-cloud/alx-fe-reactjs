import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

test('renders initial todos', () => {
  render(<TodoList />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Build Todo App')).toBeInTheDocument();
  expect(screen.getByText('Write Tests')).toBeInTheDocument();
});

test('adds new todo', () => {
  render(<TodoList />);
  const input = screen.getByTestId('todo-input');
  const button = screen.getByTestId('add-button');
  
  fireEvent.change(input, { target: { value: 'Test' } });
  fireEvent.click(button);
  
  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('toggles todo', () => {
  render(<TodoList />);
  const todo = screen.getByText('Learn React');
  
  fireEvent.click(todo);
  expect(todo).toHaveStyle('text-decoration: line-through');
});

test('deletes todo', () => {
  render(<TodoList />);
  const deleteBtn = screen.getByTestId('delete-button-1');
  
  fireEvent.click(deleteBtn);
  expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
});