import React, { useState } from 'react';

const AccountRecovery = () => {
  const [email, setEmail] = useState('');
  const [forgotUsername, setForgotUsername] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleForgotUsernameSubmit = (e) => {
    e.preventDefault();
    // Simulate sending an email with the username
    if (email) {
      setMessage(`An email has been sent to ${email} with the username linked to the address.`);
    } else {
      setMessage('Please enter your email.');
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    // Simulate sending an email with a link to reset password
    if (email) {
      setMessage(`An email has been sent to ${email} with a link to create a new password.`);
    } else {
      setMessage('Please enter your email.');
    }
  };

  return (
    <div className="main-bg just-another-hand text-4xl" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh'
    }}>

      <h1 className="header-font header-format text-center text-5xl font-bold ">Account Recovery</h1>

      <div  className="flex flex-col justify-center items-center">

      
      <form onSubmit={handleForgotUsernameSubmit} className="mb-8">
        <label>
          <input
            type="checkbox"
            checked={forgotUsername}
            onChange={() => setForgotUsername(!forgotUsername)}
            className="mr-2"
          />
          Forgot Username
        </label>
        <br />
        {forgotUsername && (
          <div>
            <label>Email:</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-borders mt-2"
              required
            />
            <br />
            <button type="submit" className="btn mt-4 header-font">
              Submit
            </button>
          </div>
        )}
      </form>

      <form onSubmit={handleForgotPasswordSubmit}>
        <label>
          <input
            type="checkbox"
            checked={forgotPassword}
            onChange={() => setForgotPassword(!forgotPassword)}
            className="mr-2"
          />
          Forgot Password
        </label>
        <br />
        {forgotPassword && (
          <div>
            <label>Email:</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-borders mt-2"
              required
            />
            <br />
            <button type="submit" className="btn mt-4 header-font">
              Submit
            </button>
          </div>
        )}
      </form>

      {message && <p className="mt-6">{message}</p>}
      </div>

    </div>
  );
};

export default AccountRecovery;
