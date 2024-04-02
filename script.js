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
