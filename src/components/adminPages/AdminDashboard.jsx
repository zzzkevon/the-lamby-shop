import star from '../../images/story_stars_1.png';
import React from 'react';

const AdminDashboard = () => {

    return (
        <div className="main-bg just-another-hand 4xl">
            <div className="flex flex-col justify-start items-center min-w-screen min-h-screen">
                <header>
                    <div className="container mx-auto px-4 mt-16">
                        <div className="flex flex-center justify-center">
                            <img src={star} alt="" class="w-16 h-16 mx-2 mb-2"></img>
                            <p className="text-4xl header-font font-bold mb-4 tracking-wider whitespace-pre">
                                A D M I N   D A S H B O A R D
                            </p>
                            <img src={star} alt="" class="w-16 h-16 mx-2 mb-2"></img>
                        </div>

                        <div className="flex flex-col items-center mt-8">
                            <a href="/admin/create-admin">
                                <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white h-10 py-2 px-10 rounded-full mt-6">
                                    Create New Admin
                                </button>
                            </a>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}
export default AdminDashboard;