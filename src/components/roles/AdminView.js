import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen -mt-40 text-4xl just-another-hand space-y-12">
      
      <div className="flex flex-col items-center">
        <h2 className="text-5xl mb-2">Admin Dashboard</h2>
      </div>
      
      <div className="flex flex-col items-center">
        <p className="text-4g text-center max-w-md">
          Welcome, Admin! You have full access to manage the application.
        </p>
      </div>
      
      <div className="flex flex-col items-center space-y-10">
        <button
          className="bg-[#780000] hover:bg-[#950000] py-3 px-8 rounded-full text-white font-medium shadow-lg transition-transform transform hover:scale-105"
          onClick={() => navigate('/admin/admin-manage-inventory')}
        >
          Manage Inventory
        </button>
        
        <button
          className="bg-[#780000] hover:bg-[#950000] py-3 px-8 rounded-full text-white font-medium shadow-lg transition-transform transform hover:scale-105"
          onClick={() => navigate('/commissions')}
        >
          Commissions
        </button>
      </div>
      
    </div>
  );
};

export default AdminView;
