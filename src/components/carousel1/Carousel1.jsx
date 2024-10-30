import React, { useState, useEffect, useRef, useContext } from "react";
import CarouselContext1 from "../../contexts/CarouselContext1";

function Carousel1() {
  const [slideIndex, setSlideIndex] = useState(0);
  const {carousel1} = useContext(CarouselContext1);
  const [slide1, setSlide1] = useState([]);
  const [slide2, setSlide2] = useState([]);
  const [slide3, setSlide3] = useState([]);
  const[newItems, setNewItems] = useState([]);

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

  useEffect(() => {

    const filterWithImg = carousel1.filter(item => item.signedUrl)

    if(carousel1 && carousel1.length > 0){
      setSlide1(filterWithImg.slice(0,4));
      setSlide2(filterWithImg.slice(4,8));
      setSlide3(filterWithImg.slice(8,12));
      let filteredNew = filterWithImg.filter(item => item.type === 'new');
      // console.log('filteredNew: ', filteredNew)

      setNewItems(filteredNew)

      localStorage.setItem('carousel1', JSON.stringify(filteredNew)); 

      if(filteredNew.length < 4){
        filteredNew = [...filteredNew, ...filterWithImg.slice(5,6)]
        setNewItems(filteredNew)
        localStorage.setItem('carousel1', JSON.stringify(filteredNew)); 


      }
    }
  }, [carousel1]);

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
            {slide1.map((item, index) => (
              <div key={item.itemName} className={`col-start-${1 + index * 3} col-span-3 p-3 `}>
                <img
                  src={item.signedUrl}   // use the dynamically fetched image source
                  className="rounded-2xl border-white border"
                  alt={`angle${index + 1}`}
                />
              </div>
            ))}
            <div className="text-center bg-red-800 text-white just-another-hand rounded-md col-start-6 col-span-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              <a href="/shop">Shop Here!</a>
            </div>
          </div>
        </div>

        <div
          style={{ display: slideIndex === 1 ? "flex" : "none" }}
        >
          <div className="grid grid-cols-12 text-center">
            {slide2.map((item, index) => (
              <div key={item.itemName} className={`col-start-${1 + index * 3} col-span-3 p-3`}>
                <img
                  src={item.signedUrl}   // use the dynamically fetched image source
                  className="rounded-2xl border-white border"
                  alt={`angle${index + 1}`}
                />
              </div>
            ))}
            <div className="text-center bg-red-800 text-white just-another-hand rounded-md col-start-6 col-span-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              <a href="/shop">Shop Here!</a>
            </div>
          </div>
        </div>
        <div
          style={{ display: slideIndex === 2 ? "flex" : "none" }}
        >
          <div className="grid grid-cols-12 text-center">
            {slide3.map((item, index) => (
              <div key={item.itemName} className={`col-start-${1 + index * 3} col-span-3 p-3 `}>
                <img
                  src={item.signedUrl}   // use the dynamically fetched image source
                  className="rounded-2xl border-white border"
                  alt={`angle${index + 1}`}
                />
              </div>
            ))}
            <div className="text-center bg-red-800 text-white just-another-hand rounded-md col-start-6 col-span-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              <a href="/shop">Shop Here!</a>
            </div>
          </div>
        </div>
        <div
          style={{ display: slideIndex === 3 ? "flex" : "none" }}
        >
          <div className="grid grid-cols-12 text-center">
            {newItems.map((item, index) => (
              <div key={item.itemName} className={`col-start-${1 + index * 3} col-span-3 p-3`}>
                <img
                  src={item.signedUrl} 
                  className="rounded-2xl border-white border"
                  alt={`angle${index + 1}`}
                />
              </div>
            ))}
                    <div className="text-center text-red-800 just-another-hand rounded-md col-start-5 col-span-4 text-base sm:text-lg md:text-xl lg:text-3xl xl:text-5xl">
                      <a href='/shop'>New Items!</a>
                    </div>
            <div className="text-center bg-red-800 text-white just-another-hand rounded-md col-start-6 col-span-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              <a href="/shop">Shop Here!</a>
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
    </div>
  )
}

export default Carousel1
