let tasks = [
    { text: "X - Twitter Follow ", isClaimed: false, isHidden: false, link: "https://x.com/DancingBears_oi?t=rfXSsMYJCk_lglTdJpku3g&s=09" },
    { text: "Youtube Subscribe", isClaimed: false, isHidden: false, link: "https://youtube.com/@coindrop-bot?si=vqmdhH3vZIRYaP4n" },
    { text: "Join Our Community Telegram", isClaimed: false, isHidden: false, link: "https://t.me/DancingBearsCommunity" },
    { text: "Youtube Videos Watch", isClaimed: false, isHidden: false, link: "https://youtu.be/-ZCDHsthNMQ?si=NvLDDryoXZqrrFnA" },
    { text: "MAJOR Bot Join us", isClaimed: false, isHidden: false, link: "https://t.me/major/start?startapp=5871495451" },
    { text: "Blum Bot Join us ", isClaimed: false, isHidden: false, link: "https://t.me/blum/app?startapp=ref_BzrEQ6OQyy" },
    { text: "Boinker Bot join us", isClaimed: false, isHidden: false, link: "https://t.me/boinker_bot/boinkapp?startapp=boink5871495451" },
];

let currentClaimIndex = null;
let mainBalance = 0;
let messageDisplay = "";
let messageTimeout = null;

// Load points and tasks from local storage
function loadPoints() {
    const storedPoints = localStorage.getItem('mainBalance');
    if (storedPoints) {
        mainBalance = parseInt(storedPoints);
    }

    // Load hidden task states
    tasks.forEach((task, index) => {
        const isHidden = localStorage.getItem(`taskHidden_${index}`);
        if (isHidden === 'true') {
            task.isHidden = true;
        }
    });
}

function savePoints() {
    localStorage.setItem('mainBalance', mainBalance.toString());
}

function saveTaskHiddenState() {
    tasks.forEach((task, index) => {
        localStorage.setItem(`taskHidden_${index}`, task.isHidden);
    });
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        if (!task.isHidden) {
            const li = document.createElement('li');

            li.innerHTML = `
                ${task.text}
                <div class="task-buttons">
                    <button class="red-button" onclick="openPage(${index})">Get</button>
                    ${currentClaimIndex === index ? `<button class="red-button" onclick="claimPoints(${index})">Claim</button>` : ''}
                </div>
            `;

            taskList.appendChild(li);
        }
    });

    const pointsDisplay = document.getElementById('pointsDisplay');
    pointsDisplay.innerText = `$BearCoin ${mainBalance}`;

    const messageDisplayElement = document.getElementById('messageDisplay');
    messageDisplayElement.innerText = messageDisplay;
}

function openPage(index) {
    window.open(tasks[index].link, '_blank');

    setTimeout(() => {
        currentClaimIndex = index;
        displayTasks();
    }, 10000); // 10 seconds delay
}

function claimPoints(index) {
    mainBalance += 1.0;

    messageDisplay = `You claimed $BearCoin for: "${tasks[index].text}". Total $BearCoin: ${mainBalance}`;
    displayTasks();

    tasks[index].isHidden = true; // Mark the task as hidden
    savePoints();
    saveTaskHiddenState(); // Save the hidden state of tasks
    displayTasks();

    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
        messageDisplay = "";
        displayTasks();
    }, 10000); // Hide message after 10 seconds

    // Set a timeout to show the task again after 24 hours
    setTimeout(() => {
        tasks[index].isHidden = false; // Reset the hidden status
        currentClaimIndex = null; // Reset the claimed task index
        saveTaskHiddenState(); // Save the hidden state of tasks
        displayTasks(); // Re-display tasks to show the task again
    }, 86400000); // Reappear after 24 hours
}

// Load initial points and task states from local storage
loadPoints();
displayTasks();
