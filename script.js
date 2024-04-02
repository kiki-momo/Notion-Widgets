
const timerDisplay = document.getElementById('timer-display');
const timeInput = document.getElementById('time-input');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');
const resetBtn = document.getElementById('reset-btn');
const endSound = document.getElementById('end-sound');

let intervalId;
let remainingTime;

function startTimer(duration) {
    clearInterval(intervalId);
    let startTime = Date.now();
    remainingTime = duration * 60; // Convert minutes to seconds

    intervalId = setInterval(() => {
        let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        let timeLeft = remainingTime - elapsedTime;
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            timerDisplay.textContent = '00:00:00';
            endSound.play();
            resetControls();
        } else {
            let hours = Math.floor(timeLeft / 3600);
            let minutes = Math.floor((timeLeft % 3600) / 60);
            let seconds = Math.floor(timeLeft % 60);
            timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(intervalId);
    let currentTime = timerDisplay.textContent.split(':');
    remainingTime = parseInt(currentTime[0]) * 3600 + parseInt(currentTime[1]) * 60 + parseInt(currentTime[2]);
    resumeBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

function resetControls() {
    pauseBtn.disabled = true;
    resumeBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    resetBtn.disabled = true;
    startBtn.disabled = false;
    timeInput.disabled = false;
    timeInput.value = '';
}

startBtn.addEventListener('click', () => {
    if (timeInput.value) {
        startTimer(timeInput.value);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        timeInput.disabled = true;
    }
});

pauseBtn.addEventListener('click', () => {
    pauseTimer();
    pauseBtn.disabled = true;
    resumeBtn.disabled = false;
});

resumeBtn.addEventListener('click', () => {
    startTimer(remainingTime / 60);
    resumeBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    pauseBtn.disabled = false;
});

resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    timerDisplay.textContent = '00:00:00';
    resetControls();
});
