// Declaration & Initialization of Variables
const msg = document.getElementById("msg");
const convertedMsg = document.getElementById("convertedMsg");
const convertMsg = document.getElementById("convertMsg");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const msgContainer = document.querySelector(".msg-container");
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Message Converter
const msgEncoDecoder = (msg) => {
    let encoDecodedMsg = "";
    const lowerCase = /^([a-z])$/;
    const upperCase = /^([A-Z])$/;

    for (let i = 0; i < msg.length; i++) {
        if (lowerCase.test(msg[i])) {
            encoDecodedMsg += alphabet[alphabet.length - 1 - alphabet.indexOf(msg[i])];
        } else if (upperCase.test(msg[i])) {
            encoDecodedMsg += alphabet[alphabet.length - 1 - alphabet.indexOf(msg[i].toLowerCase())].toUpperCase();
        } else {
            encoDecodedMsg += msg[i];
        }
    }
    return encoDecodedMsg;
}

// Action On Converted Button Clicked
convertMsg.addEventListener("click", () => {
    convertedMsg.value = msgEncoDecoder(msg.value);
});


// Copying Functionality
const createCopiedMsg = (copyMsg="Copied!!!") => {
    const div = document.createElement("div");
    div.innerHTML = copyMsg;
    div.className = "copied"
    return div;
}

const removeCopiedMsg = (el) => {
    setTimeout(() => {
        if (msgContainer.contains(el)) {
            msgContainer.removeChild(el);
        }
    }, 3000);
}
copyBtn.addEventListener("click", () => {
    let copiedMsg = createCopiedMsg("Please, Convert First..."); 
    if (convertedMsg.value) {
        navigator.clipboard.writeText(convertedMsg.value);
        copiedMsg = createCopiedMsg();
    }
    
    msgContainer.appendChild(copiedMsg);
    removeCopiedMsg(copiedMsg);
});


// Clear Functionality
clearBtn.addEventListener("click", () => {
    msg.value = "";
    convertedMsg.value = "";
    navigator.clipboard.writeText(convertedMsg.value);
});



