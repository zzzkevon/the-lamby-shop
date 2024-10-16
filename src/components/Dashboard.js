import React from 'react';
import AdminDashboard from './roles/AdminDashboard';
import CustomerDashboard from './roles/CustomerDashboard';
import GuestDashboard from './roles/GuestView';

const Dashboard = ({ userRole }) => {
  return (
    <div>
      {userRole === 'admin' && <AdminDashboard />}
      {userRole === 'customer' && <CustomerDashboard />}
      {userRole === 'guest' && <GuestDashboard />}
    </div>
  );
};

export default Dashboard;