import React, { useState } from "react";
import star from "../images/story_stars_1.png";
import {
  newPasswordUI,
  passwordValidation,
  togglePass,
} from "./functions/passwords";
import axios from "axios";
import bcryptjs from "bcryptjs"; // password hashing

export default function ForgotPassword() {
  const [newPass, setNewPass] = useState("");
  const [confNewPass, setConfNewPass] = useState("");
  const [showPassword, setShowPassword] = useState();

  // Toggle password function
  const tp = () => {
    togglePass(showPassword, setShowPassword);
  };

  // New password onchange functions due to needing two functions within the onChange
  const npOnchange = e => {
    // New password
    newPasswordUI();
    setNewPass(e);
  };
  const cnpOnchange = e => {
    // Confirm new password
    newPasswordUI();
    setConfNewPass(e);
  };

  // Hash password and send it to DB
  const hash_and_send = pass => {
    //const forgotpass_url = 'http://localhost:3001/forgot-password-update';
    const forgotpass_url =
      "https://66fc60f9c3a184a84d16eb38.mockapi.io/Account/";
    bcryptjs.hash(pass, 10, function (err, password) {
      if (err) console.error(err.message);
      else {
        const data = { password };
        // console.log("Hash updated pass frontend:", password);
        // Store password hash in DB here
        axios
          .put(`${forgotpass_url}/1`, data)
          .then(response => {
            console.log(response.data);
          })
          .catch(err => console.error(err));
      }
    });
  };

  // Submit button function
  const handleSubmit = () => {
    if (window.confirm("Confirm new password?")) {
      if (!passwordValidation(newPass, confNewPass))
        alert("Password invalid! Review the following requirements below.");
      else {
        alert("Password is valid! Now hashing the password...");
        // Handles hashing and sending to db
        hash_and_send(newPass, confNewPass);
        //window.location.reload(); uncomment this when db is fully setup
      }
    } else alert("Cancel has been pressed, no change has been made.");
  };

  return (
    <div
      className="main-bg just-another-hand text-3xl"
      style={{
        display: "flex", // make it a flex container
        flexDirection: "column", // align items vertically
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <div
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
            Forgot Password?
          </h1>
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        </div>
      </div>

      <div className="grid gap-3">
        <div>
          <input
            type={showPassword ? "text" : "password"}
            id="new-pass"
            className="input-borders"
            placeholder="Enter your new password"
            maxLength={32}
            onChange={e => npOnchange(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            id="conf-new-pass"
            className="input-borders"
            placeholder="Confirm your new password"
            maxLength={32}
            onChange={e => cnpOnchange(e.target.value)}
          ></input>
        </div>
        {/* Password visibility toggle */}
        <div className="">
          <label>
            <input type="checkbox" onChange={tp} checked={showPassword} />
            Show Password
          </label>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button className="button button-text" onClick={handleSubmit}>
            s u b m i t
          </button>
        </div>

        <div id="message">
          <h3>Password must contain the following:</h3>
          <p id="upper" class="invalid">
            A <b>capital (uppercase) </b> letter
          </p>
          <p id="lower" class="invalid">
            A <b>lowercase</b> letter
          </p>
          <p id="number" class="invalid">
            A <b>number</b>
          </p>
          <p id="length" class="invalid">
            Minimum <b>8 characters</b>
          </p>
          <p id="match" class="invalid">
            Password matches
          </p>
        </div>
      </div>
    </div>
  );
}
