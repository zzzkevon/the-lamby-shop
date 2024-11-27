import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UserEditCommissionScreen from '../components/CommissionsSection/UserEditCommissionScreen'; 
import { ToastProvider, useToast } from '../contexts/ToastContext';
import { act } from 'react'
jest.mock('axios'); // Mock axios
// Mock the useToast hook
jest.mock('../contexts/ToastContext', () => ({
    ...jest.requireActual('../contexts/ToastContext'),
    useToast: jest.fn(),
  }));

describe('UserEditCommissionScreen', () => {
  const mockReloadData = jest.fn();
  const mockDisplay = jest.fn();
  const mockShowToast = jest.fn(); // Mock the showToast function

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
    useToast.mockReturnValue(mockShowToast);
  });

  test('submits the commission update successfully', async () => {
    // Mock the axios put request to resolve successfully
    axios.put.mockResolvedValueOnce({ data: { success: true } });

    // Render the component wrapped in ToastProvider
    render(
      <ToastProvider>
        <UserEditCommissionScreen
          display={mockDisplay}
          id="123"
          description="Initial description"
          status="pending" // Set status to pending for the test
          reloadData={mockReloadData}
        />
      </ToastProvider>
    );

    // Ensure the initial description is rendered
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Initial description');

    // Change the textarea value
    fireEvent.change(textarea, { target: { value: 'Updated Description' } });

    // Find and click the "Submit Changes" button
    const submitButton = screen.getByText('Submit Changes');
    fireEvent.click(submitButton);

    // Wait for the axios call to resolve and the success message to appear
    await waitFor(() => {
      // Check that the axios.put was called with the correct URL and data
      expect(axios.put).toHaveBeenCalledWith(
        "https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development/getUserCommissions", 
        {
          id: "123",
          description: 'Updated Description',
        }
      );
    });
    // Ensure that showToast is called with the success message
    expect(mockShowToast).toHaveBeenCalledWith('Successfully updated commission!', 'success');

    // Ensure the reloadData function was called
    expect(mockReloadData).toHaveBeenCalled();

    // Ensure the display function was called to close the screen
    expect(mockDisplay).toHaveBeenCalledWith(false);
  });

  test('displays success message after a successful commission update', async () => {
    // Mock the axios put request to resolve successfully
    axios.put.mockResolvedValueOnce({ data: { success: true } });
  
    // Render the component wrapped in ToastProvider
    render(
      <ToastProvider>
        <UserEditCommissionScreen
          display={mockDisplay}
          id="123"
          description="Initial description"
          status="pending" // Set status to pending for the test
          reloadData={mockReloadData}
        />
      </ToastProvider>
    );
  
    // Ensure the initial description is rendered
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Initial description');
  
    // Change the textarea value
    fireEvent.change(textarea, { target: { value: 'Updated Description' } });
  
    // Find and click the "Submit Changes" button
    const submitButton = screen.getByText('Submit Changes');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith('Successfully updated commission!', 'success');
    });
    
  });

  test('displays error message after a failed commission update', async () => {
    // Mock the axios put request to fail
    axios.put.mockRejectedValueOnce(new Error('Network error'));
  
    // Render the component wrapped in ToastProvider
    render(
      <ToastProvider>
        <UserEditCommissionScreen
          display={mockDisplay}
          id="123"
          description="Initial description"
          status="pending" // Set status to pending for the test
          reloadData={mockReloadData}
        />
      </ToastProvider>
    );
  
    // Find and click the "Submit Changes" button
    const submitButton = screen.getByText('Submit Changes');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith("Error! Network put request failed.", "error");
    });
  });

  test('displays error message if submit button is clicked when status is not pending', async () => {
  
    // Render the component wrapped in ToastProvider
    render(
      <ToastProvider>
        <UserEditCommissionScreen
          display={mockDisplay}
          id="123"
          description="Initial description"
          status="accepted" // Set status to accepted for the test
          reloadData={mockReloadData}
        />
      </ToastProvider>
    );
  
    // Find and click the "Submit Changes" button
    const submitButton = screen.getByText('Submit Changes');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith(
          `Sorry, the commission can't be changed
           since it is not in the pending status.`, "error");
    });
    
  });

  test('Close button closes popup and resets any changes to textbox', async () => {
    // Initial description for the test
    const initialDescription = 'Initial description';
  
    // Render the component with initial description prop
    render(
      <ToastProvider>
        <UserEditCommissionScreen
          display={mockDisplay}
          id="123"
          description={initialDescription}
          status="pending" // Status can be 'pending' for this test
          reloadData={mockReloadData}
        />
      </ToastProvider>
    );
  
    // Ensure the initial description is rendered in the textarea
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(initialDescription);
  
    // Simulate user typing in the textarea to change the description
    fireEvent.change(textarea, { target: { value: 'Updated Description' } });
  
    // Ensure the textarea value updates
    expect(textarea).toHaveValue('Updated Description');
  
    // Find and click the "Close" button
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
  
    // Ensure the display function was called to close the screen
    expect(mockDisplay).toHaveBeenCalledWith(false);
  
    // Ensure that the newDescription state was reset to the initial description
    // We do this by checking if the textarea value is reset to the original description
    expect(textarea).toHaveValue(initialDescription);
  });
  
});
