import React, { useState, useEffect } from 'react';
import { RxTriangleLeft } from "react-icons/rx";
import { RxTriangleRight } from "react-icons/rx";
import apple from './apple.jpeg';
import coconut from './coconut.jpeg';
import blk_cherry from './blk_cherry.jpeg';
import art1 from './Untitled_Artwork 6.jpeg';
import art2 from './Untitled_Artwork 12.jpeg';
import art3 from './Untitled_Artwork 11.jpeg';
import art4 from './Untitled_Artwork 10.jpeg';
import yellow from './lemon_yellow.jpeg';

const originalSlides = [apple, coconut, blk_cherry, art1, art2, art3, yellow, art4, yellow, coconut, art2];

const Carousel2 = () => {
  
  const [slides] = useState(originalSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5);
  const maxSlideIndex = slides.length - itemsToShow;

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 480) {
        setItemsToShow(1);
      } else if (window.innerWidth < 768) {
        setItemsToShow(3);
      } else {
        setItemsToShow(5);
      }
    };
  
    // Call the updateItemsToShow function on initial mount
    updateItemsToShow();
  
    // Add event listener for window resize
    window.addEventListener('resize', updateItemsToShow);
  
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', updateItemsToShow);
    };
  }, []);


  function nextSlide() {
    setCurrentSlide(prevCurrentSlide => {
      if (prevCurrentSlide < maxSlideIndex) {
       
        return prevCurrentSlide + 1;
      } else {
        return prevCurrentSlide;
      }
    });
  }

  const prevSlide = () => {
    setCurrentSlide(prevCurrentSlide => Math.max(prevCurrentSlide - 1, 0));
  };

  const totalWidthPerItem = 100 / itemsToShow;
  const translateAmount = currentSlide * totalWidthPerItem;
  const cardContainerSizeClass = window.innerWidth < 600 ? 'flex-none w-[calc(40%-47px)] transition-width duration-200 ease-in-out' : 'flex-none w-[calc(20%-47px)] transition-width duration-500 ease-in-out';
  return (
    <div className={`flex flex-row`}>
      <div className={`flex justify-center items-center pt-[5px]`}>
        <div>
          <button className={`text-6xl text-[#D9D9D9]`} onClick={prevSlide}>
            <RxTriangleLeft />
          </button>
        </div>
        <div className={`overflow-hidden border-2 border-[#cfcfcf] w-[80%]`}>
          <div className={`overflow-hidden justify-center items-center`}>
            <div className={`flex transition-transform duration-500 ease-in-out`} style={{ transform: `translateX(-${translateAmount}%)`}}>
              {slides.map((slide, index) => (
                <div key={index} className={`m-1.5 ${cardContainerSizeClass}`}>
                  <div className={` border-white flex-1 border-solid border-[5px] max-w-[200px] border rounded-[20px]`}>
                    <div className={`flex justify-center items-center`}>
                      <img src={slide} className={`max-w-[100%] max-h-[100%] object-cover rounded-[20px]`} alt={`slide-${index}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <>
          {(() => {
            if (currentSlide < maxSlideIndex) {
              return (
                <div >
                  <button className={`text-6xl text-[#D9D9D9]`} onClick={nextSlide}>
                    <RxTriangleRight />
                  </button>
                </div>
            );
          }else{
              return(    
                <button className={`text-[#cfcfcf] text-6xl `} >
                  <RxTriangleRight />
                </button>
              )}
            })()}   
        </>
      </div>
      
    </div>
  );
};

export default Carousel2;
