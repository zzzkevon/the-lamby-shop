import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerProfile = ({ handleSignOut }) => {
    const navigate = useNavigate();
    // To refresh landing page when logging into customer account
    window.onload = function() {
        if(!window.location.hash) {
            window.location = window.location + '#customer';
            window.location.reload();
        }
    }
    return (
        <div className="flex flex-col text-4xl just-another-hand justify-center items-center min-w-screen min-h-screen -mt-32">
            {window.onload()}
            <h2>Customer Dashboard</h2>
            <p>Welcome, {localStorage.name}! You have access to your account and shop features.</p>
            <ul className="flex flex-col items-center">
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4"
                        onClick={() => navigate('/commissions')}>
                        My Commissions
                    </button>
                </li>
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4"
                        onClick={() => navigate('/contact')}>
                        Customer Support
                    </button>
                </li>
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4"
                        onClick={() => navigate('/account-management')}>
                        Manage Payment
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

export default CustomerProfile;