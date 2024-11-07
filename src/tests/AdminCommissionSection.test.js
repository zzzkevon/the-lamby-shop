import { CommissionItem } from '../components/CommissionsSection';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('CommissionItem Component', () => {
  jest.mock("axios");
  
  const defaultProps = {
    id: "123",
    clientName: "Test Client",
    description: "This is a test description.",
    createdAt: "2024-10-22T12:00:00.000Z",
    status: "Pending",
    phoneNumber: "123-456-7890",
    email: "test@example.com",
    items: [],
    setItems: jest.fn(),
    setFormData: jest.fn(),
    reloadData: jest.fn(),
  };

  it('should render with provided data', () => {
    render(<CommissionItem {...defaultProps} />);

    expect(screen.getByText(/Id: 123/)).toBeInTheDocument();
    expect(screen.getByText(/Client Name: Test Client/)).toBeInTheDocument();
    expect(screen.getByText(/Date:/)).toBeInTheDocument();
    expect(screen.getByText(/Current status: Pending/)).toBeInTheDocument();
  });

  it('should toggle dropdown to show more information', () => {
    render(<CommissionItem {...defaultProps} />);
    const toggleButton = screen.getByText(/Id: 123/);

    // Click to expand
    fireEvent.click(toggleButton);
    expect(screen.getByText(/--Contact info--/)).toBeInTheDocument();
    expect(screen.getByText(/Phone Number: 123-456-7890/)).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(toggleButton);
    expect(screen.queryByText(/--Contact info--/)).not.toBeInTheDocument();
  });

  it('should handle checkbox selection and unselection', () => {
    render(<CommissionItem {...defaultProps} />);

    const acceptCheckbox = screen.getByLabelText(/Accept/);
    const declineCheckbox = screen.getByLabelText(/Decline/);
    const flagCheckbox = screen.getByLabelText(/Flag/);

    // Initially, none should be selected
    expect(acceptCheckbox).not.toBeChecked();
    expect(declineCheckbox).not.toBeChecked();
    expect(flagCheckbox).not.toBeChecked();

    // Select "Accept"
    fireEvent.click(acceptCheckbox);
    expect(defaultProps.setFormData).toHaveBeenCalledWith({ id: "123", commissionStatus: "accepted" });

    // Deselect "Accept"
    fireEvent.click(acceptCheckbox);
    expect(defaultProps.setItems).toHaveBeenCalled();
  });

  it('should show confirm delete dialog when delete button is clicked', async () => {
    render(<CommissionItem {...defaultProps} />);

    // Expand dropdown to see delete button
    fireEvent.click(screen.getByText(/Id: 123/));
    fireEvent.click(screen.getByText(/Delete Commission/));

    // Check for confirm message in the snackbar
    expect(screen.getByText(/Are you sure with deleting this commission?/)).toBeInTheDocument();
    expect(screen.getByText(/Confirm/)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/)).toBeInTheDocument();
  });

  it('should handle canceling the delete action', async () => {
    render(<CommissionItem {...defaultProps} />);

    // Expand dropdown and trigger delete action
    fireEvent.click(screen.getByText(/Id: 123/));
    fireEvent.click(screen.getByText(/Delete Commission/));

    // Cancel delete
    fireEvent.click(screen.getByText(/Cancel/));
    await waitFor(() => {
      expect(screen.getByText(/Canceled delete./)).toBeInTheDocument();
    });
  });

  it('should call reloadData after successful delete', async () => {
    const mockShowToast = jest.fn();
    render(<CommissionItem {...defaultProps} showToast={mockShowToast} />);

    // Expand dropdown and trigger delete
    fireEvent.click(screen.getByText(/Id: 123/));
    fireEvent.click(screen.getByText(/Delete Commission/));
    fireEvent.click(screen.getByText(/Confirm/));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(`Deleting commission ID ${defaultProps.id}`, "success");
      expect(defaultProps.reloadData).toHaveBeenCalled();
    });
  });
});