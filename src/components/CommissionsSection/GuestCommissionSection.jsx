import {React, useEffect, useState} from 'react';
// import star from '../../images/story_stars_1.png';
import star from './story_stars_2.png'

export default function GuestCommissionSection() {
  //for the title and star
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
  const imageHeightClass = width < 600 ? 'h-8 my-8' : 'h-22';
  const paragraphSizeClass = width < 600 ? 'text-2xl' : 'text-5xl';
    return (
      <div>
        {/* <div
          className="just-another-hand text-3xl"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
          <h1
            className="header-font header-format"
            style={{ fontSize: "2em", padding: "25px" }}
          >
            C O M M I S S I O N S 
          </h1>
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        </div> */}

        {/* this for the title and stars */}
        <div className={`mt-12 mb-10 flex flex-row items-center justify-center h-14 `}>
          <div className={`w-14 bg-cover mr-6`}>
            <img src={star} alt='star' className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`} />
          </div>
          
          <h1 data-testid="commissions-header" className={`text-[#780000] font-extrabold mt-3 just-another-hand font-bold transition-all duration-300 ease-in-out ${paragraphSizeClass}` }>
            C O M M I S S I O N S
          </h1>

          <div className={`w-14 bg-cover ml-6`}>
            <img src={star} alt='star' className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`} />
          </div>
        </div>
  
        <div className="flex w-full just-another-hand justify-around items-center">
          <h2 className="text-6xl">
            Welcome, Guest! Please log in to view your commissions.
          </h2>
        </div>
      </div>
    );
}