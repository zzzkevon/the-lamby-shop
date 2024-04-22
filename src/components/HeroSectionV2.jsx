
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
    setSlideIndex(prevIndex => (prevIndex + 1) % 4); // Adjust 3 to the total number of images
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
  const slideItem4 = [img3, img2, img1, img1];
  


  return (
    <div className="main-bg">
      <div
        ref={containerRef}
        className="w-[90vw] mx-auto border-2 rounded-2xl bg-white p-4 relative slideshow-container"
      >
        <div
          style={{ display: slideIndex === 0 ? "flex" : "none" }}
          >
          <div className="grid grid-cols-12 text-center">
            <div className="col-start-1 col-span-3 p-3">
              <img
                src={slideItem1[0]}
                className="rounded-2xl border-white border"
                alt="angle1">
              </img>
            </div>
            <div className="col-start-4 col-span-3 p-3">
              <img
                src={slideItem1[1]}
                className="rounded-2xl border-white border"
                alt="angle2">
              </img>
            </div>
            <div className="col-start-7 col-span-3 p-3">
              <img
                src={slideItem1[2]}
                className="rounded-2xl border-white border"
                alt="angle2">
              </img>
            </div>
            <div className="col-start-10 col-span-3 p-3">
              <img
                src={slideItem1[3]}
                className="rounded-2xl border-white border"
                alt="angle2">
              </img>
            </div>
            <div className="text-center bg-red-800 text-white just-another-hand rounded-md col-start-6 col-span-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              <a href='/shop'>Shop Here!</a>
            </div>
          </div>
        </div>

        <div
          style={{ display: slideIndex === 1 ? "flex" : "none" }}
          >
          <div className="grid grid-cols-12 text-center">
            <div className="col-start-1 col-span-3 p-3">
              <img
                src={slideItem2[0]}
                className="rounded-2xl border-white border"
                alt="angle1">
              </img>
            </div>
            <div className="col-start-4 col-span-3 p-3">
              <img
                src={slideItem2[1]}
                className="rounded-2xl border-white border"
                alt="angle2">
              </img>
            </div>
            <div className="col-start-7 col-span-3 p-3">
              <img
                src={slideItem2[2]}
                className="rounded-2xl border-white border"
                alt="angle2">
              </img>
            </div>
            <div className="col-start-10 col-span-3 p-3">
              <img
                src={slideItem2[3]}
                className="rounded-2xl border-white border"
                alt="angle2">
              </img>
            </div>
            <div className="text-center bg-red-800 text-white just-another-hand rounded-md col-start-6 col-span-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              <a href='/shop'>Shop Here!</a>
            </div>
          </div>
        </div>

        <div
          style={{ display: slideIndex === 2 ? "flex" : "none" }}
          >
          <div className="grid grid-cols-12 text-center">
            <div className="col-start-1 col-span-3 p-3">
              <img
                src={slideItem3[0]}
                className="rounded-2xl border-white border"
                alt="angle1">
              </img>
            </div>
            <div className="col-start-4 col-span-3 p-3">
              <img
                src={slideItem3[1]}
                className="rounded-2xl border-white border"
                alt="angle2">
              </img>
            </div>
            <div className="col-start-7 col-span-3 p-3">
              <img
                src={slideItem3[2]}
                className="rounded-2xl border-white border"
                alt="angle2">
              </img>
            </div>
            <div className="col-start-10 col-span-3 p-3">
              <img
                src={slideItem3[3]}
                className="rounded-2xl border-white border"
                alt="angle2">
              </img>
            </div>
            <div className="text-center bg-red-800 text-white just-another-hand rounded-md col-start-6 col-span-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              <a href='/shop'>Shop Here!</a>
            </div>
          </div>
        </div>

        <div
          style={{ display: slideIndex === 3 ? "flex" : "none" }}
          >
          <div className="grid grid-cols-12 text-center">
            <div className="col-start-1 col-span-3 p-3">
              <img
                src={slideItem4[0]}
                className="rounded-2xl border-white border"
                alt="angle1">
              </img>
            </div>
            <div className="col-start-4 col-span-3 p-3">
              <img
                src={slideItem4[1]}
                className="rounded-2xl border-white border"
                alt="angle2">
              </img>
            </div>
            <div className="col-start-7 col-span-3 p-3">
              <img
                src={slideItem4[2]}
                className="rounded-2xl border-white border"
                alt="angle2">
              </img>
            </div>
            <div className="col-start-10 col-span-3 p-3">
              <img
                src={slideItem4[3]}
                className="rounded-2xl border-white border"
                alt="angle2">
              </img>
            </div>
            <div className="text-center text-red-800 just-another-hand rounded-md col-start-5 col-span-4 text-base sm:text-lg md:text-xl lg:text-3xl xl:text-5xl">
              <a href='/shop'>New Items!</a>
            </div>
            <div className="text-center bg-red-800 text-white just-another-hand rounded-md col-start-6 col-span-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
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
          <span
            className={`dot ${slideIndex === 3 ? "active" : ""}`}
            onClick={() => handleDotClick(3)}
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
