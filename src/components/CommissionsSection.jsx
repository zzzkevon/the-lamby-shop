import React, { useEffect, useState } from "react";
import star from "../images/story_stars_1.png";
import axios from 'axios';
import { FCPThresholds } from "web-vitals";
/* Test commission
const commissionArray = [
  {
    id: 1,
    clientName: "Attila Diocletian",
    description: "This description is for Attila Diocletian.",
  },
  {
    id: 2,
    clientName: "Gavrilo Juma",
    description: "This description is for Gavrilo Juma.",
  },
  {
    id: 3,
    clientName: "Eilert Lakshman",
    description: "This description is for Eilert Lakshman.",
  },
  {
    id: 4,
    clientName: "Goemon Ives",
    description: "This description is for Goemon Ives.",
  },
];
*/

function SwitchViewButton() {
  const [view, setView] = useState("userView");

  const switchView = () => {
    setView(view === "userView" ? "adminView" : "userView");
  };

  // Print page type in console when changed
  useEffect(() => {
    console.log(view);
  }, [view])

  return (
    <div>
      <button
        onClick={switchView}
        className="border-2 border-black border-solid h-12"
      >
        Test Button: Switch View
      </button>
      {view === "userView" && <UserCommisionsSection />}
      {view === "adminView" && <AdminCommissionSection />}
    </div>
  );
}

function AdminCommissionSection() {
  // For getting and setting admin commissions from DB
  const [adminCommissions, setAdminCommissions] = useState([]);
  
  useEffect(() => {
    // GET request from API for all existing commissions
    axios.get(`https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development/admin`)
    .then(response => {
      // Get only the item id, clientName, and description
      let mappedData = response.data.map(item => ({
        id: item.id,
        clientName: `${item.firstName} ${item.lastName}`,
        description: item.description
      }))
      //console.log(mappedData);
      setAdminCommissions(mappedData);
    })
    .catch(err => console.error(`Error getting commission data`, err))  
  }, []) 

  // Getting form data from CommissionItem
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({id: null, commissionStatus: ''});

  // Add commission item to items list
  useEffect(() => {  
    //console.log('Commission Item added to list to be updated: ', formData);
    // Add item to list
    setItems([...items, {
      id: formData.id,
      commissionStatus: formData.commissionStatus
    }]);
    //console.log('Commission Item list size: ', items.length);
  },[formData])

  /*
  const test = () => {
    // For items array, start at index 1
    // Index 0 is the initial state declared in formData
    for(let i = 1; i < items.length; i++){
      console.log(`Commission Item ${i}: ${items[i].id} ${items[i].commissionStatus}`);
    }
  }
  */
  
  // For updating statuses of all selected commissions
  const handleConfirm = () => {
    let updatecommission_url = `https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development/updateCommissionStatus`;
    // Parse through all of the items and push them to db
    if(window.confirm("Are you sure you want to submit changes?")){
      alert("Submitting changes for commission statuses")
      for(let i = 1; i < items.length; i++){
        axios.put(updatecommission_url, {commissionStatus: items[i].commissionStatus}, {params: { id: items[i].id }})
          .then(response => { console.log(`Updating data for commission ID ${items[i].id}`, response.data) })
          .catch(error => console.error(`Error updating the data for commission ID ${items[i].id}`, error))
      }
    } else {
      alert("Canceled, no changes made to commission statuses")
    }
  }

  return (
    <div >
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
        {/*creates and displays the commission item components from the data in the commission array*/}
        <ul className="justify-around w-4/5">
          {adminCommissions.map(commissionItem => (
            <CommissionItem
              id={commissionItem.id}
              clientName={commissionItem.clientName}
              description={commissionItem.description}
              items={items}
              setItems={setItems}
              setFormData={setFormData}
            />
          ))}
          {/*<button onClick={test} className="button button-text">TEST</button>*/}
          <button onClick={handleConfirm} className="button button-text">Confirm</button>
        </ul>  
      </div>
    </div>
  );
}

