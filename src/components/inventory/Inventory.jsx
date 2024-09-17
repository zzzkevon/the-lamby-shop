import React, { useState } from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { useTheme } from '@mui/system';
import { itemImages } from '../../items';
import { CartTypes } from '../reducers/cartReducer';

function useIsDarkMode() {
    const theme = useTheme();
    return theme.palette.mode === 'dark';
}

// Update itemInformation to use the selected item's data
function itemInformation(addToCart, item) {
    const addItemToCart = () => {
        console.log("item added to cart", item.itemId)
        addToCart(item.itemId)
    }
    if (!item) return null; // Handle cases where no item is selected
    let { title, description, price } = item; // Assume item has these properties
    return (
        <div>
            <div><strong>Item Name:</strong> {title || 'N/A'}</div>
            <div><strong>Description:</strong> {description || 'Placeholder'}</div>
            <div><strong>Price:</strong> ${price || '0.00'}</div>
            <button className="add-to-cart-button" onClick={addItemToCart}>
                Add to Cart
            </button>
        </div>
    );
}

const Inventory = ({ addToCart, items }) => {
    const [anchor, setAnchor] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);


    const handleClick = (event, item) => {
        setSelectedItem(item);  // Set the selected item to be passed to the popup
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;

    return (
        <div className="tile-container">
            {items.map((item) => (
                <div key={item.itemId} className="tile" onClick={(e) => handleClick(e, item)}>
                    <img
                        src={itemImages[item.imageId]}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}
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
                        {/* Pass the selected item to itemInformation */}
                        {itemInformation(addToCart, selectedItem)}
                    </BasePopup>
                </div>
            )}
        </div>
    );
};

export default Inventory;
