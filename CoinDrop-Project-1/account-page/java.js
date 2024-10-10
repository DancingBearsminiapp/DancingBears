
const saveButton = document.getElementById('save-btn');
const usernameInput = document.getElementById('username-input');
const usernameDisplay = document.getElementById('username-display');

// Check if username has already been set (using localStorage to store it)
if (localStorage.getItem('username')) {
    // If username is already set, display it and disable the input
    usernameDisplay.textContent = localStorage.getItem('username');
    usernameInput.value = localStorage.getItem('username');
    usernameInput.disabled = true;
    saveButton.disabled = true;
}

// Function to save the username
saveButton.addEventListener('click', function() {
    const username = usernameInput.value.trim();
    if (username) {
        // Save username to localStorage so it persists
        localStorage.setItem('username', username);

        // Display the username and disable the input and button
        usernameDisplay.textContent = username;
        usernameInput.disabled = true;
        saveButton.disabled = true;
    }
});

/////////////////////////////////////////////////////////////

 // Function to save and display the selected wallet
 function saveWallet() {
    var walletName = document.getElementById("wallet").value;

    // Check if input is not empty
    if (walletName.trim() !== "") {
        // Save the wallet name to localStorage
        localStorage.setItem("savedWallet", walletName);
        
        // Update the displayed wallet name
        document.getElementById("display-wallet").innerText = walletName;
    } else {
    }
}

// Function to load the saved wallet name on page load
function loadWallet() {
    var savedWallet = localStorage.getItem("savedWallet");
    
    // Check if there is a saved wallet name
    if (savedWallet) {
        document.getElementById("display-wallet").innerText = savedWallet;
    }
}

// Load the wallet name when the page loads
window.onload = loadWallet;
