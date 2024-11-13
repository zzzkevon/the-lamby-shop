import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { UserCancelCommissionScreen } from '../components/CommissionsSection'; // Adjust the path as needed
import { ToastProvider, useToast } from '../contexts/ToastContext'; 

jest.mock('axios'); // Mock axios
jest.mock('../contexts/ToastContext', () => ({
  ...jest.requireActual('../contexts/ToastContext'),
  useToast: jest.fn(),
}));

describe('UserCancelCommissionScreen', () => {
  const mockReloadData = jest.fn();
  const mockDisplay = jest.fn();
  const mockShowToast = jest.fn(); // Mock the showToast function

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
    useToast.mockReturnValue(mockShowToast); // Return the mock showToast function when useToast is called
  });

  test('submits the commission cancellation successfully and shows success toast', async () => {
    // Mock the axios delete request to resolve successfully
    axios.delete.mockResolvedValueOnce({ data: { success: true } });

    // Render the component wrapped in ToastProvider
    render(
      <ToastProvider>
        <UserCancelCommissionScreen
          display={mockDisplay}
          id="123"
          status="pending" // Set status to pending for the test
          reloadData={mockReloadData}
        />
      </ToastProvider>
    );

    // Find and click the "Delete Commission" button
    const deleteButton = screen.getByText('Delete Commission');
    fireEvent.click(deleteButton);

    // Wait for the axios request to be called
    await waitFor(() => expect(axios.delete).toHaveBeenCalledWith(
      'https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development/getUserCommissions', 
      { data: { id: '123' } }
    ));

    // Wait for the showToast function to be called with the success message
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('Successfully cancelled commission!', 'success');
    });

    // Ensure the reloadData function was called
    expect(mockReloadData).toHaveBeenCalled();

    // Ensure the display function was called to close the cancel screen
    expect(mockDisplay).toHaveBeenCalledWith(false);
  });

  test('displays error message after a failed commission cancellation', async () => {
    // Mock the axios delete request to reject with an error
    axios.delete.mockRejectedValueOnce(new Error('Network error')); // Simulate a network error

    // Render the component wrapped in ToastProvider
    render(
      <ToastProvider>
        <UserCancelCommissionScreen
          display={mockDisplay}
          id="123"
          status="pending" // Set status to pending for the test
          reloadData={mockReloadData}
        />
      </ToastProvider>
    );

    // Find and click the "Delete Commission" button
    const deleteButton = screen.getByText('Delete Commission');
    fireEvent.click(deleteButton);

    // Wait for the showToast function to be called with the error message
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('Error! Network delete request failed.', 'error');
    });
  });

  test('displays error message when commission is not in pending status', async () => {
    // Render the component wrapped in ToastProvider with a non-pending status
    render(
      <ToastProvider>
        <UserCancelCommissionScreen
          display={mockDisplay}
          id="123"
          status="completed" // Set status to something other than pending
          reloadData={mockReloadData}
        />
      </ToastProvider>
    );

    // Find and click the "Delete Commission" button
    const deleteButton = screen.getByText('Delete Commission');
    fireEvent.click(deleteButton);

    // Wait for the showToast function to be called with the non-pending error message
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(
        expect.stringMatching(
            /^Sorry, the commission can't be cancelled\s+since it is not in the pending status\.$/
          ),
          'error')
    });
  });

  test('closes the commission cancellation screen when Close button is clicked', async () => {
    // Render the component wrapped in ToastProvider
    render(
      <ToastProvider>
        <UserCancelCommissionScreen
          display={mockDisplay}
          id="123"
          status="pending" // Set status to pending for the test
          reloadData={mockReloadData}
        />
      </ToastProvider>
    );
  
    // Find and click the "Close" button
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
  
    // Ensure the display function was called with false to close the screen
    expect(mockDisplay).toHaveBeenCalledWith(false);
  });
  
});
