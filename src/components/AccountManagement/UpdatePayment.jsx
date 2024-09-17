import React from 'react';
import { useRef } from 'react'
import star from '../../images/story_stars_1.png'

//perform hashing or whatever is needed to do to the raw data and then send it to the server here
const submit = () => {
  //hash?

  //send to server

  //wait for server confirmation before redirecting user back to account management page?
}



const UpdatePayment = () => {

  const newEmailInputRef = useRef();
  const newEmailInputConfirmRef = useRef();



  return (
    <div>
      <br />
      <br />
      <div className="flex flex-center justify-center">
        <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        <p className= "text-[#780000] text-center sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl just-another-hand">
          U P D A T E &nbsp;&nbsp;&nbsp; P A Y M E N T &nbsp;&nbsp;&nbsp; I N F O R M A T I O N
        </p>
        <img src={star} alt="" class="w-16 h-16 mb-4"></img>
      </div>

      {/** REMOVE LITERALLY EVERYTHING AND FORMAT SOMEWHAT CLOSELY TO UPDATEEMAIL.JSX OR UPDATEPASSWORD.JSX */}
      <div className="flex flex-center justify-center">
        <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        <p className= "text-[#780000] text-center sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl just-another-hand">
          ive got zero clue what information we need &nbsp;&nbsp;&nbsp; good thing i wasnt assigned this task &nbsp;&nbsp;&nbsp; and just did it to set things up
        </p>
        <img src={star} alt="" class="w-16 h-16 mb-4"></img>
      </div>

      <div className="flex flex-center justify-center">
        <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        <p className= "text-[#780000] text-center sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl just-another-hand">
          this can probably be set up similar to UpdateEmail.jsx or UpdatePassword.jsx &nbsp;&nbsp;&nbsp; just delete all this code and start over
        </p>
        <img src={star} alt="" class="w-16 h-16 mb-4"></img>
      </div>




      <form className='flex flex-col justify-center items-center' 
            onSubmit={submit}>

        <div className='mt-8 mb-4'>
          <input type="text" required id="email" ref={newEmailInputRef} placeholder="payment information?"
            className="w-96 pb-2 pt-2 pl-2 just-another-hand text-3xl text-black placeholder:text-gray-600 placeholder:text-3xl border-2 
                        border-solid border-red-800 rounded-sm shadow-md font-sans focus:outline-none focus:border-blue-500">

          </input>
        </div>

      </form>
    </div>
  );
};

export default UpdatePayment;