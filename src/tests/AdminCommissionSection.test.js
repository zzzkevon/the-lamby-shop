import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useToast } from '../contexts/ToastContext';

import AdminCommissionSection from '../components/CommissionsSection/AdminCommissionSection';


// Mock dependencies
jest.mock('axios');
jest.mock('../contexts/ToastContext');
jest.mock('../components/CommissionsSection/AdminCommissionItems');

describe('AdminCommissionSection', () => {
  const mockToast = jest.fn();

    // Mock the data returned by the API
    const mockData = [{
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        description: 'Commission Description',
        createdAt: '2024-01-01',
        commissionStatus: 'Pending',
        phoneNumber: '123-456-7890',
        email: 'john@example.com',
    }];

  beforeEach(() => {
    useToast.mockReturnValue(mockToast);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test the page renders correctly
  test('Render page correctly on initial load', async () => {
    /* 
        Mock axios.get here even when not needed b/c
        we need to handle async behavior of the axios
        call within the AdminCommissionSection component
    */
    axios.get.mockResolvedValue({ data: [] });
  
    // Render the component
    render(<AdminCommissionSection />);
  
    // Wait for the component to update after the API call
    await waitFor(() => {
      expect(screen.getByTestId('commissions-header')).toBeInTheDocument();
      expect(screen.getByTestId('confirm-changes-button')).toBeInTheDocument(); //confirm-changes-button
    });
  });

  // Test that the toast message displays on successful commission fetch
  test('Display toast message when getting successful commission fetch', async () => {
    axios.get.mockResolvedValue({ data: [mockData] });
    render(<AdminCommissionSection />);

    // Expect "All commissions received!" toast message on successful commission fetch
    await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith('All commissions received!', 'success');
    });
  });

  test('Display an error toast when failure to get all commission data', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching data'));
    render(<AdminCommissionSection />);

    // Expect "Error getting commission data" showToast when axios GET request return an error
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith('Error getting commission data.', 'error');
    });
  });

  test('Show toast when confirm button is clicked and commission statuses update successfully', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<AdminCommissionSection />);

    // Click the confirm changes button
    const confirmButton = screen.getByTestId('confirm-changes-button');
    fireEvent.click(confirmButton);

    // The page should re-render with the toast message "All commissions received"
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith('All commissions received!', 'success');  // JSX element for custom toast message
    });
  });

 
});
