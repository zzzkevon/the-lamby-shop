import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col text-4xl just-another-hand justify-center items-center min-w-screen min-h-screen -mt-32">
        <h1>404 - Page Not Found</h1>
        <p> Oops! The page you're looking for doesn't exist. </p>
        <ul className="flex flex-col items-center">
                <li>
                    <button className="bg-[#780000] hover:bg-[#780000] py-2 px-4 rounded-full text-white mt-4" onClick={() => navigate('/')}>Return home</button>
                </li>
                </ul>
        </div>
    );
};

export default NotFound;