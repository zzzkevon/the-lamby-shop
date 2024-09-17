import React from 'react';
import { useEffect, useState } from 'react';
import Inventory from './inventory/Inventory'

const ShopSection = ({ cart, addToCart, items}) => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  console.log(cart)
  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to listen for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures that this effect runs only once

  return (
    <div className="main-bg" style={{ height: `${screenHeight}px`, width: `${screenWidth}px` }}>
      <Inventory items={items} addToCart={addToCart}/>
    </div>
  );
}

export default ShopSection;