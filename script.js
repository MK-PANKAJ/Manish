const messages = [
    "Are you absolutely sure? 🥺",
    "Pretty please? 💝",
    "Don't break my heart! 💔",
    "I'll make you the happiest! 🌟",
    "Think again, sweetie! 💭",
    "You're making me sad... 😢",
    "Give love a chance! 💑",
    "I promise to love you forever! 💕",
    "We could be perfect together! ✨",
    "Just say yes already! 🎀"
];

let noButtonClickCount = 0;
const maxNoClicks = 5;

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const customMessage = document.getElementById('customMessage');
const loveSong = document.getElementById('loveSong');
const container = document.querySelector('.container'); // Ensure the container is selected

yesButton.addEventListener('click', async () => {
    // Notify administrator via GitHub webhook
    const response = await fetch('https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO_NAME/dispatches', {
        method: 'POST',
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': 'token YOUR_GITHUB_TOKEN', // Use a personal access token
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event_type: 'user_clicked_yes',
            client_payload: {
                message: 'User  clicked Yes on the love proposal!'
            }
        })
    });

    if (response.ok) {
        console.log("Notification sent to GitHub!");
    } else {
        console.error("Failed to send notification to GitHub:", response.statusText);
    }

    // Show success message and play the song
    container.innerHTML = `
        <h1>Yay! I Love You Too! ❤️</h1>
        <p class="success-message">Thank you for making me the happiest person! 🎉</p>
        <p class="custom-message">You just made my day! 🌈</p>
        <div class="hearts-celebration"></div>
    `;
    loveSong.play();
});

noButton.addEventListener('click', () => {
    noButtonClickCount++;
    
    // Make the Yes button bigger and No button smaller
    const scale = 1 + (noButtonClickCount * 0.1);
    yesButton.style.transform = `scale(${scale})`;
    noButton.style.transform = `scale(${1 - (noButtonClickCount * 0.1)})`;
    
    // Move the No button to a random position
    const x = Math.random() * (window.innerWidth - noButton.offsetWidth);
    const y = Math.random() * (window.innerHeight - noButton.offsetHeight);
    noButton.style.top = `${y}px`;
    noButton.style.left = `${x}px`;
    
    // Show a random message
    const randomIndex = Math.floor(Math.random() * messages.length);
    customMessage.textContent = messages[randomIndex];
    
    // If the user clicks No 5 times, show a special message
    if (noButtonClickCount >= maxNoClicks) {
        customMessage.textContent = "Okay, I get it. You're a tough nut to crack! 😜";
    }
});
