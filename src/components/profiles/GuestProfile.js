import React from 'react';
import { useNavigate } from 'react-router-dom';

const GuestProfile = ({ handleSignOut }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col text-4xl just-another-hand justify-center items-center min-w-screen min-h-screen -mt-32">
      <h2 >Guest Dashboard</h2>
      <p>Welcome, Guest! You can browse but will have limited access.</p>
      <ul className="flex flex-col items-center">
        <li>
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
        </li>
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