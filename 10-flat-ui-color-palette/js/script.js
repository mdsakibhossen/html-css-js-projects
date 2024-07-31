const colorsObj = {
    "turquoise": "#1abc9c",
    "emerald": "#2ecc71",
    "peter river": "#3498db",
    "amethyst": "#9b59b6",
    "wet asphalt": "#34495e",
    "green sea": "#16a085",
    "nephritis": "#27ae60",
    "belize hole": "#2980b9",
    "wisteria": "#8e44ad",
    "midnight blue": "#2c3e50",
    "sun flower": "#f1c40f",
    "carrot": "#e67e22",
    "alizarin": "#e74c3c",
    "clouds": "#ecf0f1",
    "concrete": "#95a5a6",
    "orange": "#f39c12",
    "pumpkin": "#d35400",
    "pomegranate": "#c0392b",
    "silver": "#bdc3c7",
    "asbestos": "#7f8c8d",
    "beekeeper": "#f6e58d",
    "spiced nectarine": "#ffbe76",
    "pink glamour": "#ff7979",
    "june bud": "#badc58",
    "coastal breeze": "#dff9fb",
    "turbo": "#f9ca24",
    "quince jelly": "#f0932b",
    "carmine pink": "#eb4d4b",
    "pure apple": "#6ab04c",
    "hint of ice pack": "#c7ecee",
    "middle blue": "#7ed6df",
    "heliotrpoe": "#e056fd",
    "exodus fruit": "#686de0",
    "deep koamaru": "#30336b",
    "soaring eagle": "#95afc0",
    "greenland green": "#22a6b3",
    "steel pink": "#be2edd",
    "blurple": "#4834d4",
    "deep cove": "#130f40",
    "wizard grey": "#535c68",
}
const comments = ["paste me!", "right one!", "got it!", "will do!", "copied!"];

const colorPalette = document.querySelector("#colorPalette");
const overlay = document.querySelector("#overlay");
const comment = document.querySelector("#comment");
const hexColorCode = document.querySelector("#hexColorCode");
const soundBtn = document.querySelector("#soundBtn");


// Creating Audio element
const audio = new Audio("./audio/tone.mp3");

// Adding controls & src attributes
const playAudio = () => {
    audio.currentTime = 0;
    audio.play();
}

// Sound Button Effect (On Clicked)
soundBtn.addEventListener("click", () => {
    if (!audio.muted) {
        audio.muted = true;
        soundBtn.innerHTML = "Sound Off 🔇";
    } else {
        audio.muted = false;
        soundBtn.innerHTML = "Sound On 🔊";
    }
});

/* Creating & Adding Full Color Palette according to colorsObj passing as arguments By JS inside Color Palette Section(#colorPalette) */
const createcolorPalette = (colorsObj) => {

    for (let colorName in colorsObj) {
        // Creating Necessary Elements
        const colorBox = document.createElement("div");
        const colorCodeBox = document.createElement("span");
        const colorNameBox = document.createElement("span");
        const copyTextBox = document.createElement("span");

        // Adding Classes
        colorBox.classList.add("color-box");
        colorNameBox.classList.add("color-name-box");
        copyTextBox.classList.add("copy-text-box");

        // Adding Some Styles & Values
        colorCodeBox.innerHTML = colorsObj[colorName];
        // colorsObj[colorName]--> Color hexCode
        colorCodeBox.style.visibility = "hidden";
        colorBox.style.backgroundColor = colorsObj[colorName];
        colorCodeBox.textContent = colorsObj[colorName];
        colorNameBox.textContent = colorName;
        copyTextBox.textContent = "Copy";

        // Appending inside HTML Document
        colorBox.appendChild(colorCodeBox);
        colorBox.appendChild(colorNameBox);
        colorBox.appendChild(copyTextBox);
        colorPalette.appendChild(colorBox);

    }
}
// Calling createcolorPalette() Function
createcolorPalette(colorsObj);

/* Main Task: Copying Color Code, Sound Effect, Show Random Comments with Animation. */
const copyColorCode = () => {
    let colorBoxes = colorPalette.children;
    for (let colorBox of colorBoxes) {
        // When Color Box(#colorBox) is Clicked
        colorBox.addEventListener("click", (e) => {
            const ranNum = Math.round(Math.random() * (comments.length - 1));
            // Getting Color HexCode Value From #colorCodeBox
            let colorCode = e.currentTarget.children[0].innerHTML;

            // Coping
            navigator.clipboard.writeText(colorCode);

            // Playing Audio
            playAudio();

            // Animation, Color Code & Comments Show
            showOverlay(colorCode, ranNum)

            // Hiding Overlay after Color Code & Comment
            setTimeout(() => {
                overlay.style.visibility = "hidden";
            }, 800);

            // Hiding Hex Color Code & Comment Before Overlay
            setTimeout(hideColorCodeAndComment, 500);
        });
    }
}
// Calling copyColorCode() Function
copyColorCode();

// Hide Color Code & Comment
const hideColorCodeAndComment = ()=>{
    hexColorCode.style.opacity = "0";
    comment.style.opacity = "0";
    hexColorCode.style.transform = "scale(0.9)";
    comment.style.transform = "scale(0.9)";
    hexColorCode.style.transition = "all .3s ease";
    comment.style.transition = "all .3s ease";
}
// Overlay Showing Function
const showOverlay = (colorCode, ranNum)=>{
    overlay.style.visibility = "visible";
    overlay.style.backgroundColor = colorCode;
    hexColorCode.style.opacity = "1";
    comment.style.opacity = "1";
    hexColorCode.style.transform = "scale(1.5)";
    comment.style.transform = "scale(1.5)";
    hexColorCode.style.transition = "none";
    comment.style.transition = "none";
    comment.innerHTML = comments[ranNum];
    hexColorCode.innerHTML = colorCode;
}


