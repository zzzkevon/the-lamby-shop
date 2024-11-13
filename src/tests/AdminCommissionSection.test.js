import React from 'react';
import axios from 'axios';
import { useToast } from '../contexts/ToastContext';
import AdminCommissionSection from '../components/CommissionsSection/AdminCommissionSection';
import AdminCommissionItem from '../components/CommissionsSection/AdminCommissionItems';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock dependencies
jest.mock('axios');
jest.mock('../contexts/ToastContext');

// Mock the data returned by the API
const mockData = {
  id: '1',
  clientName: 'John Doe',
  description: 'Test commission description',
  createdAt: '2024-10-15T12:00:00Z',
  status: 'pending',
  phoneNumber: '123456789',
  email: 'johndoe@example.com',
  items: []
};
const mockProps = {
  ...mockData,
  setItems: jest.fn(),
  setFormData: jest.fn(),
  reloadData: jest.fn(),
};


describe('AdminCommissionSection', () => {
    const mockToast = jest.fn();

  beforeEach(() => {
    useToast.mockReturnValue(mockToast);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test that the toast message displays on successful commission fetch
  test('Display success toast message when commissions get initially loaded to page', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<AdminCommissionSection />);

    // Expect "All commissions received!" toast message on successful commission fetch
    expect(screen.getByTestId('commissions-header')).toHaveTextContent('C O M M I S S I O N S');
    await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith('All commissions received!', 'success');
    });
  });

  // Test that the toast message displays error message on get request error
  test('Display error toast message when failed to load commissions on initial load', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching data'));
    render(<AdminCommissionSection />);

    // Expect "All commissions received!" toast message on successful commission fetch
    expect(screen.getByTestId('commissions-header')).toHaveTextContent('C O M M I S S I O N S');

    // Expect "Error getting commission data" showToast when axios GET request return an error
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith("Error getting commission data.", 'error');
    });
  });

  test('Displays confirmation dialog when confirm button is clicked', async () => {
    // Mock API response for initial data load
    axios.get.mockResolvedValueOnce({ data: [] });
    render(<AdminCommissionSection />);

    // Click on confirm changes button
    const confirmButton = screen.getByTestId('confirm-changes-button');
    fireEvent.click(confirmButton);

    // Expect the confirmation toast to show
    expect(mockToast).toHaveBeenCalledWith(
      expect.anything(), "error" // Not an error, error is chosen for styling choices for the toast message
    ); // expect.anything() because the toast string is HTML code
  });
});

