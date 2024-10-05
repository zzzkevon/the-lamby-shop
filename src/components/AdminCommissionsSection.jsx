import React, { useEffect, useState } from "react";
import star from "../images/story_stars_1.png";
import axios from 'axios';

export default function AdminCommissionsSection() {
  const [commissionsArray, setCommissionsArray] = useState([]);

  useEffect(() => {
    //function to grab all commissions from DynamoDB
    const grabAllCommissions = async () => {

      await axios.get('https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development/admin')
      .then(response => {
          //console.log('Response Data:', response.data.Items);
          setCommissionsArray(response.data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
    }
    grabAllCommissions();
  }, []);

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

      <div className="flex w-full justify-around items-center">
        {commissionsArray.length === 0 ? 
          (
            // Render if the array is empty
            <p>There are currently no commissions available.</p> 
          ) : (
            <ul className="justify-around w-4/5">
              {commissionsArray.map(commissionItem => (
                <CommissionItem
                  key={commissionItem.id}
                  id={commissionItem.id}
                  clientName={commissionItem.firstName+' '+commissionItem.lastName}
                  description={commissionItem.description}
                  status = {commissionItem.commissionStatus}
                  date = {commissionItem.createdAt}
                  email = {commissionItem.email}
                />
              ))}
            </ul>
          )
        }
      </div>
    </div>
  );
}

function CommissionItem({ key, id, clientName, description, status, email, date}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [selected, setSelected] = useState(null);

  const handleChange = event => {
    event.stopPropagation();
    if (event.target.value === selected) {
      setSelected(null);
    } else {
      setSelected(event.target.value);
      //do something here based on whether accepted/declined/flagged
    }
  };

  return (
    <div className="w-full border border-gray-300 rounded overflow-hidden mb-2 just-another-hand text-3xl">
      <div className="flex justify-between">
        <div
          className="flex w-full p-2 bg-gray-200 cursor-pointer justify-start"
          onClick={toggleDropdown}
        >
          <div className="flex w-1/4">Id: {id}</div>
          <div className="flex w-1/2">Client Name: {clientName}</div>
          <div className="flex w-1/4">Date: {date}]</div>
        </div>
        <div className="flex justify-center border border-black bg-gray-150">
          {/* This part below is the 3 checkboxes.*/}
          <div className="flex space-x-4">
            <label className="flex px-2 items-center space-x-2">
              <input
                type="checkbox"
                value="accept"
                checked={selected === "accept"}
                onChange={handleChange}
                className="form-checkbox accent-green-400"
              />
              <span>Accept</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="decline"
                checked={selected === "decline"}
                onChange={handleChange}
                className="form-checkbox accent-red-500"
              />
              <span>Decline</span>
            </label>

            <label className="flex px-2 items-center space-x-2">
              <input
                type="checkbox"
                value="flag"
                checked={selected === "flag"}
                onChange={handleChange}
                className="form-checkbox accent-yellow-300"
              />
              <span>Flag</span>
            </label>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="block p-2 bg-white border-t border-gray-300 text-2xl">
          <p>This is the dropdown content!</p>
          <p>Commission Status: {status}</p>
          <p>Email: {email}</p>
          <p>Description: {description}</p>
        </div>
      )}
    </div>
  );
}