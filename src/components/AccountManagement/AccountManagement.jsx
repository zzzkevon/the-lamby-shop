import {React, useEffect, useState} from "react";
// import star from "../../images/story_stars_1.png";
import star from '../CommissionsSection/story_stars_2.png'

//this page consists of three buttons that will each redirect you to a different page
//button1 will take you to the change email page
//button2 will take you to the change password page
const AccountManagement = () => {

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
  const imageHeightClass = width < 600 ? 'h-4' : 'h-27';
  return (
    <div className="main-bg">
      <br />
      <br />
      {/** title of page */}
      {/* <div className="flex flex-center justify-center">
        <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        <p className="text-[#780000] text-center sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl just-another-hand">
          P A Y M E N T &nbsp;&nbsp;&nbsp; M A N A G E M E N T
        </p>
        <img src={star} alt="" class="w-16 h-16 mb-4"></img>
      </div> */}
      {/* this is for the title page */}
      <div className={`mt-12 mb-8 justify-center items-center flex`}>
          <div className={`w-20 bg-cover`}>
            <img src={star} alt='star' className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`} />
          </div>
          <h1 className='header-font header-format text-7xl py-4 mt-8 px-8'>PAYMENT &nbsp; MANAGEMENT</h1>
          <div className={`w-20 bg-cover`}>
            <img src={star} alt='star' className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`} />
          </div>
        </div>
      <br />
      {/** change payment button */}
      <a
        href="/update-payment"
        className="w-[20vw] flex items-center justify-center mx-auto h-24 bg-[#780000] text-white just-another-hand rounded-md sm:text-lg md:text-xl lg:text-4xl xl:text-4xl"
      >
        Update payment method
      </a>

      {/* 
        => Stripe handles adding payment, removed update payment button 
      */}
      <br />
      <br />
    </div>
  );
};

export default AccountManagement;
