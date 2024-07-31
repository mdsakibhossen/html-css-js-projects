// Timer class definition
class Timer {
    constructor(name, minutes, clr) {
        this.name = name;            // Name of the timer (e.g., "Pomodoro", "Short Break", etc.)
        this.minutes = parseInt(minutes); // Duration of the timer in minutes
        this.running = false;        // Timer running status
        this.bgColor = clr;          // Background color associated with the timer
    }
}

// Instantiate Timer objects
const pomodoro = new Timer("Pomodoro", 1, "#BA4949");
const shortBreak = new Timer("Short Break", 5, "#38858A");
const longBreak = new Timer("Long Break", 15, "#397097");

// Select DOM elements
const buttons = document.querySelectorAll(".buttons button");
const startBtn = document.querySelector("#startBtn");
const timer = document.querySelector("#timer");
const addTaskBtn = document.querySelector("#addTaskBtn");
const tasks = document.querySelector(".tasks");
const taskInputBox = document.querySelector("#taskInputBox");

// Create an audio element for the alarm
const audio = new Audio("./audio/alarm.mp3");

// Function to play the alarm sound
const playAudio = () => {
    audio.currentTime = 0;
    audio.play();
}

// Function to set the default timer based on the timer's name
const defaultTimer = (timerName) => {
    let timerObj;
    switch (timerName) {
        case pomodoro.name:
            timerObj = pomodoro;
            break;
        case shortBreak.name:
            timerObj = shortBreak;
            break;
        case longBreak.name:
            timerObj = longBreak;
            break;
    }
    document.querySelector("main").style.backgroundColor = timerObj.bgColor;
    startBtn.style.color = timerObj.bgColor;
    timer.innerHTML = `${timerObj.minutes.toString().padStart(2, '0')}:00`;
    return timerObj;
}

// Initialize the current timer to Pomodoro
let currentObj = defaultTimer("Pomodoro");

// Function to start the timer
const startTimer = (min, sec, currObj) => {
    currentObj = currObj;
    let objArr = [pomodoro, shortBreak, longBreak];

    // If the timer is not already running
    if (!currentObj.running) {
        let clock = setInterval(startClock, 1000); // Set interval for the countdown

        // Event listeners for timer buttons
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                clearInterval(clock);
                resetTimers();
            });
        });

        // Update the running status of each timer object
        objArr.forEach(obj => {
            obj.running = (obj === currObj);
        });

        // Event listener for the start button to stop the timer
        if (startBtn.innerHTML.toUpperCase() === "START") {
            startBtn.addEventListener("click", () => clearInterval(clock));
        }

        // Event listeners for task checkboxes
        let checkButtons = document.querySelectorAll("input[type=checkbox]");
        checkButtons.forEach(checkBtn => {
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
        });

        let nextObj = false;

        // Function for the countdown clock
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
                        nextObj = true;
                        switchToNextTimer(shortBreak);
                    }
                }
            }

            updateTimerDisplay(min, sec, nextObj);
        }
    }
}

// Function to reset timers to their default values
const resetTimers = () => {
    pomodoro.minutes = 1;
    shortBreak.minutes = 5;
    longBreak.minutes = 15;
}

// Function to switch to the next timer
const switchToNextTimer = (nextTimer) => {
    defaultTimer(nextTimer.name);
    buttons.forEach((btn, index) => {
        btn.classList.toggle("active", index === 1);
    });
    startBtn.innerHTML = "START";
}

// Function to update the timer display
const updateTimerDisplay = (min, sec, nextObj) => {
    currentObj.minutes = min;
    timer.innerHTML = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    if (nextObj) {
        timer.innerHTML = `${shortBreak.minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
}

// Set the default active button to Pomodoro
buttons[0].classList.add("active");

// Event listeners for timer buttons to switch timers
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        startBtn.innerHTML = "Start";
        defaultTimer(btn.dataset.name);
        buttons.forEach(b => b.classList.toggle("active", b === btn));
    });
});

// Event listener for the start button to start or pause the timer
startBtn.addEventListener("click", () => {
    let [min, sec] = timer.innerHTML.split(":").map(Number);

    const getCurrentObj = () => {
        switch (min) {
            case pomodoro.minutes: return pomodoro;
            case shortBreak.minutes: return shortBreak;
            case longBreak.minutes: return longBreak;
        }
    }

    startTimer(min, sec, getCurrentObj());
    startBtn.innerHTML = (startBtn.innerHTML.toUpperCase() === "START") ? "PAUSE" : "START";
    getCurrentObj().running = startBtn.innerHTML === "PAUSE";
});

let index = 0;
// Event listener for the add task button to create and add a new task
addTaskBtn.addEventListener("click", () => {
    if (taskInputBox.value.trim()) {
        index++;
        const task = document.createElement("div");
        task.classList.add("task");

        const formCheck = document.createElement("div");
        formCheck.classList.add("form-check");

        const taskInput = document.createElement("input");
        taskInput.classList.add("form-check-input");
        taskInput.type = "checkbox";
        taskInput.id = `checkBtn${index}`;

        const taskLabel = document.createElement("label");
        taskLabel.classList.add("form-check-label");
        taskLabel.htmlFor = `checkBtn${index}`;
        taskLabel.textContent = taskInputBox.value;

        formCheck.appendChild(taskInput);
        formCheck.appendChild(taskLabel);
        task.appendChild(formCheck);
        tasks.appendChild(task);

        taskInputBox.value = "";

        crossTask(taskInput);
    }
});

// Function to cross out a task when its checkbox is checked
const crossTask = (checkBtn) => {
    checkBtn.addEventListener("click", () => {
        checkBtn.nextSibling.style.textDecoration = checkBtn.checked ? "line-through" : "none";
    });
}

// Effects for the start button when pressed and released
startBtn.addEventListener("mousedown", () => {
    startBtn.style.transform = "scale(.95)";
});
startBtn.addEventListener("mouseup", () => {
    startBtn.style.transform = "scale(1)";
});
