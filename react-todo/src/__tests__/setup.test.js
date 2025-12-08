// src/__tests__/setup.test.js
// This file verifies the testing environment is set up correctly

test('testing environment is set up correctly', () => {
  expect(true).toBe(true);
});

test('Jest is working', () => {
  expect(1 + 1).toBe(2);
});

test('React Testing Library is available', () => {
  const div = document.createElement('div');
  div.textContent = 'Test';
  expect(div).toBeInTheDocument();
});