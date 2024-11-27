import React, { useState, useEffect } from "react";
import story_stars from "./story_stars.png";
import axios from "axios";

const Subscribe = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleKeyDown = async event => {
    if (event.key === "Enter") {
      // Email validation pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailPattern.test(inputValue)) {
        // console.log("Valid email entered:", inputValue);
        setErrorMessage(""); // Clear error message if email is valid
        try {
          const response = await axios.post(
            "https://ikc2uhcqo2.execute-api.us-west-2.amazonaws.com/dev/addEmail",
            {
              email: inputValue,
            }
          );
          // console.log("API response:", response.data);
          setInputValue("");
        } catch (error) {
          console.error("Error in Axios request:", error);
        }
      } else {
        // console.log("Invalid email format");
        setErrorMessage("Please enter a valid email address.");
      }
    }
  };

  const imageHeightClass = width < 600 ? "h-40 my-8" : "h-60 my-32";
  const paragraphSizeClass = width < 600 ? "text-2xl" : "text-4xl";
  const typeSizeClass = width < 700 ? "max-w-fit h-7 -mt-10" : "max-w-[17rem]";

  return (
    <div className="flex justify-center items-center flex-col w-full h-full">
      <div className="flex flex-row items-center justify-center h-14">
        <div className="w-14 bg-cover">
          <img
            src={story_stars}
            alt="star"
            className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
          />
        </div>

        <p
          className={`mt-3 whitespace-nowrap just-another-hand transition-all duration-300 ease-in-out ${paragraphSizeClass}`}
        >
          subscribe for updates on new drops!
        </p>

        <div className="w-14 bg-cover">
          <img
            src={story_stars}
            alt="star"
            className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
          />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center h-14 w-80">
        <input
          className={`flex-1 h-10 pl-2.5 border-2 border-solid border-red-800 rounded-sm shadow-md text-lg font-sans 
          focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out ${typeSizeClass}`}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Display error message if the email is invalid */}
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default Subscribe;
