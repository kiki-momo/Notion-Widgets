let timerId;
let remainingTime = 0;

document.getElementById('start-btn').addEventListener('click', () => {
    const minutes = parseInt(document.getElementById('duration-input').value);
    if (!isNaN(minutes) && minutes > 0) {
        remainingTime = minutes * 60;
        updateDisplay();
        startTimer();
    }
});

document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);

function startTimer() {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateDisplay();
        } else {
            clearInterval(timerId);
            document.getElementById('alarm-sound').play();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
}

function resetTimer() {
    clearInterval(timerId);
    remainingTime = 0;
    updateDisplay();
}

function updateDisplay() {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    document.getElementById('time-display').textContent =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
