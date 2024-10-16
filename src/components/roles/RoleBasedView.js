import React from 'react';
import AdminView from './AdminView';
import CustomerView from './CustomerView';
import GuestView from './GuestView';

const RoleBasedView = ({ userRole }) => {
    switch (userRole) {
        case 'admin':
            return <AdminView />;
        case 'customer':
            return <CustomerView />;
        default:
            return <GuestView />;
    }
};

export default RoleBasedView;