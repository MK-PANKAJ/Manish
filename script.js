document.getElementById("yesButton").addEventListener("click", function() {
    document.getElementById("customMessage").innerText = "I knew it! ❤️";
    document.getElementById("loveSong").play();
});

document.getElementById("noButton").addEventListener("mouseover", function() {
    const xMax = window.innerWidth - this.offsetWidth;
    const yMax = window.innerHeight - this.offsetHeight;
    this.style.position = "absolute";
    this.style.top = Math.floor(Math.random() * yMax) + "px";
    this.style.left = Math.floor(Math.random() * xMax) + "px";
});
