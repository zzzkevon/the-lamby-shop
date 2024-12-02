import React from 'react';
import axios from 'axios';
import { useToast } from '../contexts/ToastContext';
import UpdatePassword from '../components/AccountManagement/UpdatePassword';
import UpdateEmail from '../components/AccountManagement/UpdateEmail';
import { useNavigate } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock dependencies
jest.mock('axios');
jest.mock('../contexts/ToastContext');
jest.mock('react-router-dom')

const username = "abc123"
const mockToast = jest.fn();
const mockNavigate = jest.fn();

describe('UpdatePassword', () => {
    beforeEach(() => {
        useToast.mockReturnValue(mockToast);
        useNavigate.mockReturnValue(mockNavigate);
    });
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('Renders input fields and submit button', () => {
        render(<UpdatePassword username={username} />);
        
        // Check if the password fields and submit button are rendered
        expect(screen.getByTestId('new-pass')).toBeInTheDocument();
        expect(screen.getByTestId('conf-new-pass')).toBeInTheDocument();
        expect(screen.getByTestId('change-pass-btn')).toBeInTheDocument();
    });

    test('Shows error on empty input fields', () => {
        render(<UpdatePassword username={username} />);
        
        // Simulate typing a weak password
        const newPasswordInput = screen.getByTestId('new-pass');
        fireEvent.change(newPasswordInput, { target: { value: '' } });
        const newConfPasswordInput = screen.getByTestId('conf-new-pass');
        fireEvent.change(newConfPasswordInput, { target: { value: '' } });
        // Click change password
        const button = screen.getByTestId('change-pass-btn')
        fireEvent.click(button);
        
        // Check if error message appears
        const newPassErr = screen.getByTestId('new-pass-err');
        expect(newPassErr).toHaveTextContent('New password is required');
    });
    
    test('Shows error if new password does not meet requirements', () => {
        render(<UpdatePassword username={username} />);
        
        // Simulate typing a weak password
        const newPasswordInput = screen.getByTestId('new-pass');
        fireEvent.change(newPasswordInput, { target: { value: 'short' } });
        const newConfPasswordInput = screen.getByTestId('conf-new-pass');
        fireEvent.change(newConfPasswordInput, { target: { value: 'short' } });
        // Click change password
        const button = screen.getByTestId('change-pass-btn')
        fireEvent.click(button);
        
        // Check if error message appears
        const newPassErr = screen.getByTestId('new-pass-err');
        expect(newPassErr).toHaveTextContent('Password must contain at least 1 uppercase letter and 1 number, and be 8-32 characters long');
    });

    test('Show error if new password doesnt match conf password', () => {
        render(<UpdatePassword username={username} />);
        
        // Simulate typing a weak password
        const newPasswordInput = screen.getByTestId('new-pass');
        fireEvent.change(newPasswordInput, { target: { value: '!Q2w#E4r5t' } });
        const newConfPasswordInput = screen.getByTestId('conf-new-pass');
        fireEvent.change(newConfPasswordInput, { target: { value: '!Q2w#E4r5' } });
        // Click change password
        const button = screen.getByTestId('change-pass-btn')
        fireEvent.click(button);
        
        // Expect mock toast message
        const newPassErr = screen.getByTestId('conf-pass-err');
        expect(newPassErr).toHaveTextContent('Passwords are not the same');
    });

    test('Show success if password meets all requirements (8-32 chars, uppercase, lowercase, number, special char)', async () => {
        // Spy on console.log
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        // Mock the PUT request to resolve successfully
        axios.put.mockResolvedValueOnce({ data: { message: 'Password updated successfully' } });
        render(<UpdatePassword username={username} />);

        // Find the input fields and the button
        const newPasswordInput = screen.getByTestId('new-pass');
        const newConfPasswordInput = screen.getByTestId('conf-new-pass');
        const button = screen.getByTestId('change-pass-btn');

        // Simulate user typing a valid password
        fireEvent.change(newPasswordInput, { target: { value: '!Q2w#E4r5t' } });
        fireEvent.change(newConfPasswordInput, { target: { value: '!Q2w#E4r5t' } });

        // Click the button to submit
        fireEvent.click(button);

    // Clean up the mock
    consoleSpy.mockRestore();
    })
})

