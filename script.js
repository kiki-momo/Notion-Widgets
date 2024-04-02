document.getElementById('startButton').addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value, 10) || 0;
    const minutes = parseInt(document.getElementById('minutes').value, 10) || 0;
    const totalTime = (hours * 60 + minutes) * 60 * 1000; // Total time in milliseconds

    if (totalTime <= 0) {
        alert('Please set a valid time for the task.');
        return;
    }

    const endTime = Date.now() + totalTime;
    const timerElement = document.getElementById('timer');
    const alarmSound = new Audio('alarm.mp3'); // Make sure to include an alarm.mp3 file in your repository

    const interval = setInterval(() => {
        const remainingTime = endTime - Date.now();
        if (remainingTime <= 0) {
            clearInterval(interval);
            timerElement.textContent = '00:00:00';
            alarmSound.play();
            alert('Task time is up!');
        } else {
            const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
            const seconds = Math.floor((remainingTime / 1000) % 60);
            timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
});

let interval;
let pausedTime = 0; // To track the remaining time when paused

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);

function startTimer() {
    // Initialization code from the previous version...
    clearInterval(interval); // Clear any existing intervals
    document.getElementById('pauseButton').style.display = 'inline'; // Show pause button
    // Modified timer code to account for pausedTime...
}

function pauseTimer() {
    clearInterval(interval); // Stop the timer
    document.getElementById('pauseButton').style.display = 'none'; // Hide pause button
    // Save remaining time to pausedTime or reset if already paused...
    const timerElement = document.getElementById('timer');
    const currentTime = timerElement.textContent.split(':');
    pausedTime = (parseInt(currentTime[0], 10) * 3600 + parseInt(currentTime[1], 10) * 60 + parseInt(currentTime[2], 10)) * 1000;
}

// Modify the existing timer code to resume from pausedTime if it's not 0
// And adjust the end time calculation based on pausedTime

