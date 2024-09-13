// password conditions
let lowercase = /[a-z]/;
let uppercase = /[A-Z]/;
let numbers = /[0-9]/;

export const newPasswordUI = () => {
    // password requirements to be met
    var newpass = document.getElementById("new-pass").value;
    var confnewpass = document.getElementById("conf-new-pass").value;
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

// New password validation function
export function passwordValidation(password,conf_password) { 
    // Test for uppercase, lowercase, number, length requirements, and if the confirmation password matches
    const hasUpper = uppercase.test(password);
    const hasLower = lowercase.test(password);
    const hasNumber = numbers.test(password);
    const minLengthReached = password.length >= 8 && password.length <= 32;
    const isMatched = password === conf_password;
    // Return's true only if all checks have been passed
    return hasUpper && hasLower && hasNumber && minLengthReached && isMatched;
}

export const togglePass = (showPassword, setShowPassword) => {
    setShowPassword(!showPassword);
}

