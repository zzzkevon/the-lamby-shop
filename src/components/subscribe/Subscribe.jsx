import React, { useState, useEffect } from 'react';
import story_stars from './story_stars.png';

const Subscribe = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const imageHeightClass = width < 600 ? 'h-40 my-8' : 'h-60 my-32';
  const paragraphSizeClass = width < 600 ? 'text-2xl' : 'text-4xl';
  const typeSizeClass = width < 600 ? 'max-w-[11rem] h-6 -mt-10' : 'max-w-[18rem]';

  return (
    <div>
      <div className="flex flex-row items-center justify-center h-14">
        <div className="w-14 bg-cover">
          <img src={story_stars} alt="star"
               className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`} />
        </div>
        
        <p className={`mt-3 just-another-hand transition-all duration-300 ease-in-out ${paragraphSizeClass}`}>
          subscribe for updates on new drops!
        </p>
        
        <div className="w-14 bg-cover">
          <img src={story_stars} alt="star"
               className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`} />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center h-14">
        <input 
          className={`flex-1 h-10 pl-2.5 border-2 border-solid border-red-800 rounded-sm shadow-md text-lg font-sans focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out ${typeSizeClass}`}
          type="text"/>
      </div>
    </div>
  )
}

export default Subscribe;
