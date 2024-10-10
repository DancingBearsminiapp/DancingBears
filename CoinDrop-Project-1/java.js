let mainBalance = parseFloat(localStorage.getItem('mainBalance')) || 0.00;
let miningProcessing = parseFloat(localStorage.getItem('miningProcessing')) || 0.0000;
const miningDuration = 3 * 60 * 60 + 30 * 60; // 4 hours and 20 minutes in seconds
let miningIncrement = parseFloat(localStorage.getItem('miningIncrement')) || 0.0001;
let miningStartTime = localStorage.getItem('miningStartTime') ? parseInt(localStorage.getItem('miningStartTime')) : null;
let remainingTime = miningDuration;

// Update displayed balances
document.getElementById('mainBalance').innerText = mainBalance.toFixed(2);
document.getElementById('miningProcessing').innerText = miningProcessing.toFixed(4);

// Calculate elapsed time and update the remaining time
function updateTimer() {
    if (miningStartTime) {
        let currentTime = Math.floor(Date.now() / 1000);  // Current time in seconds
        let elapsedTime = currentTime - miningStartTime;  // Calculate time passed

        // Update remaining time based on elapsed time
        if (elapsedTime < miningDuration) {
            remainingTime = miningDuration - elapsedTime;  // Update remaining time
            let elapsedMiningPoints = (elapsedTime / miningDuration) * miningIncrement; // Calculate points based on elapsed time
            miningProcessing += elapsedMiningPoints; // Increment mining processing
            document.getElementById('miningProcessing').innerText = miningProcessing.toFixed(4);
            localStorage.setItem('miningProcessing', miningProcessing); // Save updated progress
        } else {
            remainingTime = 0;
            document.getElementById('claimBtn').style.display = 'block';  // Show claim button when time is up
        }
    }
    updateTimeDisplay(remainingTime);
}

// Start the countdown timer
function startTimer() {
    const timerInterval = setInterval(() => {
        updateTimer();
        if (remainingTime <= 0) {
            clearInterval(timerInterval);  // Stop the timer when time is up
        }
    }, 1000);
}

// Start mining process
function startMining() {
    miningStartTime = Math.floor(Date.now() / 1000);  // Save the current start time
    localStorage.setItem('miningStartTime', miningStartTime);

    startTimer();  // Start countdown
}

// Update time display function
function updateTimeDisplay(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;
    document.getElementById('timeLeft').innerText =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Handle button clicks
document.getElementById('startBtn').onclick = function () {
    startMining();
    this.style.display = 'none';  // Hide start button after starting
};

document.getElementById('claimBtn').onclick = function () {
    mainBalance += miningProcessing;  // Add mined points to main balance
    document.getElementById('mainBalance').innerText = mainBalance.toFixed(2);
    localStorage.setItem('mainBalance', mainBalance);  // Save balance in local storage

    miningProcessing = 0.0000;  // Reset mining processing
    document.getElementById('miningProcessing').innerText = miningProcessing.toFixed(4);
    localStorage.setItem('miningProcessing', miningProcessing);
    localStorage.removeItem('miningStartTime');  // Reset mining start time after claim

    this.style.display = 'none';  // Hide claim button
    document.getElementById('startBtn').style.display = 'block';  // Show start button again
};

// Resume mining if it was started before
if (miningStartTime) {
    updateTimer();  // Continue the timer from where it left off
    if (remainingTime > 0) {
        startTimer();  // Resume the countdown
        document.getElementById('startBtn').style.display = 'none';  // Hide start button if mining in progress
    }
}

// Update mining power logic
document.getElementById('powerUpdateLink').onclick = function () {
    miningIncrement += 0.0001;  // Example: increase power
    localStorage.setItem('miningIncrement', miningIncrement);  // Save updated mining power
};

////////////////////////////////////////////


 // Redirect to another page after 10 seconds
 setTimeout(function() {
    document.querySelector('.loader-container').style.display = 'none';
    document.querySelector('.main-content').style.display = 'block'; // Change this to your target URL
  }, 10000); // 10 seconds


  const muteBtn = document.getElementById('mute-btn');
        const music = document.getElementById('background-music');
        const volumeSlider = document.getElementById('volume-slider');

        // Mute button functionality
        muteBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                muteBtn.textContent = 'Mute';
            } else {
                music.pause();
                muteBtn.textContent = 'Play';
            }
        });

        // Volume slider functionality
        volumeSlider.addEventListener('input', () => {
            music.volume = volumeSlider.value;
        });