function CommissionItem({ id, clientName, description, items, setItems, setFormData }) {
  // For opening the commission item to view dropdown contents
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // For handling checkbox values
  const [selected, setSelected] = useState(null);

  /*  Get's the id and sets the selected commission status, 
    pushing it to formData in AdminCommissionSection().  */   
  const handleFormChanges = (event) => {
    event.stopPropagation();
    if (event.target.value === selected) {
      setSelected(null);
      // Remove item from item array in AdminCommissionSection()
      const index = items.findIndex(item => item.id === id);
      if(index !== -1){
        const newItemsArray = [...items.slice(0, index), ...items.slice(index+1)];
        setItems(newItemsArray);
      }
    } else {
      setSelected(event.target.value);
      setFormData({id: id, commissionStatus: event.target.value});
    }
  }

  
  return (
    <>
      <div className="w-full border border-gray-300 rounded overflow-hidden mb-2 just-another-hand text-3xl">
        <div className="flex justify-between">
          <div
            className="flex w-full p-2 bg-gray-200 cursor-pointer justify-start"
            onClick={toggleDropdown}
          >
            <div className="flex w-1/4">Id: {id}</div>
            <div className="flex w-1/2">Client Name: {clientName}</div>
            <div className="flex w-1/4">Date: XX-XX-XXXX</div>
          </div>
          <div className="flex justify-center border border-black bg-gray-150">
            {/* This part below is the 3 checkboxes.*/}
            <div className="flex space-x-4">
              <label className="flex px-2 items-center space-x-2">
                <input
                  type="checkbox"
                  value="accept"
                  checked={selected === "accept"}
                  onChange={handleFormChanges}
                  className="form-checkbox accent-green-400"
                />
                <span>Accept</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="decline"
                  checked={selected === "decline"}
                  onChange={handleFormChanges}
                  className="form-checkbox accent-red-500"
                />
                <span>Decline</span>
              </label>

              <label className="flex px-2 items-center space-x-2">
                <input
                  type="checkbox"
                  value="flag"
                  checked={selected === "flag"}
                  onChange={handleFormChanges}
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
            <p>Description: {description}</p>
            <button className="flex items-center justify-center button button-text">Cancel</button>
          </div>
          
        )}
      </div>
    </>
  );
}

function UsersPersonalCommissionItem ({ id, clientName, description, status, date }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dateCreated = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateCreated.toLocaleDateString('en-US', options);

  return(
    <div className="w-full border border-gray-300 rounded overflow-hidden mb-2 just-another-hand text-3xl">
      <div className="flex justify-between">
        <div
          className="flex w-full p-2 bg-gray-200 cursor-pointer justify-start"
          onClick={toggleDropdown}
        >
          <div className="flex w-1/4">Id: {id}</div>
          <div className="flex w-1/3">Client Name: {clientName}</div>
          <div className="flex w-1/4">Date Created: {formattedDate}</div>
          <div className="flex w-1/6">Status: {status}</div>
        </div>
      </div>
      {isOpen && (
        <div className="block p-2 bg-white border-t border-gray-300 text-2xl">
          <p>This is the dropdown content!</p>
          <p>Description: {description}</p>
        </div>
      )}
    </div>
  );
}

function UserCommisionsSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [userCommissionArray, setUserCommissions] = useState([]);
  const [commissionFormOpen, setFormOpen] = useState(false);
  const [addFormButtonText, setButtonText] = useState("Add A Commission\u25B4");
  
  const toggleForm = () => {
    if (commissionFormOpen) {
      // Up arrow
      setButtonText("Add A Commission\u25B4");
    }else{
      // Down arrow
      setButtonText("Add A Commission\u25BE");
    } 
    setFormOpen(!commissionFormOpen);
  }

  // function to handle no special characters
  const handleKeyPress = event => {
    // to get the pressed key's unicode value
    const charCode = event.charCode;
    // only allow these values
    if (
      !(
        (charCode > 64 && charCode < 91) || // A-Z
        (charCode > 96 && charCode < 123) || // a-z
        (charCode > 47 && charCode < 58) || // 0-9
        charCode === 32 || // space
        charCode === 46 || // period
        charCode === 44 || // comma
        charCode === 63
      )
    ) {
      // question mark
      event.preventDefault(); // Prevent the character from being typed
      // only special characters allowed are space, period, comma, and question mark
    }
  };

  useEffect(() => {
    //function to grab users data when loading page
    const grabOwnCommissions = () => {
      const testEmail = "example@gmail.com"; // Replace with the email you want to test

      axios.get(`https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development/getUserCommissions`, {
        params: {
            email: testEmail
        }
      })
      .then(response => {
          //console.log('Response Data:', response.data.Items);
          setUserCommissions(response.data.Items);
      })
      .catch(error => {
          console.error('Error:', error);
      });
    }
    grabOwnCommissions();
  }, []);

  // function to handle submitting the textarea data into the database
  const handleSubmit = async () => {
    if (window.confirm("Are you sure you want to submit?")) {
      console.log("First Name: ", firstName);
      console.log("Last Name: ", lastName);
      console.log("Email: ", email);
      console.log("Phone Number: ", phoneNumber);
      console.log("Other request method: ", description);
      window.alert("Commission sent!");

      const commissionData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        description
      };

      try {
        // Send the data to the backend using Axios
        axios.post('https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development', commissionData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log('Success:', response.data);
            
            if (response.status === 200) {
                //window.alert("Commission sent successfully!");
                //window.location.reload();  // Reload the page after successful submission
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.alert("Failed to send commission. Please try again.");
        });
      }catch(error) {
        // Handle synchronous errors (not from Axios)
        console.error("Error sending commission data:", error);
        window.alert("Failed to send commission. Please try again.");
      } 

    }else{
      window.alert("You pressed cancel, commission not sent!");
    }
  };

  return (
    <div
      className="main-bg just-another-hand text-3xl"
      style={{
        display: "flex", // make it a flex container
        flexDirection: "column", // align items vertically
        alignItems: "center",
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
            Y O U R&nbsp;&nbsp;&nbsp;&nbsp;C O M M I S S I O N S
          </h1>
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        </div>
      </div>

      <div className="flex w-full justify-around items-center">
        {/*creates and displays the commission item components from the data in the commission array*/}
        
        {userCommissionArray.length === 0 ? 
          (
            // Render if the array is empty
            <p>You currently have no commissions.</p> 
          ) : (
            <ul className="justify-around w-4/5">
              {userCommissionArray.map(userCommission => (
                <UsersPersonalCommissionItem
                  key={userCommission.id}
                  id={userCommission.id}
                  clientName={userCommission.firstName+' '+userCommission.lastName}
                  description={userCommission.description}
                  status = {userCommission.commissionStatus}
                  date = {userCommission.createdAt}
                />
              ))}
            </ul>
          )
        }

      </div>
      
      <button className ="m-8 pl-2 bg-white flex justify-center items-center rounded" onClick={toggleForm}>
        {addFormButtonText}
      </button>

      {commissionFormOpen && (
        <div style={{
          display: "flex", // make it a flex container
          flexDirection: "column", // align items vertically
          alignItems: "center",
          minHeight: "100vh",
        }}>
           
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label>first name*</label>
            </div>
            <div>
              <label>last name*</label>
            </div>

            <div>
              <input
                type="text"
                id="fname"
                className="input-borders"
                onChange={e => setFirstName(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                type="text"
                id="lname"
                className="input-borders"
                onChange={e => setLastName(e.target.value)}
              ></input>
            </div>

            <div>
              <label>email*</label>
            </div>
            <div>
              <label>phone number*</label>
            </div>

            <div>
              <input
                type="text"
                id="email"
                className="input-borders"
                onChange={e => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                type="text"
                id="phone"
                className="input-borders"
                onChange={e => setPhoneNumber(e.target.value)}
              ></input>
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
                onKeyPress={handleKeyPress} // used to prevent special characters from being typed into the text besides comma, period, and question mark
                maxLength={250} // character limit set to 250
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
              <button className="button button-text" onClick={handleSubmit}>
                s u b m i t
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default function CommisionsSection() {
  return (
    <div>
      <SwitchViewButton />
    </div>
  );
}
