import React from 'react';
import { RiInstagramFill } from "react-icons/ri";
import { PiTiktokLogoFill } from "react-icons/pi";
import { FaSquareXTwitter } from "react-icons/fa6";
import star from '../images/story_stars_1.png'

const AboutSection = () => {

  let aboutText = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptatevelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."];
  let missionText = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptatevelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."];


  return (
    <div className='main-bg just-another-hand px-8 text-5xl ' style={{
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      minHeight: '100vh'
    }} >
      <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src={star} alt="" class="w-16 h-16 mb-4"></img>
      <h1 className='header-font header-format' style={{ fontSize: '2em' }}>About Me </h1>
      <img src={star} alt="" class="w-16 h-16 mb-4"></img>
            </div>
          <div> 
      
       <center> <p style={{width: '500px', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>{aboutText}</p></center>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <img src={star} alt="" class="w-16 h-16 mb-4"></img>
              <h1 className='header-font header-format' style={{ fontSize: '2em' }}>Mission Statement</h1>
              <img src={star} alt="" class="w-16 h-16 mb-4"></img>
            </div>
            <center> <p style={{width: '500px', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>{missionText}</p></center>
            </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src={star} alt="" class="w-16 h-16 mb-4"></img>
            <h1 className='header-font header-format' style={{ fontSize: '2em' }}>Socials</h1>
            <img src={star} alt="" class="w-16 h-16 mb-4"></img>

          </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px'}}>
            <a href="https://instagram.com"><RiInstagramFill /></a>
            <a href="https://tiktok.com"><PiTiktokLogoFill /></a>
            <a href="https://twitter.com"><FaSquareXTwitter /></a>
            </div>
          


      </div>
    </div>
    
  );
}

export default AboutSection;