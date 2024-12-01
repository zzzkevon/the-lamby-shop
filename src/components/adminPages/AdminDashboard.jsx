// import star from '../../images/story_stars_1.png';
import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { addItem } from "../inventoryAPI/functionCalls";
import ManageInventory from "../inventory/ManageInventory";
import star from "../CommissionsSection/story_stars_2.png";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ handleSignOut }) => {
  const navigate = useNavigate();
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [itemName, setItemName] = useState("");
  const [imageKey, setImageKey] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const location = useLocation();
  const role =
    location.state?.role || localStorage.getItem("userRole") || "user";

  const useManageInventory = () => {
    setShowInventoryModal(true);
  };

  const closeModal = () => {
    setShowInventoryModal(false);
  };

  const createPayload = () => {
    const errorMessage = document.getElementById("errorMessage");

    // Validate all fields
    if (!itemName || !imageKey || !itemDescription || !itemPrice) {
      errorMessage.textContent = "All fields are required.";
      errorMessage.classList.remove("hidden"); // Show the error
      return; // Stop execution
    }

    // Validate itemPrice specifically
    if (isNaN(itemPrice) || parseFloat(itemPrice) <= 0) {
      errorMessage.textContent = "Item price must be a valid number greater than 0.";
      errorMessage.classList.remove("hidden"); // Show the error
      return; // Stop execution
    }

    // Hide the error if all validations pass
    errorMessage.classList.add("hidden");

    const payload = {
      itemName: itemName,
      imageKey: imageKey,
      itemDescription: itemDescription,
      itemPrice: itemPrice,
    };
    addItem(payload);
    setShowAddModal(false);
  };

  //this is for the title when resizing
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const imageHeightClass = width < 600 ? "h-4" : "h-27";
  const paragraphSizeClass = width < 600 ? "text-2xl" : "text-5xl";

  return (
    <div className="main-bg just-another-hand 4xl">
      <div className="flex flex-col justify-start items-center min-w-screen min-h-screen">
        <header>
          <div className="container mx-auto px-4 mt-16">
            {/* <div className="flex flex-center justify-center">
                            <img src={star} alt="" class="w-16 h-16 mx-2 mb-2"></img>
                            <p className="text-4xl header-font font-bold mb-4 tracking-wider whitespace-pre">
                               //A D M I N   D A S H B O A R D
                                W e l c o m e  {role === 'admin' ? 'Admin' : 'User, something is wrong then'}
                            </p>
                            <img src={star} alt="" class="w-16 h-16 mx-2 mb-2"></img>
                        </div> */}

            <div
              className={`mt-12 mb-8 flex flex-row items-center justify-center h-14 `}
            >
              <div className={`w-14 bg-cover mr-6`}>
                <img
                  src={star}
                  alt="star"
                  className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
                />
              </div>

              <h1
                data-testid="commissions-header"
                className={`text-[#780000] font-extrabold mt-3 just-another-hand transition-all duration-300 ease-in-out ${paragraphSizeClass}`}
              >
                {/* A D M I N   D A S H B O A R D */}W E L C O M E &nbsp;{" "}
                {role === "admin"
                  ? "A D M I N"
                  : "User, something is wrong then"}
              </h1>

              <div className={`w-14 bg-cover ml-6`}>
                <img
                  src={star}
                  alt="star"
                  className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
                />
              </div>
            </div>
            <br></br>

            <div className="flex flex-col items-center">
              <p className="text-2xl header-font font-bold mt-6 mb-4 tracking-wider">
                MANAGE PRODUCTS
              </p>

              <div className="flex flex-row justify-center w-full mt-4 space-x-10">
                <div className="flex flex-col items-center">
                  <button
                    className="bg-[#780000] hover:bg-[#8B0000] text-2xl text-white py-2 px-6 rounded-full whitespace-nowrap"
                    onClick={() => setShowAddModal(true)}
                  >
                    Add Product
                  </button>
                </div>
                {showAddModal && (
                  <div className="fixed inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                      <h2 className="text-xl mb-4">Add New Item</h2>
                      <div className="mb-4">
                        <label className="block mb-1">Item Name:</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={itemName}
                          onChange={e => setItemName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1">Image Key:</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={imageKey}
                          onChange={e => setImageKey(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1">Item Description:</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={itemDescription}
                          onChange={e => setItemDescription(e.target.value)}
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
                        <span id="errorMessage" className="text-red-600 text-sm hidden">
                          Item price must be a valid number greater than 0.
                        </span>
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
                <button
                  className="bg-[#780000] hover:bg-[#8B0000] text-2xl text-white py-2 px-6 rounded-full whitespace-nowrap"
                  onClick={useManageInventory}
                >
                  Manage Inventory
                </button>
                {showInventoryModal && (
                  <div className="modal-overlay-admin">
                    <div className="modal-content">
                      <button onClick={closeModal}>Close</button>
                      <ManageInventory />
                      <div className="flex justify-center mt-4">
                        <a href="/admin/admin-manage-inventory">
                          <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-8 rounded-full whitespace-nowrap">
                            Change Carousel Items
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <br></br>
            <div className="flex flex-col items-center">
                <p className="text-2xl header-font font-bold mt-6 mb-4 tracking-wider">
                  CONTACT
                </p>
                <button className="bg-[#780000] hover:bg-[#8B0000] text-2xl text-white py-2 px-6 rounded-full whitespace-nowrap"
                    onClick={() => navigate('/message-subscribers')}>
                    Message Subscribers
                </button> 
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};
export default AdminDashboard;