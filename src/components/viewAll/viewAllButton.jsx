import React, { useState, useEffect } from 'react';

const ViewAllButton = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const buttonWidthClass = width < 600 ? 'pl-[13%] text-2xl' : 'text-4xl pl-[11%]';
  return (
    <a href='/shop' className={`just-another-hand pl-[11%]  transition-all duration-300 ease-in-out ${buttonWidthClass}`}>
      view all
    </a>
  )
}

export default ViewAllButton
