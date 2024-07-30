// Declaration & Initialization of Variables
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("#buttons button");
const audio = document.createElement("audio");


// Playing Audio
const playAudio = () => {
    audio.src = "./audio/click.mp3";
    audio.currentTime = 0;
    audio.play();
}

// Calculating (Main Function)
const calculate = () => {
    try {
        let exp = display.innerHTML;
        exp = exp.replaceAll("×", "*");
        exp = exp.replaceAll("÷", "/");
        exp = exp.replaceAll("−", "-"); // Replacing "-" because it is &#8722;

        display.innerHTML = eval(exp);

    } catch (e) {
        console.log(e);
        display.innerHTML = "Invalid Input";
    }
}

// Displaying Number
const displayNumber = (value) => {
    if (value === "AC") {
        value = "";
        display.innerHTML = "";
    }
    if (value === "Del") {
        value = "";
        if (display.innerHTML.includes("Invalid Input")) {
            display.innerHTML = "";
        }
        display.innerHTML = display.innerHTML.slice(0, -1);
    }
    if (value === "=") {
        value = "";
        if (display.innerHTML.trim()) {
            calculate();
        }
    }
    display.innerHTML += value;
}

// Actions on Button Click
for (let btn of buttons) {
    btn.addEventListener("click", (e) => {
        displayNumber(e.currentTarget.innerHTML);
    });
    btn.addEventListener("mousedown", (e) => {
        playAudio();
        btnDownAnim(e.currentTarget);
    });
    btn.addEventListener("mouseup", (e) => {
        btnUpAnim(e.currentTarget);
    });
}

function btnDownAnim(btn) {
    btn.style.transform = "scale(.95)";
}
function btnUpAnim(btn) {
    btn.style.transform = "scale(1)";
}
