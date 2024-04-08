import classes from './Carousel3.module.css'

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
const Carousel3 = () => {
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

      <div className={classes.threeFlex}>
        <div className={classes.firstSection}>
          50px
        </div>
        <div className={classes.middleSection}>

        <div className={classes.carouselContainer}>

          <div className={classes.carouselInner}>

            <div className={classes.track}
              style={{ transform: `translateX(-${currentSlide * slideWidth}%)` }}
              >
                <div className={classes.cardContainer}>
                  <div className={classes.card}>
                    <div className={classes.imageBlock}>
                      <img src={apple} alt="apple" />
                    </div>
                  </div>          
                </div>

            </div>
            {/* end of the track div */}
          </div>
          {/* end of the carouselInner div*/}
        </div>
        {/* end of the carouselContainer div*/}

        </div>

        <div className={classes.thirdSection}>
          75px
        </div>
      </div>
  )
}

export default Carousel3
