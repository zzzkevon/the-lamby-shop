import { createContext, useContext } from 'react';

// Create a context
const CarouselContext = createContext();

// Custom hook to use the CarouselContext
CarouselContext.displayName = 'CarouselContext'
export const useCarousel = () => {
  const context = useContext(CarouselContext);
  return context;
};

export default CarouselContext;