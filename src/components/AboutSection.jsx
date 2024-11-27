import React, { useState, useEffect } from "react";
import { RiInstagramFill } from "react-icons/ri";
import { PiTiktokLogoFill } from "react-icons/pi";
import { FaSquareXTwitter } from "react-icons/fa6";
// import star from '../images/story_stars_1.png'
import star from "./CommissionsSection/story_stars_2.png";

const AboutSection = () => {
  let aboutText = [
    "Hello i'm nat! I love to crochet and knit on my free time, making all my cute ideas come to life :3 I have two bunnies, boss and bumi who are my biggest inspirations to this store. I never want lambyshop to become a chore, so I keep my drops very infrequent. Just whenever I feel like it! I'm always learning new things and getting inspired out of the blue, I love to create things and I love to share it :D",
  ];
  let missionText = [
    "My main goal is to make cute things for my friends to buy :D. but I would love to make new friends along the way c: I hope you will love lambyshop and enjoy all the cute things that I can make for you!",
  ];
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
      className="main-bg just-another-hand px-8 text-5xl "
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <div className={`mt-12 mb-8 justify-center items-center flex`}>
          <div className={`w-20 bg-cover`}>
            <img
              src={star}
              alt="star"
              className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
            />
          </div>
          <h1 className="header-font header-format text-7xl py-4 mt-8 px-8">
            ABOUT ME
          </h1>
          <div className={`w-20 bg-cover`}>
            <img
              src={star}
              alt="star"
              className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
            />
          </div>
        </div>
        <div>
          <center>
            {" "}
            <p className={`w-[500px] justify-center items-center flex`}>
              {aboutText}
            </p>
          </center>
          <div className={`mt-14 mb-8 justify-center items-center flex`}>
            <div className={`w-20 bg-cover`}>
              <img
                src={star}
                alt="star"
                className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
              />
            </div>
            <h1 className="header-font header-format text-7xl py-4 mt-8 px-8">
              MISSION STATEMENT
            </h1>
            <div className={`w-20 bg-cover`}>
              <img
                src={star}
                alt="star"
                className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
              />
            </div>
          </div>
          <center>
            {" "}
            <p className={`w-[500px] justify-center items-center flex`}>
              {missionText}
            </p>
          </center>
        </div>

        <div className={`justify-center items-center flex`}>
          <div className={`w-20 bg-cover`}>
            <img
              src={star}
              alt="star"
              className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
            />
          </div>
          <h1 className="header-font header-format text-7xl py-4 mt-12 px-8 mb-8">
            SOCIALS
          </h1>
          <div className={`w-20 bg-cover`}>
            <img
              src={star}
              alt="star"
              className={`object-cover block w-full transition-all duration-300 ease-in-out ${imageHeightClass}`}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          <a href="https://www.instagram.com/thelambyshop/">
            <RiInstagramFill />
          </a>
          <a href="https://tiktok.com">
            <PiTiktokLogoFill />
          </a>
          <a href="https://twitter.com">
            <FaSquareXTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