describe('AdminCommissionItems', () => {
  const mockToast = jest.fn();
  beforeEach(() => {
    useToast.mockReturnValue(mockToast);
  });

  test('Renders mock commission item details', () => {
    render(
      <AdminCommissionItem
        {...mockProps}
      />
    );

    // Check that the client name, date, and status are displayed correctly
    const commissionId = screen.getByTestId('commission-id');
    expect(commissionId).toHaveTextContent('Id: 1')

    const clientNameElement = screen.getByTestId('client-name');
    expect(clientNameElement).toHaveTextContent('Client Name: John Doe');

    const commissionDateElement = screen.getByTestId('commission-date');
    expect(commissionDateElement).toHaveTextContent('Date: October 15, 2024');

    const commissionStatusElement = screen.getByTestId('commission-status');
    expect(commissionStatusElement).toHaveTextContent('Current status: pending');
  });

  test('Renders dropdown content when commission item is opened', async () => {
    render( <AdminCommissionItem {...mockProps}/> );

    // Open commission item
    const openCommission = screen.getByTestId('open-dropdown-commission');
    fireEvent.click(openCommission);

    // Check if dropdown content of a commission item is visible
    await waitFor(() => screen.getByTestId('dropdown-content'));
    expect(screen.getByTestId('dropdown-content')).toBeInTheDocument();
  })
  
  test('Renders "N/A" for commission with undefined name', () => {
    render( <AdminCommissionItem {...mockData} clientName={undefined} /> );
  
    // Check that "N/A" is displayed when clientName is undefined
    const clientNameElement = screen.getByTestId('client-name');
    expect(clientNameElement).toHaveTextContent('Client Name: N/A');
  });

  test('Renders client name for mock commission', () => {
    render( <AdminCommissionItem {...mockData} /> );
  
    // Check that "N/A" is displayed when clientName is undefined
    const clientNameElement = screen.getByTestId('client-name');
    expect(clientNameElement).toHaveTextContent('Client Name: John Doe');
  });

  // Render n/a for commission that didn't put email and phone number 
  test('Renders "N/A" for commission with undefined email or phone number while the dropdown is open', async () => {
    render( <AdminCommissionItem {...mockProps} phoneNumber={undefined} email={undefined}/> );

    // Open commission item dropdown
    const openCommission = screen.getByTestId('open-dropdown-commission');
    fireEvent.click(openCommission);
    await waitFor(() => screen.getByTestId('dropdown-content'));
    expect(screen.getByTestId('dropdown-content')).toBeInTheDocument();

    // Get the undefined email and phone number once dropdown is open
    const email = screen.getByTestId('email');
    expect(email).toHaveTextContent('Email: N/A');
    const phoneNumber = screen.getByTestId('phone-number');
    expect(phoneNumber).toHaveTextContent('Phone Number: N/A');
  })

  // Render email and phone number of commission
  test('Renders email and phone number for mock commission while the dropdown is open', async () => {
    render( <AdminCommissionItem {...mockProps}/> );

    // Open commission item dropdown
    const openCommission = screen.getByTestId('open-dropdown-commission');
    fireEvent.click(openCommission);
    await waitFor(() => screen.getByTestId('dropdown-content'));
    expect(screen.getByTestId('dropdown-content')).toBeInTheDocument();

    // Get the undefined email and phone number once dropdown is open
    const email = screen.getByTestId('email');
    expect(email).toHaveTextContent('Email: johndoe@example.com');
    const phoneNumber = screen.getByTestId('phone-number');
    expect(phoneNumber).toHaveTextContent('Phone Number: 123456789');
  })

  test('Deletes commission item while the dropdown is opened and delete button gets clicked', async () => {
    render( <AdminCommissionItem {...mockData} /> );

    // Open commission item
    const openCommission = screen.getByTestId('open-dropdown-commission');
    fireEvent.click(openCommission);
    // Check if dropdown content of a commission item is visible
    await waitFor(() => screen.getByTestId('dropdown-content'));
    expect(screen.getByTestId('dropdown-content')).toBeInTheDocument();

    // Once dropdown is open, click delete-commission-button
    const deleteCommission = screen.getByTestId('delete-commission-button');
    fireEvent.click(deleteCommission);
  })

  test('Change statuses of commission item to accept, decline, and flag', () => {
    const setFormDataMock = jest.fn();
    render( <AdminCommissionItem {...mockData} setFormData={setFormDataMock} /> );

    // Checkboxes to click
    const accept = screen.getByTestId('accept');
    const decline = screen.getByTestId('decline');
    const flag = screen.getByTestId('flag');

    // Accept test
    fireEvent.click(accept);
    expect(accept.checked).toBe(true);
    expect(decline.checked).toBe(false);
    expect(flag.checked).toBe(false);
    // Unclick Accept
    fireEvent.click(accept);
    expect(accept.checked).toBe(false);

    // Decline test
    fireEvent.click(decline);
    expect(accept.checked).toBe(false);
    expect(decline.checked).toBe(true);
    expect(flag.checked).toBe(false);
    // Unclick decline
    fireEvent.click(decline);
    expect(decline.checked).toBe(false);

    // Flag test
    fireEvent.click(flag);
    expect(accept.checked).toBe(false);
    expect(decline.checked).toBe(false);
    expect(flag.checked).toBe(true);
    // Unclick flag
    fireEvent.click(flag);
    expect(flag.checked).toBe(false);
  })

});