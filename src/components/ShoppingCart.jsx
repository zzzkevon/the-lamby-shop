import React from 'react';
import { addToCart, getCart, removeFromCart, setCart } from './cart/cart.jsx';

const ShoppingCart = () => {
  console.log("cart=", getCart());
  return (
    <div>Shopping Cart</div>
  );
}

export default ShoppingCart;