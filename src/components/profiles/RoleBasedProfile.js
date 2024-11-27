import React, {useEffect} from 'react';
import AdminProfile from './AdminProfile';
import CustomerProfile from './CustomerProfile';
import GuestProfile from './GuestProfile';

const RoleBasedProfile = ({ userRole, handleSignOut}) => {
    switch (userRole) {
        case 'admin':
            return <AdminProfile handleSignOut={handleSignOut}/>;
        case 'customer':
            return <CustomerProfile handleSignOut={handleSignOut} />;
        default:
            return <GuestProfile handleSignOut={handleSignOut}/>;
    }
};

export default RoleBasedProfile;