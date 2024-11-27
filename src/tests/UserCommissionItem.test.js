import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UsersPersonalCommissionItem from '../components/CommissionsSection/UserPersonalCommissionItem'; // Correctly import

describe('UsersPersonalCommissionItem', () => {
  const mockReloadData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with the given props', () => {
    render(
      <UsersPersonalCommissionItem
        id={123}
        clientName="Test Client"
        description="Test description"
        status="pending"
        date="2024-11-12T00:00:00.000Z"
        reloadData={mockReloadData}
      />
    );

    expect(screen.getByText('Id: 123')).toBeInTheDocument();
    expect(screen.getByText('Client Name: Test Client')).toBeInTheDocument();
    //expect(screen.getByText('Date Created: November 12, 2024')).toBeInTheDocument();
    expect(screen.getByText('Status: pending')).toBeInTheDocument();
  });


  test('toggles the dropdown when clicked', () => {
    const props = {
      id: '123',
      clientName: 'Test Client',
      description: 'Test description',
      status: 'pending',
      date: '2024-11-12T00:00:00.000Z',
      reloadData: mockReloadData,
    };

    render(
        <UsersPersonalCommissionItem {...props} />
    );

    // Initially, the dropdown should not be open
    expect(screen.queryByText('Description: Test description')).not.toBeInTheDocument();

    // Click to toggle the dropdown
    fireEvent.click(screen.getByText('Id: 123'));

    // Now the dropdown should be open and display the description
    expect(screen.getByText('Description: Test description')).toBeInTheDocument();
  });

  test('opens the Edit Commission modal when "Edit Details" is clicked', () => {
    const props = {
      id: '123',
      clientName: 'Test Client',
      description: 'Test description',
      status: 'pending',
      date: '2024-11-12T00:00:00.000Z',
      reloadData: mockReloadData,
    };

    render(
        <UsersPersonalCommissionItem {...props} />
    );

    // Open the dropdown
    fireEvent.click(screen.getByText('Id: 123'));

    // Click "Edit Details" button
    fireEvent.click(screen.getByText('Edit Details'));
    //get by user policy popup
    fireEvent.click(screen.getByText('I Understand'));
    // Check if the Edit Commission screen is shown
    expect(screen.getByText('Edit Commission?')).toBeInTheDocument();
  });

  test('opens the Cancel Commission modal when "Cancel Commission" is clicked', () => {
    const props = {
      id: '123',
      clientName: 'Test Client',
      description: 'Test description',
      status: 'pending',
      date: '2024-11-12T00:00:00.000Z',
      reloadData: mockReloadData,
    };

    render(
        <UsersPersonalCommissionItem {...props} />
    );

    // Open the dropdown
    fireEvent.click(screen.getByText('Id: 123'));

    // Click "Cancel Commission" button
    fireEvent.click(screen.getByText('Cancel Commission'));
    fireEvent.click(screen.getByText('I Understand'));
    // Check if the Cancel Commission screen is shown
    expect(screen.getByText('Cancel Commission?')).toBeInTheDocument();
  });

});

