import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const GuestProfile = ({ handleSignOut }) => {
  const navigate = useNavigate();

  const [refreshInterval, setRefreshInterval] = useState(5000); //timer of 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      window.location.reload(); //reload the window after the timer is up
    }, refreshInterval);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [refreshInterval]); 

  return (
    <div className="flex flex-col text-4xl just-another-hand justify-center items-center min-w-screen min-h-screen -mt-32">
      <h2 >Loading Data...</h2>
      <p>Welcome! Please wait while we load in your data.</p>
      <ul className="flex flex-col items-center">
        {/* <li>
          <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4"
            onClick={() => navigate('/profile')}>
            Sign In
          </button>
        </li>
        <li>
          <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4"
            onClick={() => navigate('/createaccount')}>
            Create Account
          </button>
        </li> */}
        <div className="flex flex-col items-center mt-10">
          <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-5 rounded-full mt-6"
            onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </ul>
    </div>
  );
};

export default GuestProfile;