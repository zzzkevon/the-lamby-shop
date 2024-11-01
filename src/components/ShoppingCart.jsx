import React, { useState, useEffect } from "react";
import ItemCard from "./itemCard";
import { getCart, removeFromCart } from "./cart/cart";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarContent } from "@mui/material";

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [open, setOpen] = React.useState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    const cartItems = getCart();
    setItems(cartItems);

    const total = cartItems.reduce(
      (acc, item) => acc + item.itemPrice * item.quantity,
      0
    );
    setSubtotal(total);
  }, []);

  const updateItemQuantity = (itemName, newQuantity) => {
    const updatedItems = items.map(item => {
      if (item.itemName === itemName) {
        return { ...item, quantity: newQuantity }; // Update the item quantity
      }
      return item;
    });

    setItems(updatedItems); // Update the local state

    // Recalculate subtotal
    const total = updatedItems.reduce(
      (acc, item) => acc + item.itemPrice * item.quantity,
      0
    );
    setSubtotal(total);
  };

  const deleteItem = item => {
    const updatedItems = items.filter(
      cartItem => cartItem.itemName !== item.itemName
    );
    setItems(updatedItems);
    removeFromCart(item);

    // Recalculate subtotal
    const total = updatedItems.reduce(
      (acc, cartItem) => acc + cartItem.itemPrice * cartItem.quantity,
      0
    );
    setSubtotal(total);
  };

  const HandleCheckout = () => {
    //const [openSnack, closeSnack] = useSnackbar({position: 'top-right', style:{backgroundColor: "#991B1B", fontFamily: "just-another-hand", fontSize: "20px"}})
    if (items.length === 0) {
      //openSnack("Your cart is empty. Add items before proceeding to checkout.", 5000)
      setOpen(true);
      //alert("Your cart is empty. Add items before proceeding to checkout.");
    } else {
      //openSnack("Your cart is empty. Add items before proceeding to checkout.", 5000)
      window.location.href = "/shoppingcart/checkout";
    }
    
  };

  return (
    <div className="main-bg just-another-hand text-3xl min-w-full">
      <div className="mx-auto w-4/5 rounded-lg">
        <div className="px-2 font-normal text-5xl text-[#780000]">
          Shopping Cart
        </div>
        <div className="flex w-full justify-between">
          <div className="flex items-center justify-center itemCards w-4/5 rounded-lg mr-4">
            {items.length === 0 ? (
              <div className="justify-center flex-col items-center align-middle flex">
                <div>
                  Your Cart is&nbsp;<b className="text-red-500">Empty!&nbsp;</b>
                </div>
                <div>
                  Must add items to the cart before you proceed to checkout.
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                {items.map(item => (
                  <ItemCard
                    key={item.itemName}
                    item={{ ...item }} // Pass the entire item
                    onDelete={() => deleteItem(item)}
                    onQuantityChange={updateItemQuantity} // Pass down the update function
                  />
                ))}
              </div>
            )}
          </div>
          <div className="checkoutPane w-1/5 rounded-lg text-center ml-4">
            <div className="bg-white rounded-[22px] border p-3 my-3">
              Subtotal: ${subtotal.toFixed(2)}
            </div>
            <button
              className="w-full bg-[#780000] text-white rounded-full text-4xl hover:underline my-3"
              onClick={HandleCheckout}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-10"></div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{vertical:'top', horizontal: 'right'}}
        action={action}
      >
        <SnackbarContent style={{
        backgroundColor:'#991B1B',
        }}
        message={<span id="client-snackbar">Your cart is empty. Add items before proceeding to checkout.</span>}
        />
      </Snackbar>
    </div>
  );
};

export default ShoppingCart;
