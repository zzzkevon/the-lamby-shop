import React from 'react';
import star from '../images/story_stars_1.png'
import bcryptjs from 'bcryptjs' // password hashing

export default function ForgotPassword() {
    // password requirements to be met
    let lowercase = /[a-z]/;
    let uppercase = /[A-Z]/;
    let numbers = /[0-9]/;

    // function handles the UI under the submit button informing the user of the password requirements
    const validatePassUI = () => {
        var newpass = document.getElementById("newpass").value;
        var confnewpass = document.getElementById("cnewpass").value;
        // for updating ui
        var uc = document.getElementById("upper");
        var lc = document.getElementById("lower");
        var num = document.getElementById("number");
        var len = document.getElementById("length");
        var match = document.getElementById("match");

        // validate uppercase letters
        if (newpass.match(uppercase)) {
            uc.classList.remove('invalid');
            uc.classList.add('valid');
        } else {
            uc.classList.remove('valid');
            uc.classList.add('invalid');
        }
        // validate lowercase letters
        if (newpass.match(lowercase)) {
            lc.classList.remove('invalid');
            lc.classList.add('valid');
        } else {
            lc.classList.remove('valid');
            lc.classList.add('invalid');
        }
        // validate numbers
        if (newpass.match(numbers)) {
            num.classList.remove('invalid');
            num.classList.add('valid');
        } else {
            num.classList.remove('valid');
            num.classList.add('invalid');
        }
        // validate length
        if (newpass.length >= 8 && newpass.length <= 32) {
            len.classList.remove('invalid');
            len.classList.add('valid');
        } else {
            len.classList.remove('valid');
            len.classList.add('invalid');
        }
        // validate that the new password matches it's confirmation
        if(newpass !== confnewpass || newpass.length < 1){
            match.classList.remove('valid');
            match.classList.add('invalid');
        }
        else{
            match.classList.remove('invalid');
            match.classList.add('valid');
        }
    }

    // function handles alert boxes that 
    const passwordValidation = (password,conf_password) => { 
        // test for uppercase, lowercase, number, length requirements, and if the confirmation password matches
        const hasUpper = uppercase.test(password);
        const hasLower = lowercase.test(password);
        const hasNumber = numbers.test(password);
        const minLengthReached = password.length >= 8 && password.length <= 32;
        const isMatched = password == conf_password;
        // return's true only if all checks have been passed
        return hasUpper && hasLower && hasNumber && minLengthReached && isMatched;
    }
    
    // hashing password and sending it to database
    const hash_and_send = (password) => {
        bcryptjs.hash(password, 10, function(err, hash) {
            console.log("Hashed pass:", hash); // output hash password
            // Store hash in your password DB
        });
    }    

    // function to handle submitting new password
    const handleSubmit = () => {
        // input values
        let new_pass = document.getElementById('newpass').value;
        let conf_new_pass = document.getElementById("cnewpass").value;

        if(window.confirm("Confirm new password?")){
            // if new_pass passes validation
            if(!passwordValidation(new_pass, conf_new_pass)){
                alert("Password invalid! Review the following requirements below.")
            }
            else{
                alert("Password is valid! Now hashing the password...")
                hash_and_send(new_pass);
            }
            
        }
        else{
            console.log("Cancel has been pressed, no change has been made.")
        }
    }

    return(
        <div className='main-bg just-another-hand text-3xl'
                style={{display: 'flex', // make it a flex container
                        flexDirection: 'column', // align items vertically
                        alignItems: 'center',
                        minHeight: '100vh'}}>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src={star} alt="" class="w-16 h-16 mb-4"></img>
                <h1 className='header-font header-format' style={{ fontSize: '2em', padding: '25px' }}>Forgot Password?</h1>
                <img src={star} alt="" class="w-16 h-16 mb-4"></img>
                </div>
            </div>           

            <div className='grid gap-3'>
                <div>    
                    <input type="text" id="newpass" className = 'input-borders' placeholder='Enter your new password' maxLength={32} onChange={validatePassUI}></input>
                </div>
                <div>    
                    <input type="text" id="cnewpass" className = 'input-borders' placeholder='Confirm your new password' maxLength={32} onChange={validatePassUI}></input>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                    <button className = "button button-text" onClick={handleSubmit}>s u b m i t</button>  
                </div> 

                <div id="message">
                    <h3>Password must contain the following:</h3>
                    <p id="upper" class="invalid">A <b>capital (uppercase) </b> letter</p>
                    <p id="lower" class="invalid">A <b>lowercase</b> letter</p>
                    <p id="number" class="invalid">A <b>number</b></p>
                    <p id="length" class="invalid">Minimum <b>8 characters</b></p>
                    <p id="match" class="invalid">Password matches</p>
                </div>
            </div>
        </div>
    );
}
