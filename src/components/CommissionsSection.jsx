import React from 'react';

export default function CommisionsSection() {
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

      console.log("First Name: ", firstName)
      console.log("Last Name: ", lastName)
      console.log("Email: ", email)
      console.log("Phone Number: ", phoneNumber)
      console.log("Other request method: ", desc);
  }

  return (
      <div className='main-bg just-another-hand text-3xl font-medium'
          style={{
            display: 'flex', // make it a flex container
            flexDirection: 'column', // align items vertically
            justifyContent: 'center', // center content vertically
          }}>
            
            
          <div style={{backgroundColor: '#cfcfcf', minHeight: '100vh'}}>   
              <label style = {{position: 'absolute' ,width: '94px',
                    height: '36px', top: '333px', left: '591px'}}>
                  first name*
              </label>
              <input type="text" id="fname" className = 'input-borders'
                style= {{width: '420px', height: '60px', top: '371px', left: '582px'}}>
              </input>   
              
              <label style = {{position: 'absolute', width: '87px', 
                height: '36px', top: '335px', left: '1050px'}}>
                  last name*
              </label>
              <input type="text" id="lname" className='input-borders'
                  style= {{width: '420px', height: '60px', top: '371px', left: '1039px'}}>
              </input>
              
              <label style = {{position: 'absolute', width: '53px',
                height: '36px', top: '442px', left: '591px'}}>
                  email*
              </label>
              <input type="text" id="email" className='input-borders'
                style= {{width: '420px', height: '60px', top: '482px', left: '582px'}}>
              </input>

              <label style = {{position: 'absolute', width: '124px', 
                height: '36px', top: '442px', left: '1050px'}}>
                  phone number*
              </label>
              <input type="text" id="phone" className='input-borders' 
                style= {{width: '420px', height: '60px', top: '482px', left: '1039px'}}>
              </input>

              <label style = {{position: 'absolute', width: '97px',
                height: '60px', left: '588px', top: '577px'}}>
                  description*
              </label> 
              <textarea id="description" className='input-borders' name="customRequest"
                onKeyPress={handleKeyPress} // used to prevent special characters from being typed into the text besides comma, period, and question mark
                maxLength={250} // character limit set to 250
                style={{width: '877px', height: '162px', top: '613px', left: '582px'}}/>
              
              <button className = "button button-text" onClick={handleSubmit}
                style={{width: '80px', height: '36px', left: '971px'}}>
                  <label>s u b m i t</label>
              </button>
          </div>
      </div>
  );
}


