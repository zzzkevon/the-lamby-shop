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

function itemInformation({item, itemName, itemDescription, itemPrice}) {
    
    const handleAddToCart = (item) => {
        addToCart(item);
    };

    const handleUpdate = (item) => {
        console.log("Update clicked.");
        console.log(item);
        updateItem(item);

    };

    const handleDelete = (item) => {
        console.log("Delete clicked.");
        console.log(item);
        deleteItem(item);

    };
    
    return (
        <div style={{padding: "20px", fontSize: "30px", textAlign: "center"}}>
            {itemName}
            <br />
            <button className="update-delete-button" style={{ marginRight: '10px' }} onClick={() => handleUpdate(item)}>
                Update
            </button>
            <button className="update-delete-button" onClick={() => handleDelete(item)}>
                Delete
            </button>
        </div>
    )
}

const ManageInventory = () => {

    // *********** TEST START ***********
    const [anchor, setAnchor] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState(null);

  
    React.useEffect(() => {
        // Fetch items from your API
        axios.get('https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items')
            .then(response => {
                setItems(response.data); // Assuming response.data is an array of items
                // console.log(response.data); // Assuming response.data is an array of items
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
                            itemPrice: selectedItem.itemPrice
                        })}
                    </BasePopup>
                </div>
            )}
        </div>
    );
    
}

export default ManageInventory