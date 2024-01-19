document.addEventListener("DOMContentLoaded", function () {
    let isRunning = false;
    let timerInterval;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let lapTimes = [];

    const timeDisplay = document.querySelector(".time");
    const startButton = document.getElementById("button1");
    const resetButton = document.getElementById("button3");
    const pauseButton = document.getElementById("button2");
    const lapButton = document.getElementById("button4");
    const lapContainer = document.querySelector(".container");

    function updateDisplay() {
        timeDisplay.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
    }

    function formatTime(value) {
        return value < 10 ? "0" + value : value;
    }

    startButton.addEventListener("click", function () {
        if (!isRunning) {
            isRunning = true;
            timerInterval = setInterval(function () {
                seconds++;
                if (seconds === 60) {
                    seconds = 0;
                    minutes++;
                }
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
                updateDisplay();
            }, 1000);
        }
    });

    pauseButton.addEventListener("click", function () {
        if (isRunning) {
            isRunning = false;
            clearInterval(timerInterval);
        }
    });

    resetButton.addEventListener("click", function () {
        isRunning = false;
        clearInterval(timerInterval);
        seconds = 0;
        minutes = 0;
        hours = 0;
        updateDisplay();
    });

    lapButton.addEventListener("click", function () {
        if (isRunning) {
            lapTimes.push({
                hours: hours,
                minutes: minutes,
                seconds: seconds
            });
            displayLapTimes();
        }
    });

    function displayLapTimes() {
        lapContainer.innerHTML = "";

        lapTimes.forEach(function (lap, index) {
            const lapTimeElement = document.createElement("div");
            lapTimeElement.textContent = `Lap ${index + 1}: ${formatTime(lap.hours)}:${formatTime(lap.minutes)}:${formatTime(lap.seconds)}`;
            lapContainer.appendChild(lapTimeElement);
        });
    }
});
