import React, { useState } from 'react';

const Dropdown = ({ userRole, setUserRole }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleRoleChange = (role) => {
        setUserRole(role);
        setIsOpen(false); // Close the dropdown after selecting a role
    };

    return (
        <div className="relative inline-block text-right z-50">
            {/* The button to toggle the dropdown */}
            <button onClick={toggleDropdown} className="main-bg p-1 rounded text-med">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)} View
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 bg-main rounded p-0 w-24">
                    <ul className="flex flex-col text-2xl">
                        <li
                            className="p-1 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleRoleChange('guest')}
                        >
                            Guest View
                        </li>
                        <li
                            className="p-1 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleRoleChange('customer')}
                        >
                            Customer View
                        </li>
                        <li
                            className="p-1 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleRoleChange('admin')}
                        >
                            Admin View
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;