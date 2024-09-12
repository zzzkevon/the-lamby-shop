import { useState } from 'react';
import { useRef } from 'react';
import star from '../../images/story_stars_1.png';
import React from 'react';

const CreateAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);


    const handleKeyPress = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextRef) {
                nextRef.current.focus();
            }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email.trim() && !password.trim() && !confirmPassword.trim()) {
            console.log('All fields are empty, Form submission aborted.');
            return;
        }
        if (!emailError && !passwordError && !confirmPasswordError) {
            // Submit the form data
            console.log('User will be set as a admin!');
            console.log('Form submitted successfully!');
            console.log('Email:', email);
            console.log('Password', password);
            console.log('Re-typed password:', confirmPassword);

        } else {
            console.log('Form has an Error!');
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
                            C R E A T E   A D M I N
                        </p>
                        <img src={star} alt="" class="w-16 h-16 mb-4"></img>
                    </div>
                </div>
            </header>

            <div className="flex flex-col items-start text-3xl">

                <form onSubmit={handleSubmit}>

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
            <button className="bg-[#780000] hover:bg-[#780000] text-lg text-white py-2 px-8 rounded-full mt-6" onClick={handleSubmit}>Create Admin</button>
        </div>
    </div>
);
}
export default CreateAdmin;