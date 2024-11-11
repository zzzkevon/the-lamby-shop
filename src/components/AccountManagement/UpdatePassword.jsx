import React from 'react';
import { useRef, useState } from 'react';
import star from '../../images/story_stars_1.png'
import axios from 'axios';
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from 'react-router-dom';
/* Removed bcrypt due to AWS Cognito having hashing */

const UpdatePassword = ({username}) => {
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

  const showToast = useToast();
  const navigate = useNavigate();

  /*
    => Validate Original Password is Redacted
    => Reason: There is no way to retrieve the current password from AWS Cognito,
               hence we cannot validate the current password of the account.

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
  */
  
  // Validate if the new password meets requirements
  const validateNewPassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,32}$/;
    if (new_password.trim() === '') {
      setNewPasswordError("New password is required");
      return false;
    }
    else if(!passwordRegex.test(new_password)) {
      setNewPasswordError("Password must contain at least 1 uppercase letter and 1 number, and be 8-32 characters long");
      return false;
    }
    else {
      setNewPasswordError('');
      return true;
    }
  }
  // Check if new password and password confirmation are EXACTLY the same (case sensitive)
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

  // Validates everything
  const validateAll = () => {
    if(!validateNewPassword() || !comparePassword()) {
      //error
      if(debug) {
        console.log("Unable to submit. Something is not valid:");
        //console.log("current password: " + current_password);
        console.log("new password: " + new_password);
        console.log("new password confirmation: " + password_conf);
      }
      return false;
    }
    return true;
  }

  // Submission function
  const submitInfo = async (e) => {
    e.preventDefault();

    // Final safety check
    if(!validateAll()) {return}

    if(!newPasswordError && !passwordConfError) {
      // No errors
      if(debug) {
        console.log("Everything is good to go. Perform hashing on the data before sending to the server:");
        //console.log("current password: " + current_password);
        console.log("new password: " + new_password);
        console.log("new password confirmation: " + password_conf);
      }
      setServerDenial("");

      /* 
        => API Gateway URL
        => Changed url to the API that handles changing cognito accounts 
        => Removed bcrypt hashing due to AWS Cognito already having hashing functionality
      */
      const apiURL = "https://xgj9xa22l3.execute-api.us-west-2.amazonaws.com/Prod/cognito";
      const payload = {
        "sub" : username, // Username is the sub ID (aka unique user ID) of the Cognito Account
        "newPassword": new_password
      };

      // Send the payload to the server
      try {
        axios.put(apiURL, payload)
          .then(response => {
            // Payload sent successfully redirect the user
            console.log('Success:', response.data); 
            if (response.status === 200) {
              showToast("Password sent successfully!", "success");
              navigate('/password-success'); //redirect user
            }
            else { setServerDenial("Password was not able to be changed. Please try again after checking that your current password is correct."); }
          })
          .catch(error => {
            // Error with axios PUT request
            console.error('Error:', error);
            showToast("Failed to send password. Please try again.", "error");
            setServerDenial("Something went wrong. Please try again");
          });
      } catch(error) {
        // Handle synchronous errors (not from Axios)
        console.error("Error sending password:", error);
        showToast("Failed to send password. Please try again.", "error");
        setServerDenial("Something went wrong. Please try again later.");
      }

      /* 
        => if server sends back a denial saying password was not correct, then
        dont leave page and display a message saying the password was incorrect

          if(debug) {
            setServerDenial(serverDenial + " denied");  //denial gets longer every time you submit to show this works  DELETE ONCE EVERYTHING IS COMPLETE
            console.log(serverDenial);
          } 
      */        
    } else {
      // This section should never run because of final safety check
      console.log("Something went wrong");
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

          {
          /* 
            => Current Password Field IS REDACTED
            => Reason: There is no way to retrieve the current password from AWS Cognito,
                       hence we cannot validate the current password of the account.

              <p className="font-bold text-3xl mt-2">
                <span className="text-red-500"> *</span>
                <span className="just-another-hand">current password</span>
              </p>
              <input type="password"
                id="current-password" value={current_password} onChange={(e) => setCurrentPassword(e.target.value)}
                className="border border-[#780000] px-2 py-1 w-full resize-none" placeholder="current password"
                onBlur={validatePassword} ref={currentPasswordRef}
              />
          */
          }

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