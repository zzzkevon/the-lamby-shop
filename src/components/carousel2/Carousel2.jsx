import React, { useState } from 'react';
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
const Carousel2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const numberOfSlides = 8; // Adjust based on the number of items you have
  const slideWidth = 21; // Assuming each slide is 100% of the carousel container width

  const nextSlide = () => {
    setCurrentSlide((prevCurrentSlide) => (prevCurrentSlide + 1) % numberOfSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevCurrentSlide) => (prevCurrentSlide - 1 + numberOfSlides) % numberOfSlides);
  };

  return (
    <div className={`flex justify-center content-center`}>

      <div className={`bg-[#D9D9D9] w-[78%] justify-center bg-white content-center min-h-49 relative`}>

      <div className={`overflow-hidden`}>
        <div className={`flex `}
          style={{ transform: `translateX(-${currentSlide * slideWidth}%)` }}
          >
          
          <div className={`shrink-0 w-[21%] box-border`}>

            <div className={`h-[200px] border-white flex-1 border-solid border-[5px] max-w-[200px] border rounded-[20px]`}>
              <div>
                <img src={apple} className={`max-w-[100%] max-h-[100%] object-cover rounded-[20px]`} alt="apple" />
              </div>
            </div>          
          </div>

          <div className={`shrink-0 w-[21%] box-border`}>
            <div className={`h-[200px] border-white flex-1 border-solid border-[5px] max-w-[200px] border rounded-[20px]`}>
              <div>
                  <img src={coconut} className={`max-w-[100%] max-h-[100%] object-cover rounded-[20px]`} alt="coconut" />
              </div>
            </div>          
          </div>

          <div className={`shrink-0 w-[21%] box-border`}>
            <div className={`h-[200px] border-white flex-1 border-solid border-[5px] max-w-[200px] border rounded-[20px]`}>
              <div>
                  <img src={blk_cherry} className={`max-w-[100%] max-h-[100%] object-cover rounded-[20px]`} alt="blk_cherry" />
              </div>              
            </div>          
          </div>

          <div className={`shrink-0 w-[21%] box-border`}>
            <div className={`h-[200px] border-white flex-1 border-solid border-[5px] max-w-[200px] border rounded-[20px]`}>
              <div>
                  <img src={art1} className={`max-w-[100%] max-h-[100%] object-cover rounded-[20px]`} alt="art1" />
              </div>                   
            </div>          
          </div>

          <div className={`shrink-0 w-[21%] box-border`}>
            <div className={`h-[200px] border-white flex-1 border-solid border-[5px] max-w-[200px] border rounded-[20px]`}>
              <div>
                  <img src={art2} className={`max-w-[100%] max-h-[100%] object-cover rounded-[20px]`} alt="art2" />
              </div>                   
            </div>          
          </div>

          <div className={`shrink-0 w-[21%] box-border`}>
            <div className={`h-[200px] border-white flex-1 border-solid border-[5px] max-w-[200px] border rounded-[20px]`}>
              <div>
                  <img src={art3} className={`max-w-[100%] max-h-[100%] object-cover rounded-[20px]`} alt="art3" />
              </div> 
            </div>          
          </div>

          <div className={`shrink-0 w-[21%] box-border`}>
            <div className={`h-[200px] border-white flex-1 border-solid border-[5px] max-w-[200px] border rounded-[20px]`}>
              <div>
                  <img src={yellow} className={`max-w-[100%] max-h-[100%] object-cover rounded-[20px]`} alt="yellow" />
              </div> 
            </div>          
          </div>

          <div className={`shrink-0 w-[21%] box-border`}>
            <div className={`h-[200px] border-white flex-1 border-solid border-[5px] max-w-[200px] border rounded-[20px]`}>
            <div>
                  <img src={art4} className={`max-w-[100%] max-h-[100%] object-cover rounded-[20px]`} alt="art4" />
              </div> 
            </div>          
          </div>

        </div>
      </div>

      <div className={`top-[35%] absolute `}>
        <button className={`left-[-70px] absolute text-[60px] text-[#d9d9d9]`} onClick={prevSlide}>
          <RxTriangleLeft />
        </button>
        <button className={`right-[-1320px] absolute text-[60px] text-[#d9d9d9]`} onClick={nextSlide}>
          <RxTriangleRight />
        </button>
      </div>
      </div>
    </div>
   
  )
}

export default Carousel2
