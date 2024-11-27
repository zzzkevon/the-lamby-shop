import React, { useState, useEffect, useContext } from "react";
import star from "../accountPages/story_stars.png";
import axios from "axios";
import CarouselContext from "../../contexts/CarouselContext";

function AdminManageInventory() {
  // const { changeCarouselType, updateFilteredItems, filteredItems, carouselType, setCarousel } = useCarousel(); // Get filtered items and carousel type functions
  const { setCarousel } = useContext(CarouselContext);
  const [width, setWidth] = useState(window.innerWidth);

  const fetchItems = async (type = "all") => {
    try {
      const { data } = await axios.get(
        "https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items"
      );
      let filtered =
        type === "all" ? data : data.filter(item => item.type === type);
      filtered = filtered.filter(item => item.signedUrl);

      setCarousel(filtered);
      localStorage.setItem("carousel", JSON.stringify(filtered));
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Monitor and adjust window width for responsive design
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageHeightClass = width < 600 ? "h-40 my-8" : "h-60 my-32";
  const paragraphSizeClass = width < 600 ? "text-2xl" : "text-4xl";

  const CategoryButton = ({ label, type }) => (
    <button
      className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-5 rounded-full mt-6 mr-10 whitespace-nowrap"
      onClick={() => fetchItems(type)}
    >
      {label}
    </button>
  );
  return (
    <div
      className={`flex justify-center items-center flex-col main-bg just-another-hand 4xl`}
    >
      {/* Top Section */}
      <div
        className={`mt-12 mb-4 flex flex-row items-center justify-center h-14 `}
      >
        <div className={`w-14 bg-cover`}>
          <img
            src={star}
            alt="star"
            className={`object-cover block w-full ${imageHeightClass}`}
          />
        </div>
        <p
          className={`text-[#780000] font-bold mt-3 just-another-hand ${paragraphSizeClass}`}
        >
          M A N A G E &nbsp;&nbsp;&nbsp; I N V E N T O R Y
        </p>
        <div className={`w-14 bg-cover`}>
          <img
            src={star}
            alt="star"
            className={`object-cover block w-full ${imageHeightClass}`}
          />
        </div>
      </div>

      {/* Category buttons */}

      <div className="flex justify-center">
        <p className="text-2xl header-font font-bold mb-4 tracking-wider whitespace-pre mt-2">
          Carousel 1
        </p>
        <div className="flex flex-row w-full md:w-1/2 mt-8 m-10 justify-center">
          <CategoryButton label="Popular Items" type="popular" />
          <CategoryButton label="New Items" type="new" />
          <CategoryButton label="All Items" type="all" />
        </div>
      </div>
    </div>
  );
}

export default AdminManageInventory;
