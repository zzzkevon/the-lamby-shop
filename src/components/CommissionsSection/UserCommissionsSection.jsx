import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "../../contexts/ToastContext";
// import star from '../../images/story_stars_1.png';
import star from "./story_stars_2.png";

import UsersPersonalCommissionItem from "./UserPersonalCommissionItem";

export default function UserCommisionsSection({ userEmail, username }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [userCommissionArray, setUserCommissions] = useState([]);
  const [commissionFormOpen, setFormOpen] = useState(false);
  const [addFormButtonText, setButtonText] = useState("Add A Commission\u25B4");
  const [sendCommissionPopup, setSendCommissionPopup] = useState(false);
  const showToast = useToast();

  const toggleForm = () => {
    if (commissionFormOpen) {
      setButtonText("Add A Commission\u25B4");
    } else {
      setButtonText("Add A Commission\u25BE");
    }
    setFormOpen(!commissionFormOpen);
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    //setEmail("");
    setPhoneNumber("");
    setDescription("");
  };

  const toggleSubmissionPopup = () => {
    setSendCommissionPopup(!sendCommissionPopup);
  };

  // Function to handle no special characters in input
  const handleKeyPress = event => {
    const charCode = event.charCode;
    if (
      !(
        (
          (charCode > 64 && charCode < 91) || // A-Z
          (charCode > 96 && charCode < 123) || // a-z
          (charCode > 47 && charCode < 58) || // 0-9
          charCode === 32 || // space
          charCode === 46 || // period
          charCode === 44 || // comma
          charCode === 63
        ) // question mark
      )
    ) {
      event.preventDefault(); // Prevent the character from being typed
    }
  };

  // Move the function out of the useEffect
  const grabOwnCommissions = () => {
    const testEmail = userEmail; // User account email is used
    axios
      .get(
        `https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development/getUserCommissions`,
        {
          params: {
            email: testEmail,
          },
        }
      )
      .then(response => {
        setUserCommissions(response.data.Items);
      })
      .catch(error => {
        console.error("Error:", error);
        showToast("Error! Network get request failed.", "error");
      });
  };

  useEffect(() => {
    grabOwnCommissions();
  }, []);

  const handleSubmit = async () => {
    const commissionData = {
      firstName,
      lastName,
      email: userEmail,
      phoneNumber,
      description,
    };

    // Fix added: prevent commission submission if no description is added
    if (description === "") {
      showToast("Description for commission needed! Nothing sent.", "error");
      return;
    }

    try {
      const response = await axios.post(
        "https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development",
        commissionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
      if (response.status === 200) {
        showToast("Commission Sent!", "success");
        clearForm(); // Fix added: to clear form after every commission submission
        grabOwnCommissions();
      } else {
        showToast("You pressed cancel, commission not sent!", "error");
      }
    } catch (error) {
      console.error("Error sending commission data:", error);
      showToast("Failed to send commission. Please try again.", "error");
    }
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const imageHeightClass = width < 600 ? "h-4" : "h-27";

  return (
    <div
      className="main-bg just-another-hand text-3xl"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={star} alt="" className="w-16 h-16 mb-4" />
            <h1
              className="header-font header-format"
              style={{ fontSize: "2em", padding: "25px" }}
            >
              Y O U R&nbsp;&nbsp;&nbsp;&nbsp;C O M M I S S I O N S
            </h1>
            <img src={star} alt="" className="w-16 h-16 mb-4" />
          </div> */}
      </div>

      <div className={`mt-12 mb-8 justify-center items-center flex`}>
        <div className={`w-20 bg-cover`}>
          <img
            src={star}
            alt="star"
            className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
          />
        </div>
        <h1 className="header-font header-format text-7xl py-4 mt-8 px-8">
          YOUR&nbsp; COMMISSIONS
        </h1>
        <div className={`w-20 bg-cover`}>
          <img
            src={star}
            alt="star"
            className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
          />
        </div>
      </div>

      <div className="flex w-full justify-around items-center">
        {userCommissionArray.length === 0 ? (
          <p>You currently have no commissions.</p>
        ) : (
          <ul className="justify-around w-4/5">
            {userCommissionArray.map(userCommission => (
              <UsersPersonalCommissionItem
                key={userCommission.id}
                id={userCommission.id}
                clientName={
                  userCommission.firstName + " " + userCommission.lastName
                }
                description={userCommission.description}
                status={userCommission.commissionStatus}
                date={userCommission.createdAt}
                reloadData={grabOwnCommissions}
              />
            ))}
          </ul>
        )}
      </div>

      <button
        className="m-8 pl-2 bg-white flex justify-center items-center rounded"
        onClick={toggleForm}
      >
        {addFormButtonText}
      </button>

      {sendCommissionPopup && (
        <SubmitCommissionPopup
          exitScreen={toggleSubmissionPopup}
          submitCommission={handleSubmit}
        />
      )}

      {commissionFormOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label>first name*</label>
            </div>
            <div>
              <input
                type="text"
                id="fname"
                className="input-borders"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label>last name*</label>
            </div>
            <div>
              <input
                type="text"
                id="lname"
                className="input-borders"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label>phone number*</label>
            </div>
            <div>
              <input
                type="text"
                id="phone"
                className="input-borders"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <label>description*</label>
            </div>

            <div>
              <textarea
                id="description"
                className="input-borders"
                name="customRequest"
                onKeyPress={handleKeyPress}
                maxLength={250}
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{ width: "877px", height: "162px" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                className="button button-text"
                onClick={toggleSubmissionPopup}
              >
                s u b m i t
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SubmitCommissionPopup({ exitScreen, submitCommission }) {
  const sendCommission = () => {
    submitCommission();
    exitScreen();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-1/4 bg-white rounded-lg p-4">
        <h1 className="text-3xl text-center font-bold">Submit Commission?</h1>
        <p>
          Are you sure you want to submit your commission now? Please be sure
          the information you provided is correct. You might not have a chance
          to change it later.
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={exitScreen}
            className="commission-button closebutton rounded"
          >
            Go Back
          </button>
          <button onClick={sendCommission} className="commission-button">
            Submit Commission
          </button>
        </div>
      </div>
    </div>
  );
}
