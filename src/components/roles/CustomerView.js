import React from 'react';

const CustomerView = () => (
    <div>
        <h2>Customer Dashboard</h2>
        <p>Welcome, valued customer! You can view your orders and update your profile.</p>
        <ul>
            <li><a href="/my-orders">My Orders</a></li>
            <li><a href="/customer-support">Customer Support</a></li>
        </ul>
    </div>
);

export default CustomerView;