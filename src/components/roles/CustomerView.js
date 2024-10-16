import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerView = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col text-4xl just-another-hand justify-center items-center min-w-screen min-h-screen -mt-32">
            <h2>Customer Dashboard</h2>
            <p>Welcome, Customer! You have access to your account and shop features.</p>
            <ul className="flex flex-col items-center">
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4" onClick={() => navigate('/commissions')}>My Commissions</button>
                </li>
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4" onClick={() => navigate('/contact')}>Customer Support</button>
                </li>
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4" onClick={() => navigate('/account-management')}>Manage my Account</button>
                </li>
            </ul>
        </div>
    );
};

export default CustomerView;