import { useState } from 'react';
import { useRef } from 'react';
import star from '../images/story_stars_1.png'
import React from 'react';

const CreateAccount = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const handleKeyPress = (e, nextRef) => {
        //For handling enter key to move to next box
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextRef) {
                nextRef.current.focus();
            }
        }
    };

    const validateFirstName = () => {
        //Check for first name input
        if (firstName.trim() === '') {
            setFirstNameError('First name is required');
        } else {
            setFirstNameError('');
        }
    };

    const validateLastName = () => {
        //Check for last name input
        if (lastName.trim() === '') {
            setLastNameError('Last name is required');
        } else {
            setLastNameError('');
        }
    };

    const validateUsername = () => {
        //check for valid username
        if (userName.trim() === '') {
            setUsernameError('Username is required');
        } else if (/[^a-zA-Z0-9]/.test(userName)) {
            setUsernameError('Username cannot contain special characters');
        } else if (userName.length > 15) {
            setUsernameError('Username must be 15 characters or less');
        } else {
            setUsernameError('');
        }
    };

    const validateEmail = () => {
        // Check for a valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            setEmailError('Email is required');
        } else if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = () => {
        // Check password requirements
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,32}$/;
        if (password.trim() === '') {
            setPasswordError('Password is required');
        } else if (!passwordRegex.test(password)) {
            setPasswordError('Password must contain at least 1 uppercase letter and 1 number, and be 8-32 characters long');
        } else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = () => {
        // Check if passwords match
        if (confirmPassword.trim() === '') {
            setConfirmPasswordError('Please confirm your password');
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const role = "customer";
        if(!firstName.trim() && !lastName.trim() && !userName.trim() && !email.trim() &&
        !password.trim() && !confirmPassword.trim()) {
            console.log('All fields are empty, Form submission aborted.');
            return;
        }

        try {
            //After getting input from user for account check if email already exists if so notify user of error
            const usernameCheckResponse = await fetch('https://xgj9xa22l3.execute-api.us-west-2.amazonaws.com/dev/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(!usernameCheckResponse.ok) {
                throw new Error ('Failed to fetch users for username check');
            }
            const userCheck = await usernameCheckResponse.json();

            const usernameExists = userCheck.some(userCheck => userCheck.userName === userName);

            if(usernameExists) {
                console.log('Username is already taken');
                setUsernameError('Username is already taken');
                return;
            }

            //
            const emailCheckResponse = await fetch('https://xgj9xa22l3.execute-api.us-west-2.amazonaws.com/dev/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(!emailCheckResponse.ok) {
                throw new Error ('Failed to fetch users for email check');
            }
            const users = await emailCheckResponse.json();

            const emailExists = users.some(user => user.email === email);

            if(emailExists) {
                console.log('Email is already taken');
                setEmailError('Email is already taken');
                return;
            }

            //
            const response = await fetch('https://xgj9xa22l3.execute-api.us-west-2.amazonaws.com/dev/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName,
                    password,
                    email,
                    firstName,
                    lastName,
                    role
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Account created sucessfully', data);
            } else {
                console.log('Error creating account');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        // Perform form submission if all validations pass
        if (!usernameError && !emailError && !passwordError && !confirmPasswordError) {
            // Submit the form data
            console.log('Form submitted successfully!');
            console.log('First name:', firstName);
            console.log('Last name:', lastName);
            console.log('Username:', userName);
            console.log('Email:', email);
            console.log('Password', password);
            console.log('Re-typed password:', confirmPassword);

        } else {
            console.log('Form has an Error!');
            console.log('First name:', firstName);
            console.log('Last name:', lastName);
            console.log('Username:', userName);
            console.log('Email:', email);
            console.log('Password', password);
            console.log('Re-typed password:', confirmPassword);
        }
    };

    return (
        <div className="main-bg just-another-hand 4xl">
            <div className="flex flex-col justify-start items-center min-w-screen min-h-screen">

                <header>
                    <div className="container mx-auto px-4 mt-16">
                        <div className="flex flex-center justify-center">
                            <img src={star} alt="" class="w-16 h-16 mx-2 mb-2"></img>
                            <p className="text-4xl header-font font-bold mb-4 tracking-wider whitespace-pre">
                                C R E A T E   A C C O U N T
                            </p>
                            <img src={star} alt="" class="w-16 h-16 mb-4"></img>
                        </div>
                    </div>
                </header>

                <div className="flex flex-col items-start text-3xl">

                    <form onSubmit={handleSubmit}>
                        <p className="font-bold text-3xl mt-2">
                            <span className="text-red-500"> *</span>
                            <span className="just-another-hand">first name</span>
                        </p>
                        <input
                            id="first-name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border border-[#780000] px-2 py-1 w-full resize-none"
                            placeholder="first name"
                            onBlur={validateFirstName}
                            ref={firstNameRef}
                            onKeyPress={(e) => handleKeyPress(e, lastNameRef)}
                        />
                        {firstNameError && <span className="text-red-500">{firstNameError}</span>}

                        <p className="font-bold mb-2 text-3xl mt-2">
                            <span className="text-red-500"> *</span>
                            <span className="just-another-hand">last name</span>
                        </p>
                        <input
                            id="last-name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border border-[#780000] px-2 py-1 w-full resize-none"
                            placeholder="last name"
                            onBlur={validateLastName}
                            ref={lastNameRef}
                            onKeyPress={(e) => handleKeyPress(e, usernameRef)}
                        />
                        {lastNameError && <span className="text-red-500">{lastNameError}</span>}

                        <p className="font-bold mb-2 text-3xl mt-2">
                            <span className="text-red-500"> *</span>
                            <span className="just-another-hand">username</span>
                        </p>
                        <input
                            id="username"
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-[#780000] px-2 py-1 w-full resize-none"
                            placeholder="username"
                            onBlur={validateUsername}
                            ref={usernameRef}
                            onKeyPress={(e) => handleKeyPress(e, emailRef)}
                        />
                        {usernameError && <span className="text-red-500">{usernameError}</span>}

                        <p className="font-bold mb-2 text-3xl mt-2">
                            <span className="text-red-500"> *</span>
                            <span className="just-another-hand">email</span>
                        </p>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-[#780000] px-2 py-1 w-full resize-none"
                            placeholder="email"
                            onBlur={validateEmail}
                            ref={emailRef}
                            onKeyPress={(e) => handleKeyPress(e, passwordRef)}
                        />
                        {emailError && <span className="text-red-500">{emailError}</span>}

                        <p className="font-bold mb-2 text-3xl">
                            <span className="text-red-500"> *</span>
                            <span className="just-another-hand">password</span>
                        </p>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-[#780000] px-2 py-1 w-full resize-none"
                            placeholder="password"
                            onBlur={validatePassword}
                            ref={passwordRef}
                            onKeyPress={(e) => handleKeyPress(e, confirmPasswordRef)}
                        />
                        {passwordError && <span className="text-red-500">{passwordError}</span>}

                        <p className="font-bold mb-2 text-3xl mt-2">
                            <span className="text-red-500"> *</span>
                            <span className="just-another-hand">re-type password</span>
                        </p>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border border-[#780000] px-2 py-1 w-full resize-none"
                            placeholder="confirm password"
                            onBlur={validateConfirmPassword}
                            ref={confirmPasswordRef}
                            onKeyPress={(e) => handleKeyPress(e, null)}
                        />
                        {confirmPasswordError && <span className="text-red-500">{confirmPasswordError}</span>}

                    </form>
                </div>
                <button className="bg-[#780000] hover:bg-[#780000] text-white py-2 px-4 rounded-full mt-4" onClick={handleSubmit}>Create Account</button>
            </div>
        </div>
    );
}
export default CreateAccount;