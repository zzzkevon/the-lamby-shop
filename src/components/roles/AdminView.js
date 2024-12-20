import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminView = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col text-4xl just-another-hand justify-center items-center min-w-screen min-h-screen -mt-32">
            <h2>Admin Dashboard</h2>
            <p>Welcome, Admin! You have full access to manage the application.</p>
            <ul className="flex flex-col items-center">
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4" onClick={() => navigate('/admin/admin-manage-inventory')}>Manage Inventory</button>
                </li>
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4" onClick={() => navigate('/commissions')}>Commissions</button>
                </li>
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4" onClick={() => navigate('/message-subscribers')}>Message Subscribers</button>
                </li>
            </ul>
        </div>
    );
};

export default AdminView;
