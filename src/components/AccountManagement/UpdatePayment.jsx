import React from 'react';
import { useRef } from 'react'
import { useState } from 'react';
import star from '../../images/story_stars_1.png'


/* 
  THIS PAGE IS REDACTED
  => Stripe API handles payments being saved so no need for this page
*/


const UpdatePayment = () => {

  const debug = true;   //DEBUG VARIABLE    true = debug output in console    false = no output

  const [card_number, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');
  const [exp_mon, setMonth] = useState('');
  const [exp_year, setYear] = useState('');
  const [first_name, setFirst] = useState('');
  const [last_name, setLast] = useState('');
  const [zip, setZip] = useState('');

  const cardNumberRef = useRef(null);
  const cvvRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const zipRef = useRef(null);

  const [cardNumberError, setCardNumberError] = useState('');
  const [cvvError, setcvvError] = useState('');
  const [monthError, setMonthError] = useState('');
  const [yearError, setYearError] = useState('');
  const [firstError, setFirstError] = useState('');
  const [lastError, setLastError] = useState('');
  const [zipError, setZipError] = useState('');

  const [serverDenial, setServerDenial] = useState(''); //for if the server says password was incorrect


  //validation functions

  //validate the original password    only checks that it is not blank

  //validate if a card number is visa
  const isVisa = () => {
    //visas start with 4 and then can be a length of 13 or 16
    const visa_regex = /^4[0-9]{12}(?:[0-9]{3})?$/;

    //card_number.replace(/ |-/gi, '');
    if(!visa_regex.test(card_number.replace(/ |-/gi, ''))) {
      //card number is not visa
      return false;
    }
    if(debug) {
      console.log(card_number + " is visa")
    }
    
    return true;
  }

  //validate if a card number is mastercard
  const isMaster = () => {
    //master card 
    const master_regex = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/
    if(!master_regex.test(card_number.replace(/ |-/gi, ''))) {
      //card is not mastercard
      return false;
    }

    if(debug) {
      console.log(card_number + " is mastercard")
    }
    return true;
  }

  //validate if a card is american express
  const isAmEx = () => {
    const amex_regex = /^3[47][0-9]{13}$/
    if(!amex_regex.test(card_number.replace(/ |-/gi, ''))) {
      //card is not amex
      return false;
    }

    if(debug) {
      console.log(card_number + " is american express")
    }
    return true;
  }

  //validate if a card is discover
  const isDiscover = () => {
    const dis_regex = /^6(?:011|5[0-9]{2})[0-9]{12}$/
    if(!dis_regex.test(card_number.replace(/ |-/gi, ''))) {
      //card is not discover
      return false;
    }

    if(debug) {
      console.log(card_number + " is discover")
    }
    return true;
  }

  //validates if card number is valid
  const validateCard = () => {
    if(debug) {
      //console.log("hello")
    }


    if(card_number.trim() === '') {
      setCardNumberError("Card number is required");
      return false;
    }
    else if(  !(isVisa() || isMaster() || isAmEx() || isDiscover())   ) {
      if(debug) {
        console.log(card_number + " is not visa, master, amex, discover")
      }
      setCardNumberError("Card number is incorrect")
      return false;
    }
    else {
      setCardNumberError('');
      return true;
    }
  }

  //validates if cvv is corect
  const validateCVV = () => {
    const cvv_regex = /^[0-9]{3}$/

    if(cvv.trim() === '') {
      setcvvError("CVV/CVC is required")
      return false;
    }
    else if(!cvv_regex.test(cvv)) {
      setcvvError("CVV/CVC in incorrect format")
      return false;
    }
    else {
      setcvvError('');
      return true;
    }
  }

  //validates expiry month
  const validateMonth = () => {
    if(exp_mon.trim() === '') {
      setMonthError("Expiration month is required")
      return false;
    }
    else if(exp_mon <= 0 || exp_mon > 12) {
      setMonthError("Not a valid month number")
      return false;
    }
    else {
      setMonthError('')
      return true;
    }
  }

  //validates expiry year
  const validateYear = () => {
    const year_regex = /^2[0-9]{3}/ //im gonna be long since dead before we get to year 3000 so i dont care
    if(exp_mon.trim() === '') {
      setYearError("Expiration month is required")
      return false;
    }
    else if(!year_regex.test(exp_year)) {
      setYearError("Incorrect year format. Please enter the full year.")
      return false;
    }
    else {
      setYearError('')
      return true;
    }
  }

  //validates first name
  const validateFirst = () => {
    if(first_name.trim() === '') {
      setFirstError("First name is required")
      return false;
    }
    else {
      setFirstError('')
      return true;
    }
  }

  //validates last name
  const validateLast = () => {
    if(last_name.trim() === '') {
      setLastError("Last name is required")
      return false;
    }
    else {
      setLastError('')
      return true;
    }
  }

  //validates zip code
  const validateZip = () => {
    const zip_regex = /^([0-9]{4}(-|| ))?[0-9]{5}$/   //only supports US based zip codes
    if(zip.trim() === '') {
      setZipError("Zip code is required")
      return false;
    }
    else if(!zip_regex.test(zip)) {
      setZipError("Zip code is not valid")
      return false;
    }
    else {
      setZipError('')
      return true;
    }
  }

  //validates everything
  const validateAll = () => {
    if(!validateCard() || !validateCVV() || !validateMonth() || !validateYear() || !validateFirst() || !validateLast() || !validateZip()) {
      //error
      if(debug) {
        console.log("Unable to submit. Something is not valid:");
        console.log("card number: " + card_number);
        console.log("cvv/cvc: " + cvv);
        console.log("expiration month: " + exp_mon);
        console.log("first name: " + first_name);
        console.log("last name: " + last_name);
        console.log("zip code: " + zip);
      }
      return false;
    }
    return true;
  }

  //submission function
  const SubmitInfo = (e) => {
    e.preventDefault();

    //final safety check
    if(!validateAll()) {return}


    if(!cardNumberError && !cvvError && !monthError && !yearError && !firstError && !lastError && !zipError) {
      //no errors
      console.log("Everything is good to go. Perform hashing on the data before sending to the server:");
      console.log("card number: " + card_number);
      console.log("cvv/cvc: " + cvv);
      console.log("expiration month: " + exp_mon);
      console.log("first name: " + first_name);
      console.log("last name: " + last_name);
      console.log("zip code: " + zip);

      //do hashing

      //send all hashed data to the server

      //if server sends back a denial saying password was not correct then dont leave page and display a message saying the password was incorrect
      if(debug) {
        setServerDenial(serverDenial + " denied");  //denial gets longer every time you submit to show this works  DELETE ONCE EVERYTHING IS COMPLETE
        console.log(serverDenial);
      }
          

      //if server sends back a confirmation then either log user out to test their new password or redirect user back to their account management page
      window.location.href = '/';
      
      

    }
    else {
      //this section should never run because of final safety check
      console.log("something went wrong");
    }

  }


  return (
    <div className="main-bg just-another-hand 4xl"> 
      <div className="flex flex-col justify-start items-center">

        {/** Page Title */}
        <div className="flex flex-center justify-center p-8">
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
          <p className= "text-[#780000] text-center sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl just-another-hand">
            U P D A T E &nbsp;&nbsp;&nbsp; P A Y M E N T
          </p>
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        </div>

        {/** form starts here */}
        <div className="flex flex-col items-start text-3xl">
          <form onSubmit={SubmitInfo}>

          {/** card number */}
          <p className="font-bold text-3xl">
            <span className="text-red-500"> *</span>
            <span className="just-another-hand">card number</span>
          </p>
          <input
            id="card-number" value={card_number} onChange={(e) => setCardNumber(e.target.value)}
            className="border border-[#780000] px-2 py-1 w-full resize-none" placeholder="card number"
            onBlur={validateCard} ref={cardNumberRef}
          />

          {/** cvv/cvc */}
          <p className="font-bold text-3xl mt-2">
            <span className="text-red-500"> *</span>
            <span className="just-another-hand">cvv / cvc</span>
          </p>
          <input
            id="cvv/cvc" value={cvv} onChange={(e) => setCVV(e.target.value)}
            className="border border-[#780000] px-2 py-1 w-full resize-none" placeholder="cvv / cvc"
            onBlur={validateCVV} ref={cvvRef}
          />

          {/** month expiry */}
          <p className="font-bold text-3xl mt-2">
            <span className="text-red-500"> *</span>
            <span className="just-another-hand">expriation month</span>
          </p>
          <input
            id="exp-mon" value={exp_mon} onChange={(e) => setMonth(e.target.value)}
            className="border border-[#780000] px-2 py-1 w-full resize-none" placeholder="MM"
            onBlur={validateMonth} ref={monthRef}
          />

          {/** year expiry */}
          <p className="font-bold text-3xl mt-2">
            <span className="text-red-500"> *</span>
            <span className="just-another-hand">expriation year</span>
          </p>
          <input
            id="exp-year" value={exp_year} onChange={(e) => setYear(e.target.value)}
            className="border border-[#780000] px-2 py-1 w-full resize-none" placeholder="YYYY"
            onBlur={validateYear} ref={yearRef}
          />

          {/** first name */}
          <p className="font-bold text-3xl mt-2">
            <span className="text-red-500"> *</span>
            <span className="just-another-hand">first name</span>
          </p>
          <input
            id="first-name" value={first_name} onChange={(e) => setFirst(e.target.value)}
            className="border border-[#780000] px-2 py-1 w-full resize-none" placeholder="First name"
            onBlur={validateFirst} ref={firstRef}
          />

          {/** last name */}
          <p className="font-bold text-3xl mt-2">
            <span className="text-red-500"> *</span>
            <span className="just-another-hand">last name</span>
          </p>
          <input
            id="last-name" value={last_name} onChange={(e) => setLast(e.target.value)}
            className="border border-[#780000] px-2 py-1 w-full resize-none" placeholder="Last name"
            onBlur={validateLast} ref={lastRef}
          />

          {/** zip code */}
          <p className="font-bold text-3xl mt-2">
            <span className="text-red-500"> *</span>
            <span className="just-another-hand">zip code</span>
          </p>
          <input
            id="zip-code" value={zip} onChange={(e) => setZip(e.target.value)}
            className="border border-[#780000] px-2 py-1 w-full resize-none" placeholder="Zip code"
            onBlur={validateZip} ref={zipRef}
          />

          </form>
        </div>

        {/** submit button */}
        <button className="bg-[#780000] hover:bg-[#780000] text-white py-2 px-4 rounded-full mt-4" onClick={SubmitInfo}>Change Payment</button>

        {/** error messages */}
        {cardNumberError && <span className="text-red-500 text-3xl">{cardNumberError}</span>}
        {cvvError && <span className="text-red-500 text-3xl">{cvvError}</span>}
        {monthError && <span className="text-red-500 text-3xl">{monthError}</span>}
        {yearError && <span className="text-red-500 text-3xl">{yearError}</span>}
        {firstError && <span className="text-red-500 text-3xl">{firstError}</span>}
        {lastError && <span className="text-red-500 text-3xl">{lastError}</span>}
        {zipError && <span className="text-red-500 text-3xl">{zipError}</span>}
        {serverDenial && <span className="text-red-500 text-6xl">{serverDenial}</span>}

      </div>
    </div>
  );
};

export default UpdatePayment;