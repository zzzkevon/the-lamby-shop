import React, { useState, useEffect } from 'react';
import star from './story_stars.png';
import UpdateAccountForm from './UpdateAccountForm';

const AccountUpdate = () => {
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

  //might use later when database start working
  function updateAccountHandler(accountData) {
    
  }
  return (

    // this is the conatainer
    <div className={`flex justify-center items-center flex-col`}>

      {/* top layer of the container */}
      <div className={`mt-12 mb-4 flex flex-row items-center justify-center h-14 `}>
        <div className={`w-14 bg-cover`}>
          <img src={star} alt='star' className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`} />
        </div>
        
        <p className={`text-[#780000] font-bold mt-3 just-another-hand font-bold transition-all duration-300 ease-in-out ${paragraphSizeClass}`}>
          U P D A T E &nbsp;&nbsp;&nbsp; A C C O U N T
        </p>

        <div className={`w-14 bg-cover`}>
          <img src={star} alt='star' className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`} />
        </div>
      </div>

      {/* for the account information inputs*/}
      <UpdateAccountForm  onUpdateAccount={updateAccountHandler}/>
      {/* this is clickable for the update */}

    </div>
  )
}

export default AccountUpdate
