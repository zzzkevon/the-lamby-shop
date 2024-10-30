import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen -mt-40 text-4xl just-another-hand space-y-12">
      
      <div className="flex flex-col items-center">
        <h2 className="text-5xl mb-2">Customer Dashboard</h2>
      </div>
      
      <div className="flex flex-col items-center">
        <p className="text-4g text-center max-w-md">
          Welcome, Customer! You have access to your account and shop features.
        </p>
      </div>
      
      <div className="flex flex-col items-center space-y-10">
        <button
          className="bg-[#780000] hover:bg-[#950000] py-3 px-8 rounded-full text-white font-medium shadow-lg transition-transform transform hover:scale-105"
          onClick={() => navigate('/commissions')}
        >
          My Commissions
        </button>
        
        <button
          className="bg-[#780000] hover:bg-[#950000] py-3 px-8 rounded-full text-white font-medium shadow-lg transition-transform transform hover:scale-105"
          onClick={() => navigate('/contact')}
        >
          Customer Support
        </button>
        
        <button
          className="bg-[#780000] hover:bg-[#950000] py-3 px-8 rounded-full text-white font-medium shadow-lg transition-transform transform hover:scale-105"
          onClick={() => navigate('/account-management')}
        >
          Manage my Account
        </button>
      </div>
      
    </div>
  );
};

export default CustomerView;