describe('UpdateEmail', () => {
    beforeEach(() => {
        useToast.mockReturnValue(mockToast);
        useNavigate.mockReturnValue(mockNavigate);
    });
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('Render input fields and submit button', () => {
        render(<UpdateEmail username={username} />);
        expect(screen.getByTestId('new-email')).toBeInTheDocument();
        expect(screen.getByTestId('conf-email')).toBeInTheDocument();
        expect(screen.getByTestId('change-email-btn')).toBeInTheDocument();
    })

    test('Shows error with empty input fields', () => {
        render(<UpdateEmail username={username} />);
        const newemail = screen.getByTestId('new-email');
        const confemail = screen.getByTestId('conf-email');
        const submit = screen.getByTestId('change-email-btn');
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        // Enter empty inputs
        fireEvent.change(newemail, { target: { value: '' }});
        fireEvent.change(confemail, { target: { value: '' }});

        // Click submit button
        fireEvent.click(submit);
        const emailerr = screen.getByTestId('email-error');
        expect(emailerr).toHaveTextContent("Email is required");
    })

    test('Shows error with bad email format', () => {
        render(<UpdateEmail username={username} />);
        const newemail = screen.getByTestId('new-email');
        const confemail = screen.getByTestId('conf-email');
        const submit = screen.getByTestId('change-email-btn');
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        // Enter empty inputs
        fireEvent.change(newemail, { target: { value: 'test@email' }});
        fireEvent.change(confemail, { target: { value: 'test@email' }});

        // Click submit button
        fireEvent.click(submit);
        const emailerr = screen.getByTestId('email-error');
        expect(emailerr).toHaveTextContent("Email is not in the correct format");
    })

    test('Shows error with email and conf-email not matching', async () => {
        render(<UpdateEmail username={username} />);
        const newemail = screen.getByTestId('new-email');
        const confemail = screen.getByTestId('conf-email');
        const submit = screen.getByTestId('change-email-btn');
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        // Enter empty inputs
        fireEvent.change(newemail, { target: { value: 'test@email.com' }});
        fireEvent.change(confemail, { target: { value: 'tester@email.com' }});

        // Mock the API response to simulate an email already in use
        axios.put.mockRejectedValueOnce({
            response: { data: { message: 'Email already in use' } }
        });

        // Click submit button
        fireEvent.click(submit);
        const emailerr = screen.getByTestId('conf-email-error');
        expect(emailerr).toHaveTextContent("Emails are not the same");

        consoleSpy.mockRestore();
    })

    test('Shows error with emails already used by other accounts', async () => {
        render(<UpdateEmail username={username} />);
        const newemail = screen.getByTestId('new-email');
        const confemail = screen.getByTestId('conf-email');
        const submit = screen.getByTestId('change-email-btn');
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        // Enter empty inputs
        fireEvent.change(newemail, { target: { value: 'existing@example.com' }});
        fireEvent.change(confemail, { target: { value: 'existing@example.com' }});

        // Mock the API response to simulate an email already in use
        axios.put.mockRejectedValueOnce({
            response: { data: { message: 'Email already in use' } }
        });

        // Click submit button
        fireEvent.click(submit);

        // Wait for the mock request to complete
        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith('https://xgj9xa22l3.execute-api.us-west-2.amazonaws.com/Prod/cognito', {
                sub: username,
                newEmail: 'existing@example.com'
            });
        });

        expect(mockToast).toHaveBeenCalledWith("Changing email...", "info");
        expect(mockToast).toHaveBeenCalledWith("Error, email already exists", "error");
        consoleSpy.mockRestore();
    })

    test('Shows success with email that hits all requirements (unused email, correct format, non-empty input fields)', async () => {
        axios.put.mockReset();
        render(<UpdateEmail username={username} />);
        const newemail = screen.getByTestId('new-email');
        const confemail = screen.getByTestId('conf-email');
        const submit = screen.getByTestId('change-email-btn');

        // Enter empty inputs
        fireEvent.change(newemail, { target: { value: 'newunusedemail@example.com' }});
        fireEvent.change(confemail, { target: { value: 'newunusedemail@example.com' }});

        // Mock the API response to simulate an email already in use
        axios.put.mockResolvedValueOnce({
            response: { data: { message: 'Email updated successfully' } }
        });

        // Click submit button
        fireEvent.click(submit);

        // Verify that the "Changing email..." toast message is displayed
        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith("Changing email...", "info");
        });


        // Verify that the "Email updated successfully" success message is displayed
        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith("Email changed!", "success");
        });
    })
    
})