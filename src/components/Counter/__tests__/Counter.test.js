import React from 'react';
import Counter from '../Counter';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

// Step 1: Count starts with 0 and button is disabled
test('count starts with 0 and button is disabled', () => {
  const { getByTestId } = render(<Counter />);
  const countElement = getByTestId('count');
  const buttonElement = getByTestId('button');

  expect(countElement.textContent).toBe('Clicked 0 times');
  expect(buttonElement).toBeDisabled();
});

// Step 2: Checking the checkbox enables the button
test('checking the checkbox enables the button', () => {
  const { getByTestId } = render(<Counter />);
  const buttonElement = getByTestId('button');
  const checkboxElement = getByTestId('checkbox');

  expect(buttonElement).toBeDisabled();
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
});

// Step 3: Clicking enabled button increments counter
test('clicking enabled button increments counter', () => {
  const { getByTestId } = render(<Counter />);
  const buttonElement = getByTestId('button');
  const checkboxElement = getByTestId('checkbox');
  const countElement = getByTestId('count');

  // Enable button
  fireEvent.click(checkboxElement);

  // First click
  fireEvent.click(buttonElement);
  expect(countElement.textContent).toBe('Clicked 1 time');

  // Second click
  fireEvent.click(buttonElement);
  expect(countElement.textContent).toBe('Clicked 2 times');
});

// Step 4 Document title updates when checkbox is checked
test('document title updates when checkbox is checked', () => {
  const originalTitle = document.title;
  const { getByTestId } = render(<Counter />);
  const buttonElement = getByTestId('button');
  const checkboxElement = getByTestId('checkbox');

  // Check the checkbox
  fireEvent.click(checkboxElement);
  expect(document.title).toBe('Total number of clicks: 0');

  // Click button to increment
  fireEvent.click(buttonElement);
  expect(document.title).toBe('Total number of clicks: 1');

  // Uncheck checkbox
  fireEvent.click(checkboxElement);
  expect(document.title).toBe(originalTitle);
});