
import React from "react";
import Subscribe from './subscribe/Subscribe';
import Carousel2 from './carousel2/Carousel2';
import ViewAllButton from "./viewAll/viewAllButton";
import Carousel1 from "./carousel1/Carousel1";

const HeroSection = () => {
  return (
    <div className="main-bg">
      <Carousel1/>
      <ViewAllButton />
      <Carousel2 />
      <Subscribe />
    </div>
  );
};

export default HeroSection;