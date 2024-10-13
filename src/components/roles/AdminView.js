import React from 'react';

const AdminView = () => (
    <div>
        <h2>Admin Dashboard</h2>
        <p>Welcome, Admin! You have full access to manage the application.</p>
        <ul>
            <li><a href="/manage-users">Manage Users</a></li>
            <li><a href="/admin-settings">Admin Settings</a></li>
        </ul>
    </div>
);

export default AdminView;