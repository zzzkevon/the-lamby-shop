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

  const buttonWidthClass = width < 1000 ? ' text-2xl' : 'text-4xl';
  const viewAllMarginY = width < 1000 ? 'my-1' : 'my-4';
  return (
    <div className={`${viewAllMarginY}`}>
      <button
        onClick={() => window.location.href = '/shop'}
        className={`pl-[13%] just-another-hand pl-[11%]  transition-all duration-300 ease-in-out ${buttonWidthClass}`}
      >
        view all
      </button>
    </div>
  )
}

export default ViewAllButton
