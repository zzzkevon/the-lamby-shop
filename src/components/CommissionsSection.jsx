//import React from 'react';
import star from '../images/story_stars_1.png'

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


