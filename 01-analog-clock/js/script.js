// Initializing & Declaring Variables
const date = document.getElementById("date");
const hours = document.querySelector(".clock span#hours");
const minutes = document.querySelector(".clock span#minutes");
const seconds = document.querySelector(".clock span#seconds");
const volumeBtn = document.querySelector("#volumeBtn");
const mute = document.querySelector("#mute");
const unMute = document.querySelector("#unMute");
let isSoundOn = false;

// Getting Date Function
const gettingDate = () => {
    const dateTime = new Date();
    let dd = dateTime.getDate();
    let mm = dateTime.getMonth() + 1;
    let yy = dateTime.getFullYear();
    const day = [dd, mm, yy].map(el => el < 10 ? `0${el}` : el); // Adding zero if less than 10
    return `${day[0]}-${day[1]}-${day[2]}`;
}
// Audio Functionality
const changeIcon = () => {
    if (isSoundOn) {
        unMute.style.display = "block";
        mute.style.display = "none";
    } else {
        mute.style.display = "block";
        unMute.style.display = "none";
    }
}
const playAudio = () => {
    const audio = document.createElement("audio")
    document.querySelector(".audio-box").appendChild(audio);
    audio.src = "./media/clock-ticking_C_major.wav"
    isSoundOn ? audio.play() : audio.pause();
}

volumeBtn.addEventListener("click", () => {
    isSoundOn = !isSoundOn;
    changeIcon();
})
// Getting Time Function
const gettingTime = () => {
    const dateTime = new Date();
    let hr = dateTime.getHours();
    let min = dateTime.getMinutes();
    let sec = dateTime.getSeconds();

    if (hr === 0) {
        hr = 12;
    } else if (hr >= 12) {
        if (hr > 12) {
            hr -= 12; // when 13, hr = 13-12 = 1
        }
    }

    hours.style.transform = `translateX(-50%) rotate(${hr * 30}deg)`;
    minutes.style.transform = `translateX(-50%) rotate(${min * 6}deg)`;
    seconds.style.transform = `translateX(-50%) rotate(${sec * 6}deg)`;

    /*
    // Notes:
        12 hr = 360 deg
        1 hr = 360/12 = 30 deg
        60 min = 360 deg
        1 min = 360/60 = 6 deg
     */
    date.innerHTML = gettingDate();
    playAudio() // Playing Audio Sound
}
setInterval(gettingTime, 1000); // Calling after every 1 second to get Updated time

