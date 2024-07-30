// Declaration & Initialization of Variables
const genPassBtn = document.getElementById("genPass");
const passwordBox = document.getElementById("passwordBox");
const cPasswordBox = document.getElementById("cPasswordBox");
const err = document.getElementById("err");
const showPassCheck = document.getElementById("showPassCheck");

let passwordLimit = genRanNum(8, 15);
const lowerAlphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let signs = ["@", "#", "$", "_", "&", "-", "+", "(", ")", "/", "\\", "*", '"', "'", ":", ";", "!", "?", "~", "", "|", "`", "•", "√", "π", "÷", "×", "¶", "∆", "£", "¢", "€", "¥", "^", "°", "=", "{", "}", "%", "©", "®", "™", "✓", "[", "]", "<", ">", " ", ",", "."];
const upperAlphabets = lowerAlphabets.map(lA => lA.toUpperCase());

let passStore = [...lowerAlphabets, ...upperAlphabets, ...numbers, ...signs];

// Generating Random Number
function genRanNum(minNum, maxNum) {
    while (true) {
        let ranNum = Math.round(Math.random() * maxNum);
        if ((ranNum > minNum) && (ranNum < maxNum)) {
            return ranNum;
        }
    }
}

// Setting Style in vaild & inValid Function
const setStyle = ({ box, color, wrongStyle, rightStyle }) => {
    box.style.outlineColor = color;
    box.style.color = color;
    box.parentElement.children[0].children[0].style.display = wrongStyle;
    box.parentElement.children[0].children[1].style.display = rightStyle;
}

// Checking isVaild (Valid Function)
const valid = (msg, box) => {
    err.innerHTML = msg;
    if (!Array.isArray(box)) {
        setStyle({ box, color: "yellowgreen", wrongStyle: "none", rightStyle: "block" });
    } else {
        for (let b of box) {
            setStyle({ box: b, color: "yellowgreen", wrongStyle: "none", rightStyle: "block" });
        }
    }

    return 1;
}


// Checking isInVaild (InValid Function)
const inValid = (msg, box) => {
    err.innerHTML = msg;
    if (!Array.isArray(box)) {
        setStyle({ box, color: "crimson", wrongStyle: "block", rightStyle: "none" });
    } else {
        for (let b of box) {
            setStyle({ box: b, color: "crimson", wrongStyle: "block", rightStyle: "none" });
        }
    }

    return 0;
}

// Validating Password
const passwordValidation = (password, currentObj) => {
    let msg = "";
    if (password === "") {
        msg = "Please Enter Your Password";
        return inValid(msg, currentObj);
    } else if ((password.length < 8) || (password.length > 15)) {
        msg = "Password should be 8 to 15 Characters";
        return inValid(msg, currentObj);
    } else {
        // Checking Some Conditions
        let passArr = password.split("");
        let haslowerCase = passArr.some(el => lowerAlphabets.includes(el));
        let hasUpperCase = passArr.some(el => upperAlphabets.includes(el));
        let hasNumbers = passArr.some(el => numbers.includes(el));
        let hasSigns = passArr.some(el => signs.includes(el));

        if (!haslowerCase) {
            msg = "Password should have at least One LowerCase Alphabet.";
            return inValid(msg, currentObj);
        } else if (!hasUpperCase) {
            msg = "Password should have at least One UpperCase Alphabet.";
            return inValid(msg, currentObj);
        } else if (!hasNumbers) {
            msg = "Password should have at least One Number.";
            return inValid(msg, currentObj);
        } else if (!hasSigns) {
            msg = "Password should have at least One Special Character.";
            return inValid(msg, currentObj);
        } else {
            msg = "";
            return valid(msg, currentObj);
        }
    }
}

// Generate Password On Generate Button Clicked
genPassBtn.addEventListener("click", () => {
    let password = "";
    let setPass = () => {
        for (let i = 0; i < passwordLimit; i++) {
            let ranIndex = Math.floor(Math.random() * passStore.length);
            password += passStore[ranIndex];
        }
        passwordBox.value = password;
        cPasswordBox.value = password;
    }

    // Using Loop to call the function untill it generates valid Password
    while (true) {
        if (!passwordValidation(password, [passwordBox, cPasswordBox])) {
            password = "";
            setPass();
        } else {
            break;
        }
    }
});

// Checking Validation when User Typing on Password Input
passwordBox.addEventListener("input", (e) => {
    password = passwordBox.value.trim();
    console.log(e.currentTarget);
    passwordValidation(password, e.currentTarget);
});

// Checking Validation when User Typing on Confirm Password Input
cPasswordBox.addEventListener("input", (e) => {
    let cPassword = cPasswordBox.value.trim();
    let password = passwordBox.value.trim();
    if (password !== cPassword) {
        msg = "Password doesn't Match";
        inValid(msg, e.currentTarget);
        cPasswordBox.style.outlineColor = "crimson";
    } else {
        msg = "";
        valid(msg, e.currentTarget);
        cPasswordBox.style.outlineColor = "yellowgreen";
    }
    /* *****This Code is Commented...Because it can be used another case. This code matches each input...***** */
    // for (let i = 0; i < cPassword.length; i++) {
    //     if (cPassword[i] !== password[i]) {
    //         msg = "Password doesn't Match";
    //         inValid(msg, e.currentTarget);
    //         cPasswordBox.style.outlineColor = "crimson";
    //     } else {
    //         msg = "";
    //         valid(msg, e.currentTarget);
    //         cPasswordBox.style.outlineColor = "yellowgreen";
    //     }
    // }
});

// Password Hide & Show Functionality
showPassCheck.addEventListener("click", () => {
    if (showPassCheck.checked) {
        passwordBox.type = "text";
        cPasswordBox.type = "text";
        showPassCheck.nextElementSibling.innerHTML = "Hide Password";

    } else {
        passwordBox.type = "password";
        cPasswordBox.type = "password";
        showPassCheck.nextElementSibling.innerHTML = "Show Password";
    }
});