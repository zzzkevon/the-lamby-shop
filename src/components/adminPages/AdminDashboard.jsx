import star from '../../images/story_stars_1.png';
import React from 'react';
import { useGetAll } from '../inventoryAPI/functionCalls';
import ManageInventory from '../inventory/ManageInventory';

const AdminDashboard = () => {
    // const items = useGetAll()
    const [showInventoryModal, setShowInventoryModal] = React.useState(false);

    const useManageInventory = () => {
        console.log("manage inventory clicked.");
        setShowInventoryModal(true);
        // console.log(items);
        // Pop up the tiles
        // create file called ManageInventory.jsx and call it here
        // <ManageInventory></ManageInventory>
    };

    const closeModal = () => {
        setShowInventoryModal(false); // Hide the modal when called
    };

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
                        <br></br>

                        {/* Manage Admin accounts */}
                        <div className="flex justify-content">
                            <p className="text-2xl header-font font-bold mb-4 tracking-wider whitespace-pre flex justify-content mt-2">ADMIN ACTIONS</p>

                            <div className="flex flex-row w-full md:w-1/2 mt-8 m-10">
                                <a href="/admin/create-admin">
                                <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-5 rounded-full mt-6 mr-10">
                                Create New Admin
                                    </button>
                                </a>

                                
                                <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-8 rounded-full mt-6">
                                Manage Users
                                    </button>
                               
                             </div>
                        </div>


                        <div className="flex justify-content mt-2">
                            <p className="text-2xl header-font font-bold mb-4 tracking-wider whitespace-pre flex justify-content mt-2">MANAGE PRODUCTS</p>

                            <div className="flex flex-row w-full md:w-1/2 mt-8 m-10 space-x-10">

                                {/* <div className="flex flex-col items-center mt-2 ">  */}
                                    {/* button should call procedure to manage products*/}
                                    {/* <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-10 rounded-full mt-6 mr-8">
                                        Add/Delete Products
                                    </button>
                                    
                                </div> */}
                                {/*manage product's category, price, etc.*/}
                                <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-10 rounded-full mt-6 mr-8"
                                onClick={useManageInventory}>
                                Manage Inventory
                                </button>
                                {showInventoryModal && (
                                    <div className="modal-overlay-admin">
                                        <div className="modal-content">
                                            <button onClick={closeModal}>Close</button>
                                            <ManageInventory />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
        
                            <div className="flex justify-content mt-2">
                                <p className="text-2xl header-font font-bold mb-4 tracking-wider whitespace-pre flex justify-content mt-2">MANAGE CUSTOMERS</p>

                                <div className="flex flex-row w-full md:w-1/2 mt-8 m-10 space-x-10">

                                    <div className="flex flex-col items-center mt-2 "> 
                                        {/* button should call procedure to manage products
                                            should be able to access customer info, order history, account status */}
                                    
                                        <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-10 rounded-full mt-6 mr-8">
                                            View Customers
                                        </button>
                                        
                                    </div>

                                    {/* button should call procedure to view and respond to customer questions*/}
                                    <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-10 rounded-full mt-6 mr-8">
                                    Customer Queries
                                    </button>
                                </div>
                            </div>

                    </div>
                </header>
            </div>
        </div>
    );
}
export default AdminDashboard;