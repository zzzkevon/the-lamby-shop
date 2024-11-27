import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProfile = ({ handleSignOut }) => {
    const navigate = useNavigate();
    // To refresh landing page when logging into admin account
    window.onload = function() {
        if(!window.location.hash) {
            window.location = window.location + '#admin';
            window.location.reload();
        }
    }
    return (
        <div className="flex flex-col text-4xl just-another-hand justify-center items-center min-w-screen min-h-screen -mt-32">
            {window.onload()}
            <h2>Admin Dashboard</h2>
            <p>Welcome, {localStorage.name}! You have full access to manage the application.</p>
            <ul className="flex flex-col items-center">
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4"
                        onClick={() => navigate('/admin/admin-dashboard')}>
                        Admin Dashboard
                    </button>
                </li>
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4"
                        onClick={() => navigate('/admin/admin-manage-inventory')}>
                        Manage Inventory
                    </button>
                </li>
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4"
                        onClick={() => navigate('/commissions')}>
                        Commissions
                    </button>
                </li>
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] text-white py-2 px-4 rounded-full mt-4"
                        onClick={handleSignOut}>
                        Sign out
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AdminProfile;
