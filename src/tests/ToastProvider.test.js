import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToastProvider, useToast } from '../contexts/ToastContext'; 
import { act } from 'react';

// Component to trigger showToast for testing
const TestComponent = ({ type, message }) => {
  const showToast = useToast();

  return (
    <button
      data-testid="show-toast-button"
      onClick={() => showToast(message, type)}
    >
      Show Toast
    </button>
  );
};

describe('ToastProvider', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers for the test
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // Run any pending timers to clean up
    jest.useRealTimers(); // Restore real timers
  });

  const toastTypes = [
    { type: 'success', message: 'Success message', expectedClass: 'bg-green-500' },
    { type: 'error', message: 'Error message', expectedClass: 'bg-red-500' },
    { type: 'warning', message: 'Warning message', expectedClass: 'bg-orange-500' },
    { type: 'info', message: 'Info message', expectedClass: 'bg-blue-500' },
  ];

  toastTypes.forEach(({ type, message, expectedClass }) => {
    test(`shows a ${type} toast message with the correct color`, () => {
      render(
        <ToastProvider>
          <TestComponent type={type} message={message} />
        </ToastProvider>
      );

      // Use act to wrap the button click
      act(() => {
        const button = screen.getByTestId('show-toast-button');
        button.click();
      });

      // Check for the toast message
      const toastMessage = screen.getByText(message);
      expect(toastMessage).toBeInTheDocument();

      // Check that the toast message has the correct color class
      expect(toastMessage).toHaveClass(expectedClass); // Check for expected color class

      // Fast-forward timers by 3 seconds to simulate the toast disappearing
      act(() => {
        jest.advanceTimersByTime(3000); // Fast-forward timers
      });

      // Check that the toast is removed
      expect(toastMessage).not.toBeInTheDocument();
    });
  });
});

