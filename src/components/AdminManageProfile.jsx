import React, {useState} from 'react';
import star from '../images/story_stars_1.png'
import { newPasswordUI, passwordValidation, togglePass } from './functions/passwords';

export default function AdminManageProfile() {
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confNewPass, setConfNewPass] = useState("");
    const [showPassword, setShowPassword] = useState();

    // Toggle password function
    const tp = () => {togglePass(showPassword, setShowPassword);}

    // New password onchange functions due to needing two functions within the onChange
    const npOnchange = e => { // New password
        newPasswordUI();
        setNewPass(e);
    }
    const cnpOnchange = e => { // Confirm new password
        newPasswordUI();
        setConfNewPass(e);
    }
    
    // Update username/email
    const ChangeUserOrEmail = () => {
        //console.log(newUsername)
        //console.log(newEmail)
        // Database setup needed in order to add change username and email code
        if(newUsername.length > 0 && newEmail.length > 0) {
            alert("Changing username and email")
            // Add code to change username and email here
        }
        else if(newUsername.length > 0 && newEmail.length <= 0){
            alert("Changing username only")
            // Add code to change just the username here
        }
        else if(newUsername.length <= 0 && newEmail.length > 0){
            alert("Changing email only")
            // Add code to change just the email here
        }
        else
            alert("Username or email required to make a change")

        // Refresh page to reset inputs
        window.location.reload();
    }

    // Update password
    const ChangePassword = () => {          
        //console.log(oldPass)
        //console.log(newPass)
        //console.log(confNewPass)

        if(window.confirm("Confirm new password?")){
            // Need to add old password verification once database is setup
            // New password validation
            if(oldPass.length == "" || newPass == "" || confNewPass == ""){
                window.alert("Missing input values.")
            }
            else{
                if(!passwordValidation(newPass, confNewPass))
                    alert("Password invalid! Review the following requirements below.")     
                else {
                    alert("Password is valid! Now hashing the password...")                   
                    window.location.reload(); // Refresh page to reset inputs
                }   
            } 
        }
        else
            alert("Cancel has been pressed, no change has been made.")  
    }
        
    return(
        <div className='main-bg just-another-hand text-4xl'>
            {/*Page Title*/}
            <div className='flex justify-center items-center'>
                <img src={star} alt="" class="w-16 h-16 mb-4"></img>
                    <header className='header-font header-format' style={{ fontSize: '2em', padding: '25px' }}>
                        Admin - Manage Profile
                    </header>
                <img src={star} alt="" class="w-16 h-16 mb-4"></img>
            </div>
            {/************/}

            <div className='flex justify-center items-center grid gap-20'>
                {/*Change username and email section*/}
                <div className='grid gap-7'>
                    <input type="text" id="chg-username" onChange={(e) => setNewUsername(e.target.value)} placeholder=' change username' className='input-borders placeholder:text-black'></input>
                    <input type="text" id="chg-email" onChange={(e) => setNewEmail(e.target.value)} placeholder=' change email' className='input-borders placeholder:text-black'></input>
                    <div className='flex justify-center items-center'>
                        <button className = "bg-[#780000] hover:bg-[#780000] text-white py-2 px-8 rounded-full mt-4" onClick={ChangeUserOrEmail}>update username/email</button> 
                    </div>
                </div> 
                {/*******************************/}

                {/*Change password section*/}
                <div className='grid gap-7'>
                    <input type="text" id="old-pass" onChange={(e) => setOldPass(e.target.value)} placeholder=' enter old password' className='input-borders placeholder:text-black'></input>
                    <input type={showPassword ? "text" : "password"} id="new-pass" onChange={(e) => npOnchange(e.target.value)} placeholder=' enter new password' className='input-borders placeholder:text-black' maxLength={32}></input>
                    <input type={showPassword ? "text" : "password"} id="conf-new-pass" onChange={(e) => cnpOnchange(e.target.value)} placeholder=' confirm new password' className='input-borders placeholder:text-black' maxLength={32}></input>      
                    
                    {/* Password visibility toggle */}
                    <div className=''>
                        <label>
                            <input type="checkbox" onChange={tp} checked={showPassword} />
                            Show Password
                        </label>
                    </div>

                    {/*New Password Validation UI*/}
                    <div className='grid flex items-center justify-center'>
                        <strong>New password must contain the following</strong>
                    </div>
                    <div className='grid flex items-center justify-center'> 
                        <p id="upper" class="invalid">A <b>capital (uppercase) </b> letter</p>
                        <p id="lower" class="invalid">A <b>lowercase</b> letter</p>
                        <p id="number" class="invalid">A <b>number</b></p>
                        <p id="length" class="invalid">Minimum <b>8 characters</b></p>
                        <p id="match" class="invalid">Password matches</p>
                    </div>
                    {/****************************/}
                    <div className='flex justify-center items-center'>
                        <button className = "bg-[#780000] hover:bg-[#780000] text-white py-2 px-8 rounded-full mt-4" onClick={ChangePassword}>update password</button> 
                    </div>
                </div>    
                {/*************************/}          
            </div>
            <br></br>  
        </div>
    )
}