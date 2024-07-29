
// Initializing & Declaring Variables
const date = document.getElementById("date");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const clockStatus = document.getElementById("status");
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
    let st = "AM";

    if (hr === 0) {
        hr = 12;
        st = "AM";
    } else if (hr >= 12) {
        st = "PM";
        if (hr > 12) {
            hr -= 12;
        }

    }
    const time = [hr, min, sec].map(el => el < 10 ? `0${el}` : el); // Adding zero if less than 10

    hours.innerHTML = time[0];
    minutes.innerHTML = time[1];
    seconds.innerText = time[2];
    clockStatus.innerHTML = st;

    date.innerHTML = gettingDate();
    playAudio() // Playing Audio Sound
}
setInterval(gettingTime, 1000); // Calling after every 1 second to get Updated time

