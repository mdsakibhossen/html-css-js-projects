// Declaration & Initialization of Variables
const main = document.querySelector("main");
const colorCode = document.querySelector("#colorCode");
const changeBtn = document.querySelector("#changeBtn");
const copyBtn = document.querySelector("#copyBtn");
const closeBtn = document.querySelector("#closeBtn");
const buttons = document.querySelectorAll("button");
const showMsg = document.querySelector("#showMsg");
const hash = "#";
const hexaCode = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
let defColor = "#020231";

// Color Setter Function
const setColor = (color) => {
    colorCode.innerHTML = color;
    main.style.backgroundColor = color;
}
setColor(defColor); // Setting Default Color

// Generator Function of Color Code
const generateColor = () => {
    let color = "";
    for (let i = 0; i < 6; i++) {
        let indexNum = Math.round(Math.random() * (hexaCode.length - 1));
        color += hexaCode[indexNum];
    }
    return hash + color;

}

// Hide Copied Alert Message
const hideMsg = () => {
    showMsg.style.transform = "scale(0)";
    showMsg.style.opacity = "0";
}


// Changing Color On Button Click
changeBtn.addEventListener("click", () => {
    const color = generateColor();
    setColor(color);
    hideMsg();
});


// Button Active Animation
buttons.forEach(button => {
    button.addEventListener("mousedown", (e) => {
        e.target.classList.add("active");
    })
    button.addEventListener("mouseup", (e) => {
        e.target.classList.remove("active");
    })
})



// Copying Functionality
copyBtn.addEventListener("mousedown", () => {
    hideMsg();
});
copyBtn.addEventListener("mouseup", () => {
    navigator.clipboard.writeText(colorCode.textContent);
    showMsg.style.transform = "scale(1)";
    showMsg.style.opacity = "1";
});
closeBtn.addEventListener("click", () => {
    hideMsg();
});