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
  const[stripWidthChange, setStripWidthChange] = useState(80)
  let maxSlideIndex = slides.length - itemsToShow;

  //this useEffect helps give a fix items in the strip carousel when window size is updated
  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setItemsToShow(1); // Smaller number for very small screens
      } else if (width < 768) {
        setItemsToShow(3); // Slightly more for small tablets
      } else if (width < 1024) {
        setItemsToShow(4); // Moderate number for larger tablets
      } else if (width < 2000) {
        setItemsToShow(5); // Default number for larger screens
      }else {
        setItemsToShow(8)
      }
    };
  
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
  
    return () => {
      window.removeEventListener('resize', updateItemsToShow);
    };
  }, []);

  //this useEffect is to help center the items in the carousel strip when window size is updated
  useEffect(() => {
    const updateWidthStrip = () => {
      const width = window.innerWidth;
      if (width < 500) {
        setStripWidthChange(8)
      }else if(width <1400){
        setStripWidthChange(0);
      }else {
        setStripWidthChange(8)
      }
    };
    updateWidthStrip();
    window.addEventListener('resize', updateWidthStrip);

    return () => {
      window.addEventListener('resize', updateWidthStrip);

    }
  },[])

  //the next two fuctions are for the buttons' functionalities
  function nextSlide() {
    setCurrentSlide(prevCurrentSlide => {
      if (prevCurrentSlide <= maxSlideIndex) {

        return prevCurrentSlide + 1;
        
      } else {

        return prevCurrentSlide;
      }
    });
  }

  const prevSlide = () => {
    setCurrentSlide(prevCurrentSlide => Math.max(prevCurrentSlide - 1, 0));
  };

  let totalWidthPerItem = 100 / itemsToShow;
  let translateAmount = currentSlide * totalWidthPerItem;
  const extraWidth = window.innerWidth < 500 ? 'pl-6':'pl-0';
  return (
    <div className={`flex flex-row`}>
      <div className={`flex justify-center items-center pt-[5px]`}>
        <div>
          <button className={`text-6xl text-[#D9D9D9]`} onClick={prevSlide}>
            <RxTriangleLeft />
          </button>
        </div>
        {/* border-black border-solid border-2  */}
        {/* the div block that creates the carousel strip *note* use border-black etc to see how the style works */}
        <div className={`overflow-hidden w-[80%] max-w-full duration-500 ease-in-out ${extraWidth}  `}>
          <div className={`justify-center items-center pl-${stripWidthChange}`} style={{ width: '100%', maxWidth: '100vw', overflowX: 'auto' }}>
            <div className={`flex transition-transform duration-500 ease-in-out`} style={{ transform: `translateX(-${translateAmount}%)`}}>
              {slides.map((slide, index) => (
                <div key={index} className="w-full " style={{ flex: '0 0 auto', width: `${100 / itemsToShow}%`, padding: '5px' }}>
                  <div className={` border-white flex-1 border-solid border-[5px] max-w-[200px] border rounded-[20px]`}>
                    <div className={`flex justify-center items-center`}>
                      <img src={slide} className={`w-full h-auto object-cover rounded-[20px]`}  alt={`slide-${index}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Just messing around with react for the right button, because my next button was moving to the right when the carousel strip was moving *note* might have to mess with it again when database*/}
        {/* currentSlide < maxSlideIndex */}
        <>
          {(() => {
            if ( currentSlide < maxSlideIndex ) {
              return (
                <div >
                  <button className={`text-6xl text-[#D9D9D9]`} onClick={nextSlide}>
                    <RxTriangleRight />
                  </button>
                  
                </div>
                
            );
          }else{
              return(    
                <div>
                  <button className={`text-[#cfcfcf] text-6xl `} >
                    <RxTriangleRight />
                  </button>
                
                </div>
              )}
            })()}   
        </>
      </div>
      
    </div>
  );
};

export default Carousel2;