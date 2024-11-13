import React from 'react';
import AdminCommissionSection from './AdminCommissionSection';
import UserCommisionsSection from './UserCommissionsSection';
import GuestCommissionSection from './GuestCommissionSection';

export default function CommissionsSection({ userRole, email, username }) {
    return (
      <div>
        {userRole === "admin" ? (
          <AdminCommissionSection />
        ) : userRole === "customer" || userRole === "user" ? (
          <UserCommisionsSection userEmail={email} username={username}/>
        ) : (
          <GuestCommissionSection />
        )}
      </div>
    );
  }