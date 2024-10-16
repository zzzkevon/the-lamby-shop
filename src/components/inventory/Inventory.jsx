import React from "react";
import axios from "axios";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { useTheme } from "@mui/system";
import { addToCart } from "../cart/cart";

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === "dark";
}

// Modify this function to include "Add to Cart" functionality
function itemInformation({ item, itemName, itemDescription, itemPrice }) {
  const handleAddToCart = item => {
    addToCart(item); // Add the item to the cart
    alert(`${itemName} added to cart!`); // Notify the user (optional)
  };

  return (
    <div>
      <p>
        <strong>{itemName}</strong>
      </p>
      <p>{itemDescription}</p>
      <p>${itemPrice}</p>
      <button
        className="add-to-cart-button"
        onClick={() => handleAddToCart(item)}
      >
        Add to Cart
      </button>
    </div>
  );
}

const Inventory = () => {
  const [anchor, setAnchor] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);

  // Fetch items from your API
  React.useEffect(() => {
    axios
      .get("https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items")
      .then(response => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch(error => console.error("Error fetching items:", error));
  }, []);

  const handleClick = (event, item) => {
    setSelectedItem(item);
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popup" : undefined;

  return (
    <div className="tile-container">
      {items.map(item => (
        <div
          className="tile"
          key={item.itemName}
          onClick={event => handleClick(event, item)}
        >
          <img
            src={item.signedUrl}
            alt={item.itemName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "20px",
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
            })}
          </BasePopup>
        </div>
      )}
    </div>
  );
};

export default Inventory;
