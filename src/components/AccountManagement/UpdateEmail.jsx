import React, { useRef, useState } from 'react';
import star from '../../images/story_stars_1.png';

const UpdateEmail = () => {
  const debug = true; // DEBUG VARIABLE: true = debug output in console

  const [new_email, setEmail] = useState('');
  const [email_conf, setEmailConf] = useState('');
  const emailRef = useRef(null);
  const emailConfRef = useRef(null);
  const [emailError, setEmailError] = useState('');
  const [emailConfError, setEmailConfError] = useState('');

  // Validation functions
  const validateAll = () => {
    if (!validateEmail() || !compareEmail()) {
      if (debug) {
        console.log("Unable to submit. Something is not valid:", { new_email, email_conf });
      }
      return false;
    }
    return true;
  }

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (new_email.trim() === '') {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(new_email)) {
      setEmailError("Email is not in the correct format");
      return false;
    } else {
      setEmailError('');
      return true;
    }
  }

  const compareEmail = () => {
    if (email_conf.toLowerCase() !== new_email.toLowerCase()) {
      setEmailConfError("Emails are not the same");
      return false;
    } else {
      setEmailConfError('');
      return true;
    }
  }

  const submitInfo = (e) => {
    e.preventDefault();
    if (!validateAll()) { return; }

    if (!emailError && !emailConfError) {
      if (debug) {
        console.log("Everything looks good. Process the data further or send it off to the server from here:", { new_email, email_conf });
      }
      // Processing or submitting the information here
    }
  }

  return (
    <div className="main-bg flex flex-col justify-center items-center space-y-6">
      {/* Title */}
      <div className="flex items-center space-x-4 p-8">
        <img src={star} alt="star decoration" className="w-16 h-16" />
        <h1 className="text-[#780000] text-6xl just-another-hand text-center">
          UPDATE EMAIL
        </h1>
        <img src={star} alt="star decoration" className="w-16 h-16" />
      </div>

      {/* Form */}
      <form onSubmit={submitInfo} className="flex flex-col items-center w-full max-w-md space-y-6">
        {/* New Email Field */}
        <div className="flex flex-col w-full">
          <label className="font-bold text-2xl">
            <span className="text-red-500">*</span> New Email
          </label>
          <input
            id="new-email"
            value={new_email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#780000] px-4 py-2 w-full rounded-md"
            placeholder="new email"
            onBlur={validateEmail}
            ref={emailRef}
          />
        </div>

        {/* Confirm Email Field */}
        <div className="flex flex-col w-full">
          <label className="font-bold text-2xl">
            <span className="text-red-500">*</span> Confirm New Email
          </label>
          <input
            id="email-conf"
            value={email_conf}
            onChange={(e) => setEmailConf(e.target.value)}
            className="border border-[#780000] px-4 py-2 w-full rounded-md"
            placeholder="confirm new email"
            onBlur={compareEmail}
            ref={emailConfRef}
          />
        </div>

        {/* Error Messages */}
        {emailError && <span className="text-red-500 text-xl">{emailError}</span>}
        {emailConfError && <span className="text-red-500 text-xl">{emailConfError}</span>}

        {/* Submit Button */}
        <button
          className="bg-[#780000] hover:bg-[#950000] text-white py-3 px-6 rounded-full text-xl transition-transform transform hover:scale-105"
          onClick={submitInfo}
        >
          Change Email
        </button>
      </form>
    </div>
  );
};

export default UpdateEmail;
