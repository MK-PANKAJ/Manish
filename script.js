document.getElementById("yesButton").addEventListener("click", function() {
    document.getElementById("customMessage").innerText = "I knew it! ❤️";
    const loveSong = document.getElementById("loveSong");
    loveSong.play(); // Play the song
});

document.getElementById("noButton").addEventListener("mouseover", function() {
    const xMax = window.innerWidth - this.offsetWidth;
    const yMax = window.innerHeight - this.offsetHeight;
    
    // Smoothly move the button to a new random position
    this.style.transition = "all 0.5s ease"; // Add transition for smooth movement
    this.style.position = "absolute"; // Change position to absolute
    this.style.top = Math.floor(Math.random() * yMax) + "px";
    this.style.left = Math.floor(Math.random() * xMax) + "px";
});
