import React, { useState } from 'react';
import star from '../images/story_stars_1.png';
import lamby from '../images/lamby_shop.png';
import '../index.css';

const ContactSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    console.log('Name', name);
    console.log('Email:', email);
    console.log('Message:', message);
    setIsOpen(false);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="main-bg flex flex-col items-center justify-center min-h-screen text-4xl just-another-hand space-y-12">
      
      <header className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <img src={star} alt="star decoration" className="w-16 h-16" />
          <h2 className="text-6xl">Contact</h2>
          <img src={star} alt="star decoration" className="w-16 h-16" />
        </div>
      </header>
      
      <main className="text-center text-4xl space-y-2">
        <p>Email: <a href="mailto:customersupport@thelambyshop.com" className="text-blue-600">customersupport@thelambyshop.com</a></p>
        <p>Instagram: <a href="https://www.instagram.com/thelambyshop/" className="text-blue-600">@thelambyshop</a></p>
      </main>
      
      <div className="flex flex-col items-center space-y-4">
        <button
          className="bg-[#780000] hover:bg-[#950000] text-white py-3 px-8 rounded-full font-medium shadow-lg transition-transform transform hover:scale-105"
          onClick={togglePopup}
        >
          Submit a Ticket
        </button>
        
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-2/4 space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="name" className="block text-black font-bold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-[#780000] rounded px-4 py-2 w-full"
                    placeholder="Your name"
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="email" className="block text-black font-bold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-[#780000] rounded px-4 py-2 w-full"
                    placeholder="Email here"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-black font-bold mb-2">Message (250 words max)</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border border-[#780000] rounded px-4 py-2 w-full h-40 resize-none"
                  placeholder="Your message"
                  maxLength={250}
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  className="bg-[#780000] hover:bg-[#950000] text-white font-bold py-2 px-4 rounded-full"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
                  onClick={togglePopup}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-10">
        <img src={lamby} alt="Lamby Shop" />
      </div>

    </div>
  );
};

export default ContactSection;
