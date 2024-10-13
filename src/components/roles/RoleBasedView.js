import React from 'react';
import AdminView from './AdminView';
import CustomerView from './CustomerView';
import DefaultView from './DefaultView';

const RoleBasedView = ({ userRole }) => {
    switch (userRole) {
        case 'admin':
            return <AdminView />;
        case 'customer':
            return <CustomerView />;
        default:
            return <DefaultView />;
    }
};

export default RoleBasedView;