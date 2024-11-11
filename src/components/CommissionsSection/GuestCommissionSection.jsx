import React from 'react';
import star from '../../images/story_stars_1.png';

export default function GuestCommissionSection() {
    return (
      <div>
        <div
          className="just-another-hand text-3xl"
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
            C O M M I S S I O N S
          </h1>
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        </div>
  
        <div className="flex w-full just-another-hand justify-around items-center">
          <h2 className="text-6xl">
            Welcome, Guest! Please log in to view your commissions.
          </h2>
        </div>
      </div>
    );
}