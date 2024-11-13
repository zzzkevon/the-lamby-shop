import React from 'react';
import { useState, useRef, useEffect } from 'react';
import star from '../../images/story_stars_1.png'
import axios from 'axios';
import { useToast } from '../../contexts/ToastContext';

const UpdateEmail = ({ username }) => {
  const debug = true;       //DEBUG VARIABLE      true = debug output in console     true = no console output

  const [new_email, setEmail] = useState('');
  const [email_conf, setEmailConf] = useState('');

  const emailRef = useRef(null);
  const emailConfRef = useRef(null);

  const [emailError, setEmailError] = useState('');
  const [emailConfError, setEmailConfError] = useState('');

  const showToast = useToast();
  const apiURL = "https://xgj9xa22l3.execute-api.us-west-2.amazonaws.com/Prod/cognito";

  //validation functions
  //validate all
  const validateAll = () => {
    //if either of these returns false then validation failed
    if(!validateEmail() || !compareEmail()) {
      //there is an error
      if(debug) {
        console.log("Unable to submit. Something is not valid:");
        //console.log("email: " + new_email);
        //console.log("email confirmation: " + email_conf);
      }
      
      return false;
    }
    return true;
  }


  //checks for if the email is blank or not in the correct format
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (new_email.trim() === '') {
      //setUsernameError('Username is required');
      //alert("Email is required");
      setEmailError("Email is required");
      return false;
    }
    else if(!emailRegex.test(new_email)) {
      //alert("Email is not in the correct format");
      setEmailError("Email is not in the correct format");
      return false;
    }
    else {
      setEmailError('')
      return true;
    }
  }

  //compares the email and email confirmation field to see if they are the same. does not care about case sensitivity
  const compareEmail = () => {
    if(email_conf.toLowerCase().localeCompare(new_email.toLowerCase()) !== 0) {
      //alert("Emails are not the same");
      setEmailConfError("Emails are not the same");
      return false;
    }
    else {
      setEmailConfError('');
      return true;
    }
  }

  //submission function
  const submitInfo = (e) => {
    e.preventDefault();

    //safety validation of all fields to make sure nothing slipped by
    if(!validateAll()) {return;}

    //this section of code is pretty useless with validate all=======perhaps delete this
    if(!new_email.trim() || !email_conf.trim()) {
      //alert("empty field");
      if(debug) {console.log("I should never be seen but user tried to submit with an empty field");}
      return;
    } 
    //===============================================================


    //there should be no way to get past this point with an error

    if(!emailError && !emailConfError) {
      //no errors
      //good to submit here or further process the information before sending (hashing?)
      if(debug) {
        //console.log("Everything looks good. Process the data further or send it off to the server from here");
        //console.log("email: " + new_email);
        //console.log("email confirmation: " + email_conf);
      }    

      // PUT request to update email
      let payload = {
        "sub" : username, // Username holds cognito account's unique user ID
        "newEmail" : new_email
      }
      showToast("Changing email...","info")
      axios.put(apiURL, payload)
        .then(response => { // If email doesn't exists, push changes
          console.log("Change successful.", response); 
          showToast("Email changed!", "success");
          setEmail('');
          setEmailConf('')
        })
        .catch(error => { // If email exists, do nothing
          console.error("Error, email change aborted.", error); 
          showToast("Error, email already exists", "error");
        })
    }
    else {
      //this should be impossible to get here
      if(debug) {console.log("Something went really wrong if you can see me");}
    }
  }



  return (
    <div className="main-bg just-another-hand 4xl"> 
      <div className="flex flex-col justify-start items-center">

        {/** Title of the page */}
        <div className="flex flex-center justify-center p-8">
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
          <p className= "text-[#780000] text-center sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl just-another-hand">
            U P D A T E &nbsp;&nbsp;&nbsp; E M A I L
          </p>
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        </div>

        {/** Form starts here */}
        <div className="flex flex-col items-start text-3xl">
          <form onSubmit={submitInfo}>

            {/** email field */}
            <p className="font-bold text-3xl mt-2">
              <span className="text-red-500"> *</span>
              <span className="just-another-hand">new email</span>
            </p>
            <input
              id="new-email" value={new_email} onChange={(e) => setEmail(e.target.value)}
              className="border border-[#780000] px-2 py-1 w-full resize-none" placeholder="new email"
              onBlur={validateEmail} ref={emailRef} data-testid='new-email'
            />

            {/** email confirmation field */}
            <p className="font-bold text-3xl mt-2">
              <span className="text-red-500"> *</span>
              <span className="just-another-hand">confirm new email</span>
            </p>
            <input
              id="email-conf" value={email_conf} onChange={(e) => setEmailConf(e.target.value)}
              className="border border-[#780000] px-2 py-1 w-full resize-none" placeholder="confirm new email"
              onBlur={compareEmail} ref={emailConfRef} data-testid='conf-email'
            />

          </form>
        </div>

        {/** submission button */}
        <button className="bg-[#780000] hover:bg-[#780000] text-white py-2 px-4 rounded-full mt-4" onClick={submitInfo} data-testid='change-email-btn'>Change Email</button>

        {/** error messages. these will only show when a specific error occurs */}
        {emailError && <span className="text-red-500 text-3xl">{emailError}</span>}
        {emailConfError && <span className="text-red-500 text-3xl">{emailConfError}</span>}

      </div>
    </div>
  );
};

export default UpdateEmail;