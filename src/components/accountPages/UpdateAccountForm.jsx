import React from 'react'
import { useRef } from 'react'

const UpdateAccountForm = (props) => {
  
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef(); // New ref for the confirmation password


  function submitHandler(event){
    event.preventDefault();

    const enteredFirst = firstNameInputRef.current.value;
    const enteredLast = lastNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value
    const enteredConfirmPassword = confirmPasswordRef.current.value; // Get the confirmation password

    if (enteredPassword !== enteredConfirmPassword) {
      alert("Passwords do not match!"); // Alert or handle as necessary
      return; // Stop the form submission
    }

    const accountData = {
      first: enteredFirst,
      last: enteredLast,
      email: enteredEmail,
      password: enteredPassword
    };
    props.onUpdateAccount(accountData)
  }

  return (
    <div >
      <form className={`flex flex-col justify-center items-center`} onSubmit={submitHandler}>

        <div className={`mt-8 mb-4`}>
          <input type="text" required id="first" ref={firstNameInputRef} placeholder="first name" className={`w-96 pb-2 pt-2 pl-2 just-another-hand text-3xl text-black placeholder:text-black placeholder:text-3xl border-2  border-solid border-red-800 rounded-sm shadow-md font-sans focus:outline-none focus:border-blue-500`}/>
        </div>

        <div className={`mb-4`}>
          <input type="text" required id="last" ref={lastNameInputRef} placeholder="last name" className={`w-96 pb-2 pt-2 pl-2 just-another-hand text-3xl text-black placeholder:text-black placeholder:text-3xl border-2  border-solid border-red-800 rounded-sm shadow-md font-sans focus:outline-none focus:border-blue-500`}/>
        </div>

        <div className={`mb-4`}>
          <input type="email" required id="email" ref={emailInputRef} placeholder="email" className={`w-96 pb-2 pt-2 pl-2 just-another-hand text-3xl text-black placeholder:text-black placeholder:text-3xl border-2  border-solid border-red-800 rounded-sm shadow-md font-sans focus:outline-none focus:border-blue-500`}/>
        </div>

        <div className={`mb-4`}>
          <input type="password" required id="password" ref={passwordInputRef} placeholder="password" className={`w-96 pb-2 pt-2 pl-2 just-another-hand text-3xl text-black placeholder:text-black placeholder:text-3xl border-2  border-solid border-red-800 rounded-sm shadow-md font-sans focus:outline-none focus:border-blue-500`}/>
        </div>

        <div className={`mb-12`}>
          <input type="password" required id="password" ref={confirmPasswordRef} placeholder="re-enter password" className={`w-96 pb-2 pt-2 pl-2 just-another-hand text-3xl text-black placeholder:text-black placeholder:text-3xl border-2  border-solid border-red-800 rounded-sm shadow-md font-sans focus:outline-none focus:border-blue-500`}/>
        </div>
        <div>
        <button className={`px-12 py-.5 just-another-hand  bg-[#780000] text-[#CFCFCF] text-4xl rounded-3xl active:opacity-80`}>
          update
        </button>
      </div>
      </form>
    </div>
  )
}

export default UpdateAccountForm
