import React, { useState, useEffect, useRef } from "react";
import img1 from "../images/img1.jpeg";
import img2 from "../images/img2.jpeg";
import img3 from "../images/img3.jpeg";

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

  return (
    <div className="main-bg">
      <div
        ref={containerRef}
        className="w-[1020px] mx-auto border-2 rounded-md bg-white p-4 relative slideshow-container"
        style={{ padding: "20px" }}
      >
        <div className="slideshow-container flex justify-center items-center">
          <div
            className="mySlides fade flex flex-col justify-center items-center"
            style={{ display: slideIndex === 0 ? "flex" : "none" }}
          >
            <div className="flex justify-center items-center my-8">
              <img
                src={img1}
                className="w-1/5 rounded-md border-white border mr-8"
                alt="Nature"
              />
              <img
                src={img1}
                className="w-1/5 rounded-md border-white border mr-8"
                alt="Nature"
              />
              <img
                src={img1}
                className="w-1/5 rounded-md border-white border mr-8"
                alt="Nature"
              />
              <img
                src={img1}
                className="w-1/5 rounded-md border-white border mr-8"
                alt="Nature"
              />
            </div>
            <div className="text-center mt-4">1 / 3</div>
            <div className="text mt-4">Caption Text 1</div>
          </div>

          <div
            className="mySlides fade flex flex-col justify-center items-center"
            style={{ display: slideIndex === 1 ? "flex" : "none" }}
          >
            <div className="flex justify-center items-center my-8">
              <img
                src={img2}
                className="w-1/5 rounded-md border-white border mr-8"
                alt="Nature"
              />
              <img
                src={img2}
                className="w-1/5 rounded-md border-white border mr-8"
                alt="Nature"
              />
              <img
                src={img2}
                className="w-1/5 rounded-md border-white border mr-8"
                alt="Nature"
              />
              <img
                src={img2}
                className="w-1/5 rounded-md border-white border mr-8"
                alt="Nature"
              />
            </div>
            <div className="text-center mt-4">2 / 3</div>
            <div className="text mt-4">Caption Text 2</div>
          </div>

          <div
            className="mySlides fade flex flex-col justify-center items-center"
            style={{ display: slideIndex === 2 ? "flex" : "none" }}
          >
            <div className="flex justify-center items-center my-8">
              <img
                src={img3}
                className="w-1/5 rounded-md border-white border mr-8"
                alt="Nature"
              />
              <img
                src={img3}
                className="w-1/5 rounded-md border-white border mr-8"
                alt="Nature"
              />
              <img
                src={img3}
                className="w-1/5 rounded-md border-white border mr-8"
                alt="Nature"
              />
              <img
                src={img3}
                className="w-1/5 rounded-md border-white border mr-8"
                alt="Nature"
              />
            </div>
            <div className="text-center mt-4">3 / 3</div>
            <div className="text mt-4">Caption Text 3</div>
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
                            margin: 0 5px;
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
    </div>
  );
};

export default HeroSection;
