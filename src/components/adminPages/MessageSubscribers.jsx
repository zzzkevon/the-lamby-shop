import React, { useState } from 'react';
import axios from 'axios';

const MessageSubscribers = () => {
  const [recipient, setRecipient] = useState(''); // To field
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState(''); // To display success or error messages

  const handleSendEmail = async () => {
    if (!subject || !message) {
      setStatusMessage("All fields are required.");
      return;
    }

    console.log("Send button pressed.");
    try {
      // Call the API to send an email
      const response = await axios.post('https://ikc2uhcqo2.execute-api.us-west-2.amazonaws.com/dev/sendEmail', {
        subject: subject,
        body: message,
      });

      if (response.status === 200) {
        setStatusMessage("Email sent successfully!");
        setRecipient('');
        setSubject('');
        setMessage('');
      } else {
        setStatusMessage("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatusMessage("Error sending email. Please try again later.");
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px', fontSize: '25px' }}>
      <label>
        Subject:
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter email subject"
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />
      </label>

      <label>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here"
          rows="8"
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        ></textarea>
      </label>

      <button onClick={handleSendEmail} class={'commission-button'}>
        Send
      </button>

      {statusMessage && (
        <p style={{ color: statusMessage.includes("successfully") ? 'green' : 'red' }}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default MessageSubscribers;
