import React from 'react';

/* 
    text box entry feature
        250 max character limit
        no special characters
        must store to database
*/


export default function CustomRequests() {
    const handleKeyPress = (event) => {
        // Get the pressed key's Unicode value
        const charCode = event.charCode;
    
        // Allow only alphanumeric characters and whitespace
        if (!((charCode > 64 && charCode < 91) || // A-Z
              (charCode > 96 && charCode < 123) || // a-z
              (charCode > 47 && charCode < 58) || // 0-9
              charCode === 32)) { // space
            event.preventDefault(); // Prevent the character from being typed
        }
    };
    
      return (
        <label>
            <br></br>
            Custom Requests<br></br>

            Describe your custom request here!
            <br></br>
            <textarea
                placeholder="250 character limit..."  
                name="postContent"
                maxLength={250} // character limit set to 250
                rows={4}
                cols={40}
                onKeyPress={handleKeyPress} // Call the handleKeyPress function on key press
            />
        </label>
    );
}

