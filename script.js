const answerInput   = document.getElementById('answerInput');
const loveForm      = document.getElementById('loveForm');
const customMessage = document.getElementById('customMessage');
const loveSong      = document.getElementById('loveSong');
const container     = document.querySelector('.container');
const yesBtn        = document.getElementById('yesButton');
const noBtn         = document.getElementById('noButton');

function send(ans) {
  answerInput.value = ans;
  loveForm.submit();
}

// YES button
yesBtn.addEventListener('click', async () => {
  send('yes');
  container.innerHTML = `
    <h1>Yay! I Love You Too! ❤</h1>
    <p class="success-message">Thank you for making me the happiest person! 🎉</p>
    <p class="custom-message">You just made my day! 🌈</p>
    <div class="hearts-celebration"></div>
  `;
  try {
    await loveSong.play();
  } catch (error) {
    console.error("Error playing audio:", error);
    customMessage.textContent = "Oops! It seems the love song couldn't be played. 🎶";
  }
});

// NO button “dodging” behavior
let noButtonClickCount = 0;
const maxNoClicks = 5;
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

noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  noButtonClickCount++;

  // Scale Yes up and No down
  const scaleUp   = 1 + (noButtonClickCount * 0.1);
  const scaleDown = Math.max(0.1, 1 - (noButtonClickCount * 0.1));
  yesBtn.style.transform = `scale(${scaleUp})`;
  noBtn.style.transform  = `scale(${scaleDown})`;

  // Randomly reposition No button
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.position = 'absolute';
  noBtn.style.left     = `${x}px`;
  noBtn.style.top      = `${y}px`;

  // Show a playful message
  const randomIndex = Math.floor(Math.random() * messages.length);
  customMessage.textContent = messages[randomIndex];

  // After max clicks, actually accept “no” once more
  if (noButtonClickCount >= maxNoClicks) {
    send('no');
    noBtn.disabled = true;
    customMessage.textContent = "Okay, I get it. You're a tough nut to crack! 😜";
  }
});
