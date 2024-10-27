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

// Telegram Configuration
const TELEGRAM_BOT_TOKEN = '7855556264:AAFXkgWPbzLzboLNbkZau5rnInup1uRxoTs'; // Replace with your bot token
const TELEGRAM_CHAT_ID = '5179975368';     // Replace with your chat ID
const TELEGRAM_API_URL = `https://api.telegram.org/bot${7855556264:AAFXkgWPbzLzboLNbkZau5rnInup1uRxoTs}/sendMessage`;

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const customMessage = document.getElementById('customMessage');
const loveSong = document.getElementById('loveSong');
const container = document.querySelector('.container');

// Function to send Telegram notification
async function sendTelegramNotification(message) {
    try {
        const response = await fetch(TELEGRAM_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (response.ok) {
            console.log("Notification sent to Telegram!");
        } else {
            console.error("Failed to send Telegram notification:", response.statusText);
        }
    } catch (error) {
        console.error("Error sending Telegram notification:", error);
    }
}

yesButton.addEventListener('click', async () => {
    // Get current date and time
    const currentDate = new Date().toLocaleString();
    
    // Send notification to Telegram
    const notificationMessage = `
🎉 <b>Love Proposal Accepted!</b> 🎉
    
Time: ${currentDate}
Status: Accepted ✅
Message: Someone just said YES to the love proposal! 💝
`;

    await sendTelegramNotification(notificationMessage);

    // Show success message and play the song
    container.innerHTML = `
        <h1>Yay! I Love You Too! ❤️</h1>
        <p class="success-message">Thank you for making me the happiest person! 🎉</p>
        <p class="custom-message">You just made my day! 🌈</p>
        <div class="hearts-celebration"></div>
    `;

    try {
        await loveSong.play();
    } catch (error) {
        console.error("Error playing audio:", error);
    }
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
    noButton.style.position = 'absolute';
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
