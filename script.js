const answer = document.getElementById('answer');
const form = document.getElementById('form');
const message = document.getElementById('message');

function send(ans) {
  answer.value = ans;
  form.submit();
}'!`;
}

// Core buttons
const yesBtn = document.getElementById('yesButton');
const noBtn = document.getElementById('noButton');

// Secondary elements for enhanced interaction
const customMessage = document.getElementById('customMessage');
const loveSong = document.getElementById('loveSong');
const container = document.querySelector('.container');

// Messages array for playful rejection responses
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

// Yes button behavior: submit form, celebrate, play song
yesBtn.addEventListener('click', async () => {
  send('yes');

  // Replace container content with success message
  container.innerHTML = `
    <h1>Yay! I Love You Too! ❤</h1>
    <p class=\"success-message\">Thank you for making me the happiest person! 🎉</p>
    <p class=\"custom-message\">You just made my day! 🌈</p>
    <div class=\"hearts-celebration\"></div>
  `;

  // Attempt to play love song
  try {
    await loveSong.play();
  } catch (error) {
    console.error("Error playing audio:", error);
    customMessage.textContent = "Oops! It seems the love song couldn't be played. 🎶";
  }
});

// No button behavior: dodge, message, shrink, disable if too many tries
enBtn.addEventListener('click', (e) => {
  e.preventDefault();
  send('no');
});

noBtn.addEventListener('click', () => {
  noButtonClickCount++;

  // Scale Yes up and No down
  const scaleUp = 1 + (noButtonClickCount * 0.1);
  const scaleDown = Math.max(0.1, 1 - (noButtonClickCount * 0.1));
  yesBtn.style.transform = scale(${scaleUp});
  noBtn.style.transform = scale(${scaleDown});

  // Randomly reposition No button
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.position = 'absolute';
  noBtn.style.top = ${y}px;
  noBtn.style.left = ${x}px;

  // Show a playful message
  const randomIndex = Math.floor(Math.random() * messages.length);
  customMessage.textContent = messages[randomIndex];

  // After max clicks, disable No
  if (noButtonClickCount >= maxNoClicks) {
    noBtn.disabled = true;
    noBtn.style.transform = scale(${scaleUp * 0.01});
    customMessage.textContent = "Okay, I get it. You're a tough nut to crack! 😜";
  }
});
