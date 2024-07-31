// Declaration & Initialization of Variables
const buttons = document.querySelectorAll(".key");
const text = document.querySelector(".text");
let isCaps = false;
let isShift = false;
let shiftValue = 0;

// Create an Audio element
const audio = new Audio("./media/audio/a.mp3");

// Function to play the key press sound
const playAudio = () => {
    audio.currentTime = 0;
    audio.play();
}


// Show Letter On Display
const writeText = (keyValue) => {
    if (isShift || isCaps) {
        text.innerHTML += keyValue; // Capital Letter
    } else {
        text.innerHTML += keyValue.toLowerCase(); // Small Letter
    }
}

// Checking All Button Which is Clicked
for (let btn of buttons) {
    btn.addEventListener("click", () => {

        let keyValue = btn.dataset.key; // Default data-key value(Which is Uppercase)

        // isShift = true -> data-key value(Which is Uppercase) & isShift = false -> data-key2 value
        if (isShift) {
            keyValue = btn.dataset.key;
        } else {
            if (btn.dataset.key2) {
                keyValue = btn.dataset.key2;
            }
        }

        // Setting Other Buttons keyValue Manually
        switch (keyValue) {
            case 'tab':
                keyValue = "&#9;"
                break;
            case 'shift':
                isShift = !isShift;
                keyValue = ""
                break;
            case 'caps':
                isCaps = !isCaps;
                keyValue = ""
                break;
            case 'back':
                keyValue = ""
                text.innerHTML = text.innerHTML.slice(0, -1); // Last Value skipping Because slice endIndex Not Include
                break;
            case 'lt':
                keyValue = "&lt;"
                break;
            case 'gt':
                keyValue = "&gt;"
                break;
            case 'enter':
                keyValue = "\n"
                break;

            default:
                break;
        }

        // isCaps & isShift Background Changing
        if (isCaps) {
            document.querySelector("div[data-key=caps]").style.backgroundColor = "red";
        } else {
            document.querySelector("div[data-key=caps]").style.backgroundColor = "#0F172A";
        }
        if (isShift) {
            if (btn.dataset.shift === "left") {
                document.querySelector("div[data-shift=left]").style.backgroundColor = "red";
            }
            if (btn.dataset.shift === "right") {
                document.querySelector("div[data-shift=right]").style.backgroundColor = "red";
            }

        } else {
            document.querySelectorAll("div[data-key=shift]").forEach((shiftBtn) => {
                shiftBtn.style.backgroundColor = "#0F172A";
            })
        }


        writeText(keyValue); // Calling to show keyValue On Display
        playAudio(); // Playing Sound
        // Shift Button Color Reset
        if (btn.dataset.key !== "shift") {
            isShift = false;
            document.querySelectorAll("div[data-key=shift]").forEach((shiftBtn) => {
                shiftBtn.style.backgroundColor = "#0F172A";
            })

        }
    })

    // Button Background Color Animation
    btn.addEventListener("mousedown", () => {
        btn.style.backgroundColor = "red";
    })
    btn.addEventListener("mouseup", () => {
        btn.style.backgroundColor = "#0F172A";
    })
}