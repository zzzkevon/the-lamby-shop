import React, { createContext, useContext, useState } from 'react';

// Create a context
const CarouselContext = createContext();

// Provide the context to your components
export const CarouselProvider = ({ children }) => {
  const [carouselType, setCarouselType] = useState('new'); // 'new' or 'popular'
  const [filteredItems, setFilteredItems] = useState([]); // Store filtered items

  const changeCarouselType = (type) => {
    setCarouselType(type);
  };

  const updateFilteredItems = (items) => {
    setFilteredItems(items); // Set the filtered items
    console.log('inside context :', filteredItems)
  };

  return (
    <CarouselContext.Provider
      value={{ carouselType, changeCarouselType, filteredItems, updateFilteredItems }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

// Custom hook to use the CarouselContext
export const useCarousel = () => {
  return useContext(CarouselContext);
};