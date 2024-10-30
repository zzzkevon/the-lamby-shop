import React, { useRef, useState } from 'react';
import star from '../../images/story_stars_1.png';
import axios from 'axios';
import bcryptjs from 'bcryptjs'; // password hashing

const UpdatePassword = () => {
  const debug = true; // DEBUG VARIABLE: true = debug output in console

  const [current_password, setCurrentPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [password_conf, setPasswordConf] = useState('');

  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const passwordConfRef = useRef(null);

  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [passwordConfError, setPasswordConfError] = useState('');
  const [serverDenial, setServerDenial] = useState(''); // For server response

  // Validation functions
  const validatePassword = () => {
    if (current_password.trim() === '') {
      setCurrentPasswordError("Current password is required");
      return false;
    } else {
      setCurrentPasswordError('');
      return true;
    }
  };

  const validateNewPassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,32}$/;
    if (new_password.trim() === '') {
      setNewPasswordError("New password is required");
      return false;
    } else if (!passwordRegex.test(new_password)) {
      setNewPasswordError("Password must contain at least 1 uppercase letter and 1 number, and be 8-32 characters long");
      return false;
    } else {
      setNewPasswordError('');
      return true;
    }
  };

  const comparePassword = () => {
    if (password_conf !== new_password) {
      setPasswordConfError("Passwords are not the same");
      return false;
    } else {
      setPasswordConfError('');
      return true;
    }
  };

  const validateAll = () => {
    return validatePassword() && validateNewPassword() && comparePassword();
  };

  const submitInfo = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    if (!newPasswordError && !passwordConfError) {
      if (debug) {
        console.log("Everything is good to go. Perform hashing on the data before sending to the server:", {
          current_password,
          new_password,
          password_conf
        });
      }

      setServerDenial("");

      // Hashing
      bcryptjs.hash(new_password, 10, async (err, password) => {
        if (err) {
          console.log("An error occurred while trying to hash the password");
          return;
        }

        // API call to change the password
        const email = "test@test.com"; // Get email from the server
        const apiURL = `https://xgj9xa22l3.execute-api.us-west-2.amazonaws.com/dev/users/${email}`;
        const payload = { password };

        try {
          const response = await axios.put(apiURL, payload);
          if (response.status === 200) {
            window.alert("Password sent successfully!");
            window.location.href = '/password-success'; // Redirect user
          } else {
            setServerDenial("Password was not able to be changed. Please try again after checking that your current password is correct.");
          }
        } catch (error) {
          console.error('Error:', error);
          setServerDenial("Something went wrong. Please try again.");
        }
      });
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <div className="main-bg flex flex-col justify-center items-center space-y-6">
      {/* Title */}
      <div className="flex items-center space-x-4 p-8">
        <img src={star} alt="star decoration" className="w-16 h-16" />
        <h1 className="text-[#780000] text-6xl just-another-hand text-center">
          U P D A T E &nbsp;&nbsp;&nbsp; P A S S W O R D
        </h1>
        <img src={star} alt="star decoration" className="w-16 h-16" />
      </div>

      {/* Form */}
      <form onSubmit={submitInfo} className="flex flex-col items-center w-full max-w-md space-y-6">
        {/* Current Password Field */}
        <div className="flex flex-col w-full">
          <label className="font-bold text-2xl">
            <span className="text-red-500">*</span> Current Password
          </label>
          <input
            type="password"
            id="current-password"
            value={current_password}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border border-[#780000] px-4 py-2 w-full rounded-md"
            placeholder="current password"
            onBlur={validatePassword}
            ref={currentPasswordRef}
          />
        </div>

        {/* New Password Field */}
        <div className="flex flex-col w-full">
          <label className="font-bold text-2xl">
            <span className="text-red-500">*</span> New Password
          </label>
          <input
            type="password"
            id="new-password"
            value={new_password}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-[#780000] px-4 py-2 w-full rounded-md"
            placeholder="new password"
            onBlur={validateNewPassword}
            ref={newPasswordRef}
          />
        </div>

        {/* Confirm New Password Field */}
        <div className="flex flex-col w-full">
          <label className="font-bold text-2xl">
            <span className="text-red-500">*</span> Confirm New Password
          </label>
          <input
            type="password"
            id="password-conf"
            value={password_conf}
            onChange={(e) => setPasswordConf(e.target.value)}
            className="border border-[#780000] px-4 py-2 w-full rounded-md"
            placeholder="confirm new password"
            onBlur={comparePassword}
            ref={passwordConfRef}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#780000] hover:bg-[#950000] text-white py-3 px-6 rounded-full text-xl transition-transform transform hover:scale-105"
        >
          Change Password
        </button>

        {/* Error Messages */}
        {currentPasswordError && <span className="text-red-500 text-xl">{currentPasswordError}</span>}
        {newPasswordError && <span className="text-red-500 text-xl">{newPasswordError}</span>}
        {passwordConfError && <span className="text-red-500 text-xl">{passwordConfError}</span>}
        {serverDenial && <span className="text-red-500 text-xl">{serverDenial}</span>}
      </form>
    </div>
  );
};

export default UpdatePassword;
