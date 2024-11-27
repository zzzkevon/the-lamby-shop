import React, { useState, useEffect, useContext } from "react";
import { RxTriangleLeft } from "react-icons/rx";
import { RxTriangleRight } from "react-icons/rx";

import CarouselContext from "../../contexts/CarouselContext";

const Carousel2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [stripWidthChange, setStripWidthChange] = useState(80);
  const { carousel } = useContext(CarouselContext);
  const [carouselSetup, setCarouselSetup] = useState([]);
  let maxSlideIndex = carousel.length - itemsToShow;

  // Update items to show based on window size
  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setItemsToShow(1);
      } else if (width < 768) {
        setItemsToShow(3);
      } else if (width < 1024) {
        setItemsToShow(4);
      } else if (width < 2000) {
        setItemsToShow(5);
      } else {
        setItemsToShow(8);
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);

    return () => {
      window.removeEventListener("resize", updateItemsToShow);
    };
  }, []);
  useEffect(() => {
    const filterWithImg = carousel.filter(item => item.signedUrl);
    setCarouselSetup(filterWithImg);
  }, [carousel]);

  // Update width strip on window resize
  useEffect(() => {
    const updateWidthStrip = () => {
      const width = window.innerWidth;
      if (width < 500) {
        setStripWidthChange(8);
      } else if (width < 1400) {
        setStripWidthChange(0);
      } else {
        setStripWidthChange(8);
      }
    };
    updateWidthStrip();
    window.addEventListener("resize", updateWidthStrip);

    return () => {
      window.removeEventListener("resize", updateWidthStrip);
    };
  }, []);

  // Next slide function
  const nextSlide = () => {
    setCurrentSlide(prevCurrentSlide => {
      if (prevCurrentSlide < maxSlideIndex) {
        return prevCurrentSlide + 1;
      }
      return prevCurrentSlide;
    });
  };

  // Previous slide function
  const prevSlide = () => {
    setCurrentSlide(prevCurrentSlide => {
      if (prevCurrentSlide > 0) {
        return prevCurrentSlide - 1;
      }
      return prevCurrentSlide;
    });
  };

  let totalWidthPerItem = 100 / itemsToShow;
  let translateAmount = currentSlide * totalWidthPerItem;
  const extraWidth = window.innerWidth < 500 ? "pl-6" : "pl-0";

  return (
    <div className={`flex flex-row justify-center items-center`}>
      <div className={`flex justify-center items-center pt-[5px]`}>
        {carouselSetup.length > 5 && (
          <div>
            <button
              className={`text-6xl text-[#D9D9D9]`}
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <RxTriangleLeft />
            </button>
          </div>
        )}
        <div
          className={`overflow-hidden w-[80%] max-w-full duration-500 ease-in-out ${extraWidth}  `}
        >
          <div
            className={`justify-center items-center pl-${stripWidthChange}`}
            style={{ width: "100%", maxWidth: "100vw", overflowX: "auto" }}
          >
            <div
              className={`flex transition-transform duration-500 ease-in-out ${
                carouselSetup.length < itemsToShow ? "justify-center" : ""
              }`}
              style={{ transform: `translateX(-${translateAmount}%)` }}
            >
              {carouselSetup.map((item, index) => (
                <div
                  key={item.itemName}
                  style={{
                    flex: "0 0 auto",
                    width: `${100 / itemsToShow}%`,
                    padding: "5px",
                  }}
                >
                  <div
                    className={`border-white flex-1 border-solid border-[5px] max-w-[500px] rounded-[20px]`}
                  >
                    <div className={`flex justify-center items-center`}>
                      <img
                        src={item.signedUrl}
                        className={`w-full h-auto object-cover rounded-[20px]`}
                        alt={item.itemName}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {currentSlide < maxSlideIndex && (
          <div>
            <button className={`text-6xl text-[#D9D9D9]`} onClick={nextSlide}>
              <RxTriangleRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel2;
