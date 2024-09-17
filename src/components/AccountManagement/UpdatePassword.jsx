import React from 'react';
import { useRef } from 'react'
import { useState } from 'react';
import star from '../../images/story_stars_1.png'

const UpdatePassword = () => {
  const debug = true;   //DEBUG VARIABLE    true = debug output in console    false = no output

  const [current_password, setCurrentPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [password_conf, setPasswordConf] = useState('');

  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const passwordConfRef = useRef(null);

  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [passwordConfError, setPasswordConfError] = useState('');

  const [serverDenial, setServerDenial] = useState(''); //for if the server says password was incorrect

  //validation functions

  //validate the original password    only checks that it is not blank
  const validatePassword = () => {
    //just cant be blank
    if(current_password.trim() === '') {
      setCurrentPasswordError("Current password is required");
      return false;
    }
    else {
      setCurrentPasswordError('');
      return true;
    }
  }

  //validate if the new password meets requirements
  const validateNewPassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,32}$/;
    if (new_password.trim() === '') {
      //alert("Email is required");
      setNewPasswordError("New password is required");
      return false;
    }
    else if(!passwordRegex.test(new_password)) {
      //alert("Email is not in the correct format");
      setNewPasswordError("Password must contain at least 1 uppercase letter and 1 number, and be 8-32 characters long");
      return false;
    }
    else {
      setNewPasswordError('');
      return true;
    }
  }

  //checks if new password and password confirmation are EXACTLY the same (case sensitive)
  const comparePassword = () => {
    if(password_conf.localeCompare(new_password) !== 0) {
      //alert("Emails are not the same");
      setPasswordConfError("Passwords are not the same");
      return false;
    }
    else {
      setPasswordConfError('');
      return true;
    }
  }

  //validates everything
  const validateAll = () => {
    if(!validatePassword() || !validateNewPassword() || !comparePassword()) {
      //error
      if(debug) {
        console.log("Unable to submit. Something is not valid:");
        console.log("current password: " + current_password);
        console.log("new password: " + new_password);
        console.log("new password confirmation: " + password_conf);
      }
      return false;
    }
    return true;
  }

  //submission function
  const submitInfo = (e) => {
    e.preventDefault();

    //final safety check
    if(!validateAll()) {return}


    if(!newPasswordError && !passwordConfError) {
      //no errors
      console.log("Everything is good to go. Perform hashing on the data before sending to the server:");
      console.log("current password: " + current_password);
      console.log("new password: " + new_password);
      console.log("new password confirmation: " + password_conf);

      //do hashing

      //send all hashed data to the server

      //if server sends back a denial saying password was not correct then dont leave page and display a message saying the password was incorrect
      if(debug) {
        setServerDenial(serverDenial + " denied");  //denial gets longer every time you submit to show this works  DELETE ONCE EVERYTHING IS COMPLETE
        console.log(serverDenial);
      }
          

      //if server sends back a confirmation then either log user out to test their new password or redirect user back to their account management page


    }
    else {
      //this section should never run because of final safety check
      console.log("something went wrong");
    }

  }



  return (

    <div className="main-bg just-another-hand 4xl"> 
      <div className="flex flex-col justify-start items-center">

        {/** Page Title */}
        <div className="flex flex-center justify-center p-8">
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
          <p className= "text-[#780000] text-center sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl just-another-hand">
            U P D A T E &nbsp;&nbsp;&nbsp; P A S S W O R D
          </p>
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        </div>

        {/** form starts here */}
        <div className="flex flex-col items-start text-3xl">
          <form onSubmit={submitInfo}>

          {/** current password field */}
          <p className="font-bold text-3xl mt-2">
              <span className="text-red-500"> *</span>
              <span className="just-another-hand">current password</span>
            </p>
            <input type="password"
              id="current-password" value={current_password} onChange={(e) => setCurrentPassword(e.target.value)}
              className="border border-[#780000] px-2 py-1 w-full resize-none" placeholder="current password"
              onBlur={validatePassword} ref={currentPasswordRef}
            />

            {/** new password field */}
            <p className="font-bold text-3xl mt-2">
              <span className="text-red-500"> *</span>
              <span className="just-another-hand">new password</span>
            </p>
            <input type="password"
              id="new-password" value={new_password} onChange={(e) => setNewPassword(e.target.value)}
              className="border border-[#780000] px-2 py-1 w-full resize-none" placeholder="new password"
              onBlur={validateNewPassword} ref={newPasswordRef}
            />

            {/** new password confirmation field */}
            <p className="font-bold text-3xl mt-2">
              <span className="text-red-500"> *</span>
              <span className="just-another-hand">confirm new password</span>
            </p>
            <input type="password"
              id="password-conf" value={password_conf} onChange={(e) => setPasswordConf(e.target.value)}
              className="border border-[#780000] px-2 py-1 w-full resize-none" placeholder="confirm new password"
              onBlur={comparePassword} ref={passwordConfRef}
            />

          </form>
        </div>

        {/** submit button */}
        <button className="bg-[#780000] hover:bg-[#780000] text-white py-2 px-4 rounded-full mt-4" onClick={submitInfo}>Change Password</button>

        {/** error messages */}
        {currentPasswordError && <span className="text-red-500 text-3xl">{currentPasswordError}</span>}
        {newPasswordError && <span className="text-red-500 text-3xl">{newPasswordError}</span>}
        {passwordConfError && <span className="text-red-500 text-3xl">{passwordConfError}</span>}
        {serverDenial && <span className="text-red-500 text-6xl">{serverDenial}</span>}

      </div>
    </div>
  );
};

export default UpdatePassword;