class Timer {
    constructor(name, minutes, clr) {
        this.name = name;
        this.minutes = minutes;
        this.running = false;
        this.bgColor = clr;
    }
}
const pomodoro = new Timer("Pomodoro", "01", "#BA4949");
const shortBreak = new Timer("Short Break", "05", "#38858A");
const longBreak = new Timer("Long Break", "15", "#397097");

const buttons = document.querySelectorAll(".buttons button");
const startBtn = document.querySelector("#startBtn");
const timer = document.querySelector("#timer");
const addTaskBtn = document.querySelector("#addTaskBtn");
const tasks = document.querySelector(".tasks");
const taskInputBox = document.querySelector("#taskInputBox");

let chButtons = document.querySelectorAll("input[type=checkbox]");
let tLabel = document.querySelector(".task label");
const audio = document.createElement("audio");


// Playing Audio
const playAudio = () => {
    audio.src = "./audio/alarm.mp3";
    audio.currentTime = 0;
    audio.play();
}


// Timer Setter Function
function defaultTimer(timerName) {
    if (timerName === pomodoro.name) {
        document.querySelector("main").style.backgroundColor = pomodoro.bgColor;
        startBtn.style.color = pomodoro.bgColor;
        timer.innerHTML = `${pomodoro.minutes}:00`;
        return pomodoro;
    } else if (timerName === shortBreak.name) {
        document.querySelector("main").style.backgroundColor = shortBreak.bgColor;
        startBtn.style.color = shortBreak.bgColor;
        timer.innerHTML = `${shortBreak.minutes}:00`;
        return shortBreak;
    } else if (timerName === longBreak.name) {
        document.querySelector("main").style.backgroundColor = longBreak.bgColor;
        startBtn.style.color = longBreak.bgColor;
        timer.innerHTML = `${longBreak.minutes}:00`;
        return longBreak;
    }
}

// Setting Default Timer
let currentObj = defaultTimer("Pomodoro");

// Start Timer Function, Run Whent Start Button is Clicked
function startTimer(min, sec, currObj) {
    currentObj = currObj;
    let objArr = [pomodoro, shortBreak, longBreak];

    if (!currentObj.running) {
        let clock = setInterval(startClock, 1000);
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                clearInterval(clock);
                // Reseting Timer Minutes When Timer Button(Pomodoro, SHort Break, Long break) is Clicked
                for (const obj of objArr) {
                    if (obj.minutes < 1 || obj.minutes < 5 || obj.minutes < 15) {
                        pomodoro.minutes = "01";
                        shortBreak.minutes = "05";
                        longBreak.minutes = "15";
                    }
                }
            });
        });

        // Changing Current Timer running Status
        for (const obj of objArr) {
            if (obj === currObj) {
                obj.running = true;
            } else {
                obj.running = false;
            }

        }

        // Stoping Countdown Timer when it is already running (after clicking Start Button)
        if (startBtn.innerHTML.toUpperCase() === "START") {
            startBtn.addEventListener("click", () => {
                clearInterval(clock);
            });
        }


        // Crossing Task On Check Button Clicked after Start Button Clicked
        chButtons = document.querySelectorAll("input[type=checkbox]");
        for (const checkBtn of chButtons) {
            checkBtn.addEventListener("click", () => {
                if (checkBtn.checked && currentObj === pomodoro) {
                    clearInterval(clock);
                    startBtn.innerHTML = "START";
                    currentObj.running = false;
                    checkBtn.nextSibling.style.textDecoration = "line-through";
                } else {
                    checkBtn.nextSibling.style.textDecoration = "none";
                }
            });
        }

        let nextObj = false;

        // Coundown Clock Functionality
        function startClock() {
            if (sec > 0) {
                sec--;
            } else if (sec === 0) {
                if (min > 0) {
                    min--;
                    sec = 59;
                } else if (min === 0 && sec === 0) {
                    playAudio();
                    clearInterval(clock);
                    if (currentObj === pomodoro) {
                        defaultTimer("Short Break");
                        buttons[0].classList.remove("active");
                        buttons[1].classList.add("active");
                        buttons[2].classList.remove("active");
                        startBtn.innerHTML = "START";
                        nextObj = true;
                    }
                } else if (min == 0) {
                    sec = 59;
                }
            }

            currentObj.minutes = min < 10 ? "0" + min : min;
            let seconds = sec < 10 ? "0" + sec : sec;
            timer.innerHTML = `${currentObj.minutes}:${seconds}`;
            if (nextObj) {
                timer.innerHTML = `${shortBreak.minutes}:${seconds}`;
            }
        }
    }



}
buttons[0].classList.add("active"); // Setting Default Button to Active

// Timer Buttons Effect
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        startBtn.innerHTML = "Start";
        defaultTimer(btn.dataset.name);
        for (const b of buttons) {
            if (b === btn) {
                btn.classList.add("active");
            } else {
                b.classList.remove("active");
            }
        }
    });
});

// Start Timer On Start Button Clicked
startBtn.addEventListener("click", () => {
    let min = Number(timer.innerHTML.split(":")[0]);
    let sec = Number(timer.innerHTML.split(":")[1]);

    function getCurrentObj() {
        if (min === Number(pomodoro.minutes)) {
            return pomodoro;
        } else if (min === Number(shortBreak.minutes)) {
            return shortBreak;
        } else if (min === Number(longBreak.minutes)) {
            return longBreak;
        }
    }
    startTimer(min, sec, getCurrentObj());
    if (startBtn.innerHTML.toUpperCase() === "START") {
        startBtn.innerHTML = "PAUSE";
    } else {
        startBtn.innerHTML = "START";
        getCurrentObj().running = false;
    }

});

let index = 0; // Counting index to set id
// Creating & Adding Task On Add Button Clicked
addTaskBtn.addEventListener("click", () => {
    index++;
    const task = document.createElement("div");
    const formCheck = document.createElement("div");
    const taskInput = document.createElement("input");
    const taskLabel = document.createElement("label");

    task.classList.add("task");
    formCheck.classList.add("form-check");
    taskInput.classList.add("form-check-input");
    taskInput.id = `checkBtn${index}`;
    taskInput.type = "checkbox";
    taskLabel.classList.add("form-check-label");
    taskLabel.htmlFor = `checkBtn${index}`;


    formCheck.appendChild(taskInput);
    formCheck.appendChild(taskLabel);
    task.appendChild(formCheck);



    if (taskInputBox.value.trim()) {
        taskLabel.textContent = taskInputBox.value;
        tasks.appendChild(task);
        taskInputBox.value = "";
    }

    const checkButtons = document.querySelectorAll("input[type=checkbox]");

    crossTask(checkButtons);

});

// Crossing Task On Check Button Clicked
function crossTask(checkButtons) {
    for (const checkBtn of checkButtons) {
        checkBtn.addEventListener("click", () => {
            if (checkBtn.checked) {
                checkBtn.nextSibling.style.textDecoration = "line-through";

            } else {
                checkBtn.nextSibling.style.textDecoration = "none";

            }
        });
    }
}

// Effect of Start Button On Clicked
startBtn.addEventListener("mousedown", () => {
    startBtn.style.transform = "scale(.95)";
});
startBtn.addEventListener("mouseup", () => {
    startBtn.style.transform = "scale(1)";
});
