// This file contains functions that allow cart manipulation

export function getCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart == null) {
    cart = [];
  }

  return cart;
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export const addToCart = item => {
  const cart = getCart();

  const existingItem = cart.find(
    cartItem => cartItem.itemName === item.itemName
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    item.quantity = 1;
    item.itemPrice = Number(item.itemPrice);
    cart.push(item);
  }

  saveCart(cart);
};

export function removeFromCart(item) {
  const cart = getCart();
  const updatedCart = cart.filter(
    cartItem => cartItem.itemName !== item.itemName
  );
  saveCart(updatedCart);
}

export function clearCart() {
  localStorage.removeItem("cart");
}
