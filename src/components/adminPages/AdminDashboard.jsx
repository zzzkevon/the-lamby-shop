import star from '../../images/story_stars_1.png';
import React from 'react';
import { addItem } from '../inventoryAPI/functionCalls';
import ManageInventory from '../inventory/ManageInventory';

const AdminDashboard = () => {
    // const items = useGetAll()
    const [showInventoryModal, setShowInventoryModal] = React.useState(false);
    const [showAddModal, setShowAddModal] = React.useState(false);

    const [itemName, setItemName] = React.useState('');
    const [imageKey, setImageKey] = React.useState('');
    const [itemDescription, setItemDescription] = React.useState('');
    const [itemPrice, setItemPrice] = React.useState('');
    

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

    const createPayload = () => {
        console.log("add product clicked.");
        const payload = {
            body: {
                itemName: itemName,
                imageKey: imageKey,
                itemDescription: itemDescription,
                itemPrice: itemPrice
            }
        };
        addItem(payload);
        // console.log("Payload: ", JSON.stringify(payload));
        setShowAddModal(false);
    }

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

                                <div className="flex flex-col items-center mt-2 ">
                                    {/* button should call procedure to add products*/}
                                    <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-10 rounded-full mt-6 mr-8"
                                    onClick={() => setShowAddModal(true)}>
                                        Add Product
                                    </button>
                                </div>
                                {showAddModal && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white p-6 rounded-lg w-1/3">
                                            <h2 className="text-xl mb-4">Add New Item</h2>
                                            <div className="mb-4">
                                                <label className="block mb-1">Item Name:</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded"
                                                    value={itemName}
                                                    onChange={(e) => setItemName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block mb-1">Image Key:</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded"
                                                    value={imageKey}
                                                    onChange={(e) => setImageKey(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block mb-1">Item Description:</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded"
                                                    value={itemDescription}
                                                    onChange={(e) => setItemDescription(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block mb-1">Item Price:</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded"
                                                    value={itemPrice}
                                                    onChange={(e) => setItemPrice(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded mr-2"
                                                    onClick={() => setShowAddModal(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="bg-[#780000] hover:bg-[#8B0000] text-white py-2 px-4 rounded"
                                                    onClick={createPayload}
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/*manage product's category, price, etc.*/}
                                <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-10 rounded-full mt-6 mr-8"
                                onClick={useManageInventory}>
                                Manage Inventory
                                </button>
                                {showInventoryModal && (
                                    <div className="modal-overlay-admin">
                                        <div className="modal-content flex flex-col justify-center">
                                            <button onClick={closeModal}>Close</button>
                                            <ManageInventory />
                                            <div> </div>
                                            <a href="/admin/admin-manage-inventory">
                                                <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-8 rounded-full mt-6 whitespace-nowrap">
                                                    Change Carousel Items
                                                </button>
                                            </a>
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