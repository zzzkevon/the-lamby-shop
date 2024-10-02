import React, { useState, useEffect, useReducer } from 'react';
import star from '../accountPages/story_stars.png'
import axios from 'axios';
import { useCarousel } from '../../contexts/CarouselContext';


function AdminManageInventory() {
  const { changeCarouselType, updateFilteredItems, filteredItems, carouselType } = useCarousel(); // Get filtered items and carousel type functions
  const [width, setWidth] = useState(window.innerWidth);
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get('https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items')
      .then(response => {
        setItems(response.data); // Fetch all items from the API
      })
      .catch(error => console.log("Error fetching items: ", error));
  }, []);

  useEffect(() => {
    // Filter the items based on the current carousel type
    const filtered = items.filter(item => item.type === carouselType);
    console.log('Filtered Items Before Update:', filtered); // Log before updating
    updateFilteredItems(filtered); // Update filtered items in the context
    console.log(filtered);
  }, [carouselType, items]); // Triggered whenever items or carouselType changes

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const imageHeightClass = width < 600 ? 'h-40 my-8' : 'h-60 my-32';
  const paragraphSizeClass = width < 600 ? 'text-2xl' : 'text-4xl';

  return (
    <div className={`flex justify-center items-center flex-col main-bg just-another-hand 4xl`}>
      {/* Top Section */}
      <div className={`mt-12 mb-4 flex flex-row items-center justify-center h-14 `}>
        <div className={`w-14 bg-cover`}>
          <img src={star} alt='star' className={`object-cover block w-full ${imageHeightClass}`} />
        </div>
        <p className={`text-[#780000] font-bold mt-3 just-another-hand font-bold ${paragraphSizeClass}`}>
          M A N A G E &nbsp;&nbsp;&nbsp; I N V E N T O R Y
        </p>
        <div className={`w-14 bg-cover`}>
          <img src={star} alt='star' className={`object-cover block w-full ${imageHeightClass}`} />
        </div>
      </div>

      {/* Category buttons */}
      <div className="flex justify-content">
          <p className="text-2xl header-font font-bold mb-4 tracking-wider whitespace-pre flex justify-content mt-2">Carousel 1</p>

          <div className="flex flex-row w-full md:w-1/2 mt-8 m-10">
              <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-5 rounded-full mt-6 mr-10 whitespace-nowrap" onClick={() => changeCarouselType('popular')}>
              Popular Items
              </button>

              
              <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-8 rounded-full mt-6 whitespace-nowrap" onClick={() => changeCarouselType('new')}>
              New Items
              </button>
              
            </div>
        </div>
      <div className="flex justify-content">
          <p className="text-2xl header-font font-bold mb-4 tracking-wider whitespace-pre flex justify-content mt-2">Carousel 2</p>

          <div className="flex flex-row w-full md:w-1/2 mt-8 m-10">
              <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-5 rounded-full mt-6 mr-10 whitespace-nowrap" onClick={() => changeCarouselType('popular')}>
              Popular Items
              </button>

              
              <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-8 rounded-full mt-6 whitespace-nowrap" onClick={() => changeCarouselType('new')}>
              New Items
              </button>
              
            </div>
        </div>

      {/* Display Filtered Items */}
      <div className="w-full pl-4 pr-4 md:pl-64 md:pr-64">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.itemName} className="my-4">
              <img src={item.signedUrl} alt={item.itemName} className="w-full h-auto" />
              <div>{item.type}</div>
            </div>
          ))
        ) : (
          <p>No items available for this category.</p>
        )}
      </div>
    </div>
  );
}

export default AdminManageInventory;

