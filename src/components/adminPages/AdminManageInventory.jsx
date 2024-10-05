import React, { useState, useEffect, useContext, useReducer } from 'react';
import star from '../accountPages/story_stars.png'
import axios from 'axios';
import CarouselContext from '../../contexts/CarouselContext';


function AdminManageInventory() {
  // const { changeCarouselType, updateFilteredItems, filteredItems, carouselType, setCarousel } = useCarousel(); // Get filtered items and carousel type functions
  const {carousel,setCarousel} = useContext(CarouselContext);
  const [width, setWidth] = useState(window.innerWidth);
  
  const getNewItem = async (event) => {
    event.preventDefault();

    try{
      const result = await axios.get('https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items');
      const filtered = result.data.filter(item => item.type === 'new')
      setCarousel(filtered)
      localStorage.setItem('carousel', JSON.stringify(filtered));

    }catch(error){
      console.log(error);
    }

  }

  const getPopularItem = async (event) => {
    event.preventDefault();

    try{
      const result = await axios.get('https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items');
      const filtered = result.data.filter(item => item.type === 'popular')
      setCarousel(filtered)
      localStorage.setItem('carousel', JSON.stringify(filtered));

    }catch(error){
      console.log(error);
    }

  }

  const getAllItem = async (event) => {
    event.preventDefault();

    try{
      const result = await axios.get('https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items');
      setCarousel(result.data)
      localStorage.setItem('carousel', JSON.stringify(result.data));

    }catch(error){
      console.log(error);
    }

  }

  useEffect(()=>{
    console.log(carousel)
  }, [carousel])

  //window resizze
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
              <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-5 rounded-full mt-6 mr-10 whitespace-nowrap" onClick={getPopularItem}>
              Popular Items
              </button>

              
              <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-8 rounded-full mt-6 mr-10 whitespace-nowrap" onClick={getNewItem}>
              New Items
              </button>

              <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-8 rounded-full mt-6 whitespace-nowrap" onClick={getAllItem}>
              All Items
              </button>
              
            </div>
        </div>
      {/* <div className="flex justify-content">
          <p className="text-2xl header-font font-bold mb-4 tracking-wider whitespace-pre flex justify-content mt-2">Carousel 2</p>

          <div className="flex flex-row w-full md:w-1/2 mt-8 m-10">
              <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-5 rounded-full mt-6 mr-10 whitespace-nowrap" onClick={() => changeCarouselType('popular')}>
              Popular Items
              </button>

              
              <button className="bg-[#780000] hover:bg-[#780000] text-2xl text-white py-2 px-8 rounded-full mt-6 whitespace-nowrap" onClick={() => changeCarouselType('new')}>
              New Items
              </button>
              
            </div>
        </div> */}


    </div>
  );
}

export default AdminManageInventory;

