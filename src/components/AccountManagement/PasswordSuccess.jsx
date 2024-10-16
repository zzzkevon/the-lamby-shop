import React from 'react';
import star from '../../images/story_stars_1.png'

//this page consists of three buttons that will each redirect you to a different page
//button1 will take you to the change email page
//button2 will take you to the change password page
//button3 will take you to the change payment page
const PasswordSuccessful = () => {
  return (

    <div className="main-bg">
      <br/>
      <br/>
      {/** title of page */}
      <div className="flex flex-center justify-center">
        <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        <p className= "text-[#780000] text-center sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl just-another-hand">
          You successfully changed your password
        </p>
        <img src={star} alt="" class="w-16 h-16 mb-4"></img>
      </div>
      
      <br/>

      {/** change email button */}
      <a href='/account-management'
        className="w-[20vw] flex items-center justify-center mx-auto h-24 bg-red-800 text-white just-another-hand rounded-md sm:text-lg md:text-xl lg:text-4xl xl:text-4xl">
          Return to account management
      </a>
    </div>
  );
};

export default PasswordSuccessful;