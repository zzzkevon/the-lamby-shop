//import React from 'react';
import React, { useState } from 'react';
import star from '../images/story_stars_1.png'

const commissionArray = [
  {id: 1, clientName: "Attila Diocletian", description: "This description is for Attila Diocletian."},
  {id: 2, clientName: "Gavrilo Juma", description: "This description is for Gavrilo Juma."},
  {id: 3, clientName: "Eilert Lakshman", description: "This description is for Eilert Lakshman."},
  {id: 4, clientName: "Goemon Ives", description: "This description is for Goemon Ives."}
];

function SwitchViewButton() {
  const [view, setView] = useState('userView');

  const switchView = () => {
    setView(view === 'userView' ? 'adminView' : 'userView');
  };

  return (
    <div>
    <button onClick={switchView} className='border-2 border-black border-solid h-12'>
      Test Button: Switch View
    </button>
    {view === 'userView' && <UserCommisionsSection />}
    {view === 'adminView' && <AdminCommissionSection />}
    </div>

  );
}

function AdminCommissionSection() {
  return(
    <div>

      <div className = 'just-another-hand text-3xl' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        <h1 className='header-font header-format' style={{ fontSize: '2em', padding: '25px' }}>C O M M I S S I O N S</h1>
        <img src={star} alt="" class="w-16 h-16 mb-4"></img>
      </div>

      <div className = 'flex w-full justify-around items-center'>
        {/*creates and displays the commission item components from the data in the commission array*/}
        <ul className ='justify-around w-4/5'>
          {commissionArray.map((commissionItem) => (
            <CommissionItem 
              id = {commissionItem.id}
              clientName = {commissionItem.clientName}
              description = {commissionItem.description}
            />
          ))}
        </ul>
        
      </div>      
    </div>
  );
}

function CommissionItem({id, clientName, description}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [selected, setSelected] = useState(null);

  const handleChange = (event) => {
    event.stopPropagation();
    if(event.target.value === selected){
      setSelected(null);      
    }else{
      setSelected(event.target.value);   
      //do something here based on whether accepted/declined/flagged
    }
  };

  return (
    <div className="w-full border border-gray-300 rounded overflow-hidden mb-2 just-another-hand text-3xl">
      <div className = "flex justify-between">
        <div 
          className="flex w-full p-2 bg-gray-200 cursor-pointer justify-start"
          onClick={toggleDropdown}
        >

          <div className = 'flex w-1/4'>Id: {id}</div>
          <div className = 'flex w-1/2'>Client Name: {clientName}</div>
          <div className = 'flex w-1/4'>Date: XX-XX-XXXX</div>
          
        </div>
        <div className = "flex justify-center border border-black bg-gray-150">
          {/* This part below is the 3 checkboxes.*/}
          <div className="flex space-x-4">

            <label className="flex px-2 items-center space-x-2">
              <input
                type="checkbox"
                value="accept"
                checked={selected === 'accept'}
                onChange={handleChange}
                className="form-checkbox accent-green-400"
              />
              <span>Accept</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="decline"
                checked={selected === 'decline'}
                onChange={handleChange}
                className="form-checkbox accent-red-500"
              />
              <span>Decline</span>
            </label>

            <label className="flex px-2 items-center space-x-2">
              <input
                type="checkbox"
                value="flag"
                checked={selected === 'flag'}
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
          <p>Description: {description}</p>
        </div>
      )}

    </div>
  );
}

function UserCommisionsSection() {
    // function to handle no special characters
    const handleKeyPress = (event) => {
      // to get the pressed key's unicode value
      const charCode = event.charCode;
      // only allow these values
      if (!((charCode > 64 && charCode < 91) || // A-Z
            (charCode > 96 && charCode < 123) || // a-z
            (charCode > 47 && charCode < 58) || // 0-9
            charCode === 32 ||  // space  
            charCode === 46 ||  // period
            charCode === 44 ||  // comma
            charCode === 63)) { // question mark
          event.preventDefault(); // Prevent the character from being typed
          // only special characters allowed are space, period, comma, and question mark
      }
    };

  // function to handle submitting the textarea data into the database
  const handleSubmit = () => {
      let firstName = document.getElementById('fname').value;
      let lastName = document.getElementById('lname').value;
      let email = document.getElementById('email').value;
      let phoneNumber = document.getElementById('phone').value;
      let desc = document.getElementById('description').value;

      if(window.confirm("Are you sure you want to submit?")){
        console.log("First Name: ", firstName)
        console.log("Last Name: ", lastName)
        console.log("Email: ", email)
        console.log("Phone Number: ", phoneNumber)
        console.log("Other request method: ", desc);
        console.log("Commission sent!")
      }
      else{
        console.log("You pressed cancel, commission not sent!")
      }
  }

  return (
    <div className='main-bg just-another-hand text-3xl'
          style={{
            display: 'flex', // make it a flex container
            flexDirection: 'column', // align items vertically
            alignItems: 'center',
            minHeight: '100vh',
          }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <img src={star} alt="" class="w-16 h-16 mb-4"></img>
              <h1 className='header-font header-format' style={{ fontSize: '2em', padding: '25px' }}>C O M M I S S I O N S</h1>
              <img src={star} alt="" class="w-16 h-16 mb-4"></img>
            </div>
          </div> 
            
        <div className='grid grid-cols-2 gap-3'>
              <div>   
                <label>first name*</label>
              </div>
              <div>    
                <label>last name*</label> 
              </div>
              
              <div> 
                <input type="text" id="fname" className = 'input-borders'></input>  
              </div>
              <div>
                <input type="text" id="lname" className='input-borders'></input>
              </div>

              <div>
                <label>email*</label>
              </div>
              <div>
                <label>phone number*</label>
              </div>

          <div>
            <input type="text" id="email" className='input-borders'></input>
          </div>
          <div>
            <input type="text" id="phone" className='input-borders'></input>
          </div>
        </div> 

        <div className='grid grid-cols-1 gap-3'>
          <div>
            <label>
                description*
            </label> 
          </div> 

          <div>
            <textarea id="description" className='input-borders' name="customRequest"
              onKeyPress={handleKeyPress} // used to prevent special characters from being typed into the text besides comma, period, and question mark
              maxLength={250} // character limit set to 250
              style={{width: '877px', height: '162px'}}/>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
            <button className = "button button-text" onClick={handleSubmit} >s u b m i t</button>  
          </div> 
        </div>  

    </div>
  );
}

export default function CommisionsSection() {
    return(
      <div>
        <SwitchViewButton />
      </div>
    );
}
