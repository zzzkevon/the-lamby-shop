import { createContext, useContext } from 'react';

const CarouselContext1 = createContext();

CarouselContext1.displayName = 'CarouselContext1';

export const useCarousel1 = () => {
  const context = useContext(CarouselContext1);
  return context
};

export default CarouselContext1;