const answerInput   = document.getElementById('answerInput');
const loveForm      = document.getElementById('loveForm');
const customMessage = document.getElementById('customMessage');
const loveSong      = document.getElementById('loveSong');
const container     = document.querySelector('.container');
const yesBtn        = document.getElementById('yesButton');
const noBtn         = document.getElementById('noButton');

let noButtonClickCount = 0;
const maxNoClicks = 5;
let noInitialTimeout = null;
let noCountdownInterval = null;
let noFinalTimeout = null;
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

function send(ans) {
  answerInput.value = ans;
  loveForm.submit();
}

// YES button behavior
yesBtn.addEventListener('click', async () => {

  container.innerHTML = `
    <h1>Yay! I Love You Too! ❤</h1>
    <p class="success-message">Thank you for making me the happiest person! 🎉</p>
    <p class="custom-message">You just made my day! 🌈</p>
    <div class="hearts-celebration"></div>
  `;
  try {
    await loveSong.play();
    // Delay submission for 5 seconds (or full song duration)
    setTimeout(() => {
      send('yes');
    }, 5000); // You can adjust this to match song length
  } catch (error) {
    console.error("Error playing audio:", error);
    customMessage.textContent = "Oops! It seems the love song couldn't be played. 🎶";
    send('yes');
  }
});

// NO button dodging behavior
noBtn.addEventListener('click', e => {
  e.preventDefault();
  noButtonClickCount++;

  // Before max clicks: dodge
  if (noButtonClickCount < maxNoClicks) {
    // Scale buttons
    const scaleUp   = 1 + noButtonClickCount * 0.1;
    const scaleDown = Math.max(0.1, 1 - noButtonClickCount * 0.1);
    yesBtn.style.transform = `scale(${scaleUp})`;
    noBtn.style.transform  = `scale(${scaleDown})`;

    // Reposition No button
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'absolute';
    noBtn.style.left     = `${x}px`;
    noBtn.style.top      = `${y}px`;

    // Show playful message
    customMessage.textContent = messages[
      Math.floor(Math.random() * messages.length)
    ];

  } else {
    // On reaching max clicks: initial flash message
    noBtn.disabled = true;
    yesBtn.style.transform = `scale(1)`;
    customMessage.textContent = "Okay, I get it. You're a tough nut to crack! 😜";

    // Wait 5 seconds before starting countdown
    noInitialTimeout = setTimeout(() => {
      let countdown = 10;
      customMessage.textContent =
        `Welp, you leave me no choice… My tears start falling in 10 seconds. 😢 Please say “Yes” in ${countdown}…`;

      // Update countdown every second
      noCountdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          customMessage.textContent =
            `Welp, you leave me no choice… My tears start falling in ${countdown} seconds. 😢 Please say “Yes” in ${countdown}…`;
        } else {
          clearInterval(noCountdownInterval);
        }
      }, 1000);

      // After countdown, send 'no'
      noFinalTimeout = setTimeout(() => {
        send('no');
      }, (countdown + 1) * 1000);

    }, 5000);
  }
});
