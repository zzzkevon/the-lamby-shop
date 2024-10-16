import React from 'react';
import axios from 'axios';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { useTheme } from '@mui/system';
import { addToCart, getCart, removeFromCart, setCart } from '../cart/cart';
import { updateItem, deleteItem } from '../inventoryAPI/functionCalls';

function useIsDarkMode() {
    const theme = useTheme();
    return theme.palette.mode === 'dark';
}

function itemInformation({ item, itemName, itemDescription, itemPrice, onUpdate }) {

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    const handleUpdate = (item) => {
        console.log("Update clicked.");
        console.log(item);
        // Trigger the update modal
        onUpdate();  
    };

    const handleDelete = (item) => {
        console.log("Delete clicked.");
        deleteItem(item);
    };

    return (
        <div style={{ padding: "20px", fontSize: "30px", textAlign: "center" }}>
            {itemName}
            <br />
            <button className="update-delete-button" style={{ marginRight: '10px' }} onClick={() => handleUpdate(item)}>
                Update
            </button>
            <button className="update-delete-button" onClick={() => handleDelete(item)}>
                Delete
            </button>
        </div>
    );
}

const ManageInventory = () => {
    // State to manage items and modals
    const [anchor, setAnchor] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [updateModalOpen, setUpdateModalOpen] = React.useState(false);  // State for second modal
    
    // State for text fields
    const [formData, setFormData] = React.useState({
        itemName: '',
        itemDescription: '',
        itemPrice: '',
        imageKey: ''
    });

    React.useEffect(() => {
        // Fetch items from your API
        axios.get('https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items')
            .then(response => {

                setItems(response.data); // Assuming response.data is an array of items
              
            })
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const handleClick = (event, item) => {
        setSelectedItem(item);
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;

    const handleUpdateModalOpen = (item) => {
        // Pre-fill the form with the selected item's details
        setFormData({
            itemName: item.itemName,
            itemDescription: item.itemDescription,
            itemPrice: item.itemPrice,
            imageKey: item.imageKey
        });
        setUpdateModalOpen(true);
    };

    const handleUpdateModalClose = () => {
        // console.log("Create payload now");
        const payload = {
            itemName: formData.itemName,
            itemDescription: formData.itemDescription,
            itemPrice: formData.itemPrice,
            imageKey: formData.imageKey
        };
        updateItem(payload);
        setUpdateModalOpen(false);
    };

    // Handle form changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="tile-container-admin">
            {items.map(item => (
                <div className="tile-admin" key={item.itemName} onClick={(event) => handleClick(event, item)}>
                    <img
                        src={item.signedUrl}
                        alt={item.itemName}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '10px'
                        }}
                    />
                </div>
            ))}
            {open && (
                <div className="modal-overlay" onClick={handleClose}>
                    <BasePopup
                        id={id}
                        open={open}
                        anchor={anchor}
                        disablePortal
                        className="popup-content"
                    >
                        {itemInformation({
                            item: selectedItem,
                            itemName: selectedItem.itemName,
                            itemDescription: selectedItem.itemDescription,
                            itemPrice: selectedItem.itemPrice,
                            onUpdate: () => handleUpdateModalOpen(selectedItem)  // Open second modal on update
                        })}
                    </BasePopup>
                </div>
            )}

            {/* Second modal for updating item information */}
            {updateModalOpen && (
                <div className="modal-overlay" onClick={handleUpdateModalClose}>
                    <div className="modal-content-update" onClick={(e) => e.stopPropagation()}>
                        <form>
                            <div style={{ marginBottom: '15px' }}>
                                <label>Item Name:</label>
                                <input
                                    type="text"
                                    name="itemName"
                                    value={formData.itemName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label>Image Key:</label>
                                <input
                                    type="text"
                                    name="imageKey"
                                    value={formData.imageKey}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label>Item Description:</label>
                                <input
                                    type="text"
                                    name="itemDescription"
                                    value={formData.itemDescription}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label>Item Price:</label>
                                <input
                                    type="text"
                                    name="itemPrice"
                                    value={formData.itemPrice}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                <button
                                    type="button"
                                    onClick={handleUpdateModalClose}
                                    className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleUpdateModalClose}  
                                    className="bg-[#780000] hover:bg-[#8B0000] text-white py-2 px-4 rounded"
                                >
                                    Update Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ManageInventory;
