import React from 'react';
import { useState } from 'react';
import star from '../images/story_stars_1.png'
import lamby from '../images/lamby_shop.png'
import '../index.css';

/*have email and instagram information in the webpage:
    email: customersupport@thelambyshop.com
    instagram: @thelambyshop
*/


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
    <div className="main-bg">
      <div className="flex flex-col justify-center items-center min-w-screen min-h-screen -mt-32">
        <header>
          <div className="container mx-auto px-4">
            <div className="flex flex-center justify-center">
              <img src={star} alt="" class="w-16 h-16 mb-4"></img>
              <p class="just-another-hand header-font text-center text-6xl mb-4">
                Contact
              </p>
              <img src={star} alt="" class="w-16 h-16 mb-4"></img>
            </div>
          </div>
        </header>

        <main>
          <div class="just-another-hand text-4xl">
            <span className="block mb-2">
              email: <a href="mailto:email@example.com">customersupport@thelambyshop.com</a>
              <br></br>
              instagram: <a href="https://www.instagram.com/thelambyshop/">thelambyshop</a>
            </span>
          </div>
          <br></br>
        </main>

        <div className="relative just-another-hand text-5xl">

          <button className="bg-[#780000] hover:bg-[#780000] text-white py-2 px-4 rounded-full" onClick={togglePopup}>
            Submit a Ticket
          </button> {/*button on contact page*/}

          {isOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-8 rounded shadow-lg absolute w-2/4">
                <div className="mb-4 flex">
                  <div className="mr-4 w-1/2">
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
                    <label htmlFor="email" className="block text-black font-bold mb-2">Email </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-[#780000] rounded px-4 py-2 mb-2 w-full mt-auto"
                      placeholder="Email here"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block text-black font-bold mb-2">Message (250 words max)</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-[#780000] rounded px-4 py-2 w-full h-96 resize-none"
                    placeholder="Your message"
                    maxLength={250}
                  />
                </div>
                <button
                  className="bg-[#780000] hover:bg-[#780000] text-white font-bold font-bold py-2 px-4 rounded-full"
                  onClick={handleSubmit}
                >
                  Submit {/*Submit button for ticket*/}
                </button>

                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full ml-2" onClick={togglePopup}>
                  Close {/*close button for the ticket*/}
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <br></br>
          <img src={lamby} alt="" />
        </div>

      </div>
    </div>
  );
}
export default ContactSection;
