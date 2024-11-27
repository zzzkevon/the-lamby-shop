import React from "react";
import { RiInstagramFill } from "react-icons/ri";
import { PiTiktokLogoFill } from "react-icons/pi";
import { FaSquareXTwitter } from "react-icons/fa6";
import star from "../images/story_stars_1.png";

const AboutSection = () => {
  let aboutText = [
    "Hello i'm nat! I love to crochet and knit on my free time, making all my cute ideas come to life :3 I have two bunnies, boss and bumi who are my biggest inspirations to this store. I never want lambyshop to become a chore, so I keep my drops very infrequent. Just whenever I feel like it! I'm always learning new things and getting inspired out of the blue, I love to create things and I love to share it :D",
  ];
  let missionText = [
    "My main goal is to make cute things for my friends to buy :D. but I would love to make new friends along the way c: I hope you will love lambyshop and enjoy all the cute things that I can make for you!",
  ];

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
            About Me{" "}
          </h1>
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        </div>
        <div>
          <center>
            {" "}
            <p
              style={{
                width: "500px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              {aboutText}
            </p>
          </center>
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
              Mission Statement
            </h1>
            <img src={star} alt="" class="w-16 h-16 mb-4"></img>
          </div>
          <center>
            {" "}
            <p
              style={{
                width: "500px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              {missionText}
            </p>
          </center>
        </div>

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
            Socials
          </h1>
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
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
