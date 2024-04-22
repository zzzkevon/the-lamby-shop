
import React, { useState, useEffect, useRef } from "react";
import img1 from "../images/img1.jpeg";
import img2 from "../images/img2.jpeg";
import img3 from "../images/img3.jpeg";
import Subscribe from './subscribe/Subscribe';
import Carousel2 from './carousel2/Carousel2';
import ViewAllButton from "./viewAll/viewAllButton";
const HeroSection = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(prevIndex => (prevIndex + 1) % 3); // Adjust 3 to the total number of images
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const containerRef = useRef(null);

  const handleDotClick = index => {
    setSlideIndex(index);
  };

  //make a call to the database to get carousel items
  const slideItem1 = [img1, img1, img1, img2];    //these will be changed with the addition of the database
  const slideItem2 = [img2, img2, img2, img3];
  const slideItem3 = [img3, img3, img3, img1];


  return (
    <div className={`main-bg`} >
      <div
        ref={containerRef}
        className="w-[90vw] mx-auto border-2 rounded-md bg-white p-4 relative slideshow-container"
        
      >
        <div className="w-[90vw] slideshow-container flex justify-center items-center relative">
          <div
            className="mySlides fade flex flex-col justify-evenly items-center relative"
            style={{ display: slideIndex === 0 ? "flex" : "none" }}
          >
            <div className="flex  flex-row justify-center items-center my-4 relative">
              <img
                src={slideItem1[0]}
                className="flex w-1/5 rounded-md border-white border m-auto overflow-hidden"
                alt="Nature"
              />
              <img
                src={slideItem1[1]}
                className="flex w-1/5 rounded-md border-white border m-auto overflow-hidden"
                alt="Nature"
              />
              <img
                src={slideItem1[2]}
                className="flex w-1/5 rounded-md border-white border m-auto overflow-hidden"
                alt="Nature"
              />
              <img
                src={slideItem1[3]}
                className="flex w-1/5 rounded-md border-white border m-auto overflow-hidden"
                alt="Nature"
              />
            </div>
            <div className="text-center text-5xl bg-red-800 text-white just-another-hand rounded-md">
              <a href='/shop'>Shop Here!</a>
            </div>
          </div>

          <div
            className="mySlides fade flex flex-col justify-center items-center"
            style={{ display: slideIndex === 1 ? "flex" : "none" }}
          >
            <div className="flex justify-center items-center my-4">
              <img
                src={slideItem2[0]}
                className="w-1/5 rounded-md border-white border m-auto"
                alt="Nature"
              />
              <img
                src={slideItem2[1]}
                className="w-1/5 rounded-md border-white border m-auto"
                alt="Nature"
              />
              <img
                src={slideItem2[2]}
                className="w-1/5 rounded-md border-white border m-auto"
                alt="Nature"
              />
              <img
                src={slideItem2[3]}
                className="w-1/5 rounded-md border-white border m-auto"
                alt="Nature"
              />
            </div>
            <div className="text-center text-5xl bg-red-800 text-white just-another-hand rounded-md">
              <a href='/shop'>Shop Here!
                </a>
              </div>
          </div>

          <div
            className="mySlides fade flex flex-col justify-center items-center"
            style={{ display: slideIndex === 2 ? "flex" : "none" }}
          >
            <div className="flex flex-wrap justify-center items-center my-4">
              <img
                src={slideItem3[0]}
                className="w-1/5 rounded-md border-white border mr-4"
                alt="Nature"
              />
              <img
                src={slideItem3[1]}
                className="w-1/5 rounded-md border-white border mr-4"
                alt="Nature"
              />
              <img
                src={slideItem3[2]}
                className="w-1/5 rounded-md border-white border mr-4"
                alt="Nature"
              />
              <img
                src={slideItem3[3]}
                className="w-1/5 rounded-md border-white border mr-4"
                alt="Nature"
              />
            </div>
            <div className="text-center text-5xl bg-red-800 text-white just-another-hand rounded-md">
              <a href='/shop'>Shop Here!</a>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <span
            className={`dot ${slideIndex === 0 ? "active" : ""}`}
            onClick={() => handleDotClick(0)}
          ></span>
          <span
            className={`dot ${slideIndex === 1 ? "active" : ""}`}
            onClick={() => handleDotClick(1)}
          ></span>
          <span
            className={`dot ${slideIndex === 2 ? "active" : ""}`}
            onClick={() => handleDotClick(2)}
          ></span>
        </div>

        <style>
          {`
                        .dot {
                            height: 15px;
                            width: 15px;
                            margin: 0px 5px;
                            background-color: black;
                            border-radius: 50%;
                            display: inline-block;
                            cursor: pointer;
                        }

                        .active {
                            background-color: white;
                            border: 2px solid black;
                        }
                    `}
        </style>
      </div>
      <ViewAllButton />
      <Carousel2 />
      <Subscribe />

    </div>
  );
};

export default HeroSection;
