// password conditions
let lowercase = /[a-z]/;
let uppercase = /[A-Z]/;
let numbers = /[0-9]/;

const validations = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    numbers: /[0-9]/,
    length: (pass) => pass.length >=8 && pass.length <=32
}

const updateUI = (element, isValid) => {
    element.classList.toggle('valid', isValid);
    element.classList.toggle('invalid', !isValid);
}

export const newPasswordUI = () => {
    // password requirements to be met
    var newpass = document.getElementById("new-pass").value;
    var confnewpass = document.getElementById("conf-new-pass").value;

    // for updating ui
    const uiElements = {
        uc: document.getElementById("upper"),
        lc: document.getElementById("lower"),
        num: document.getElementById("number"),
        len: document.getElementById("length"),
        match: document.getElementById("match")
    };
    // Check each condition and update UI
    updateUI(uiElements.uc, validations.uppercase.test(newpass));
    updateUI(uiElements.lc, validations.lowercase.test(newpass));
    updateUI(uiElements.num, validations.numbers.test(newpass));
    updateUI(uiElements.len, validations.length(newpass));
    updateUI(uiElements.match, newpass === confnewpass && newpass.length > 0);
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

