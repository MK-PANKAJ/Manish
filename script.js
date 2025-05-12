const answerInput   = document.getElementById('answerInput');
const loveForm      = document.getElementById('loveForm');
const customMessage = document.getElementById('customMessage');
const loveSong      = document.getElementById('loveSong');
const calmSong      = document.getElementById('calmSong'); // optional calm song for rejection
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
  clearTimeout(noInitialTimeout);
  clearInterval(noCountdownInterval);
  clearTimeout(noFinalTimeout);

  send('yes');

  await new Promise(resolve => setTimeout(resolve, 3000));
  
  container.innerHTML = `
    <h1>Yay! I Love You Too! 💘</h1>
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

// NO button dodging behavior
noBtn.addEventListener('click', e => {
  e.preventDefault();
  noButtonClickCount++;

  if (noButtonClickCount < maxNoClicks) {
    const scaleUp   = 1 + noButtonClickCount * 0.1;
    const scaleDown = Math.max(0.1, 1 - noButtonClickCount * 0.1);
    yesBtn.style.transform = `scale(${scaleUp})`;
    noBtn.style.transform  = `scale(${scaleDown})`;

    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'absolute';
    noBtn.style.left     = `${x}px`;
    noBtn.style.top      = `${y}px`;

    customMessage.textContent = messages[
      Math.floor(Math.random() * messages.length)
    ];

  } else {
    noBtn.disabled = true;
    noBtn.style.transform = `scale(0.1)`;
    yesBtn.style.transform = `scale(1)`;
    customMessage.textContent = "Okay, I get it. You're a tough nut to crack! 😜";

    noInitialTimeout = setTimeout(() => {
      let countdown = 10;
      customMessage.textContent =
        `Welp, you leave me no choice… My tears start falling in 10 seconds. 😢 Please say “Yes” in 10…`;

      noCountdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          customMessage.textContent =
            `Welp, you leave me no choice… My tears start falling in ${countdown} seconds. 😢 Please say “Yes” in ${countdown}…`;
        } else {
          clearInterval(noCountdownInterval);
        }
      }, 1000);

      noFinalTimeout = setTimeout(async () => {
        send('no');

        await new Promise(resolve => setTimeout(resolve, 3000));

        container.innerHTML = `
          <h1>It's Okay ❤️‍🩹</h1>
          <p class="rejection-message">Thank you for your honesty. I truly appreciate it. 🙏</p>
          <p class="custom-message">Wishing you happiness and love always. 🌟</p>
          <div class="calm-response"></div>
        `;
        try {
          await calmSong.play();
        } catch (error) {
          console.error("Error playing audio:", error);
          customMessage.textContent = "It's okay — music or not, life goes on beautifully. 🎵";
        }

      }, 11000); // 10s countdown + 1s buffer
    }, 2500);
  }
});
