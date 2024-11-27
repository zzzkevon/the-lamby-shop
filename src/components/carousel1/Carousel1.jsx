import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Carousel1() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [images, setImages] = useState([]); // Initialize as an empty array
  const containerRef = useRef(null);

  // Fetch images from the backend API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/images");
        const data = response.data.items || []; // Fallback to empty array if no items

        // Skip the first element of the array
        const adjustedData = data.slice(1);

        setImages(adjustedData); // Store the modified images in state
        setSlideIndex(0); // Reset the slide index when new images are loaded
      } catch (error) {
        // console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Automatic slide transitions
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through all images
      }, 3000);
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [images]);

  // Manual dot navigation
  const handleDotClick = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className="main-bg">
      <div
        ref={containerRef}
        className="w-[90vw] mx-auto border-2 rounded-2xl bg-white p-4 relative slideshow-container"
        style={{ width: "80%" }}
      >
        {/* Image Slide */}
        {images.length > 0 && images[slideIndex] && (
          <div
            className="text-center relative"
            style={{
              maxHeight: "400px", // Set a max height for the container
              height: "400px", // Ensure a consistent height
              width: "100%", // Full width of the parent
              overflow: "hidden", // Prevent overflow
            }}
          >
            <img
              src={images[slideIndex]?.url || ""} // Display the current image, fallback to empty string
              className="rounded-2xl border-white border absolute inset-0 w-full h-full"
              alt={images[slideIndex]?.fileName || "Loading..."}
              style={{
                objectFit: "cover", // Make the image fill the container, cropping if necessary
                objectPosition: "0% 25%", // Center the image
              }}
            />
          </div>
        )}

        {/* Fallback for Empty Images */}
        {images.length === 0 && (
          <div
            style={{
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#666",
            }}
          >
            Loading images...
          </div>
        )}

        {/* Dots for Navigation */}
        <div className="text-center mt-4">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${slideIndex === index ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>

        {/* Dot Styles */}
        <style>
          {`
            .dot {
              height: 15px;
              width: 15px;
              margin: 0px 5px;
              background-color: black;
              border-radius: 50%;
              display: inline-block;
              cursor: pointer;
            }

            .active {
              background-color: white;
              border: 2px solid black;
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default Carousel1;
