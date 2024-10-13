import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found-page just-another-hand text-center text-6xl mb-4">
        <h1>404 - Page Not Found</h1>
        <p> Oops! The page you're looking for doesn't exist. </p>
        <Link to="/">Return to Home</Link>
        </div>
    );
};

export default NotFound;