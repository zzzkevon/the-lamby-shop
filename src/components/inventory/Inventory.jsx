import React from 'react';
import axios from 'axios';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { useTheme } from '@mui/system';
import { addToCart, getCart, removeFromCart, setCart } from '../cart/cart';

function useIsDarkMode() {
    const theme = useTheme();
    return theme.palette.mode === 'dark';
}

function itemInformation({item, itemName, itemDescription, itemPrice}) {
    
    const handleAddToCart = (item) => {
        addToCart(item);
    };

    return (
        <div>
            {itemName}<br />
            {itemDescription}<br />
            {itemPrice}<br />
            <br />
            <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>
                Add to Cart
            </button>
        </div>
    )
}

const Inventory = () => {

    // *********** TEST START ***********
    const [anchor, setAnchor] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState(null);

  
    React.useEffect(() => {
        // Fetch items from your API
        axios.get('https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items')
            .then(response => {
                setItems(response.data); // Assuming response.data is an array of items
                console.log(response.data); // Assuming response.data is an array of items
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
    // *********** TEST END ***********
    return (
        <div className="tile-container">
            {items.map(item => (
                <div className="tile" key={item.itemName} onClick={(event) => handleClick(event, item)}>
                    <img
                        src={item.signedUrl}  // Assuming each item has an `imageUrl` field
                        alt={item.itemName}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '20px'
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
                            itemPrice: selectedItem.itemPrice
                        })}
                    </BasePopup>
                </div>
            )}
        </div>
    );
    
}

export default Inventory