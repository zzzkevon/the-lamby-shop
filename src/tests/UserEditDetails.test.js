import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { UserEditCommissionScreen } from '../CommissionsSection'; 
import { ToastProvider } from '../contexts/ToastContext'; 

jest.mock('axios'); // Mock axios

describe('UserEditCommissionScreen', () => {
  const mockReloadData = jest.fn();
  const mockDisplay = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  test('submits the commission update successfully', async () => {
    // Mock the axios put request to resolve successfully
    axios.put.mockResolvedValueOnce({ data: { success: true } });

    // Render the component
    render(
      <ToastProvider>
        <UserEditCommissionScreen
          display={mockDisplay}
          id="123" // Mock ID
          description="Initial description"
          status="pending" // Set status to pending for the test
          reloadData={mockReloadData}
        />
      </ToastProvider>
    );

    // Ensure the textarea is present and change its value
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Updated Description' } });

    // Find and click the submit button
    const submitButton = screen.getByText('Submit Changes');
    fireEvent.click(submitButton);

    // Wait for the axios put request to be called
    await waitFor(() => expect(axios.put).toHaveBeenCalledWith("https://api.", {
      id: "123",
      description: 'Updated Description',
    }));

    // Optionally check that the reloadData function was called
    expect(mockReloadData).toHaveBeenCalled();

    // Check if the display function was called to close the edit screen
    expect(mockDisplay).toHaveBeenCalledWith(false);
  });
});
