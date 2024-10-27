const messages = [
    "But think of all the fun we could have together! 🎉",
    "Are you sure? I make a great partner! 😄",
    "What if I promise to bring you coffee every morning? ☕",
    "You know you want to say yes! 😉",
    "Imagine all the adventures we could go on! 🌍",
    "I can be your biggest supporter! 💪",
    "What if I serenade you? 🎶",
    "You deserve someone who adores you! 💖",
    "We could have the most epic love story! 💕",
    "What if I give you my heart? ❤️"
];

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const customMessage = document.getElementById('customMessage');
const loveSong = document.getElementById('loveSong');

yesButton.addEventListener('click', () => {
    customMessage.textContent = "Yay! I'm so happy! 🎉";
    loveSong.play();
});

noButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    customMessage.textContent = messages[randomIndex];
});
