import React, { useState, useEffect, useReducer } from "react";
import star from "../accountPages/story_stars.png";

function AdminPageTitle({ title }) {
  const [width, setWidth] = useState(window.innerWidth);
  // const [state, dispatch] = useInventory();
  const [items, setItems] = useState([]);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const imageHeightClass = width < 600 ? "h-40 my-8" : "h-60 my-32";
  const paragraphSizeClass = width < 600 ? "text-2xl" : "text-4xl";
  return (
    <div className={`flex justify-center items-center flex-col`}>
      {/* top layer of the container */}
      <div
        className={`mt-12 mb-4 flex flex-row items-center justify-center h-14 `}
      >
        <div className={`w-14 bg-cover`}>
          <img
            src={star}
            alt="star"
            className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
          />
        </div>

        <p
          className={`text-[#780000] font-bold mt-3 just-another-hand transition-all duration-300 ease-in-out ${paragraphSizeClass}`}
        >
          {title}
        </p>

        <div className={`w-14 bg-cover`}>
          <img
            src={star}
            alt="star"
            className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminPageTitle;
