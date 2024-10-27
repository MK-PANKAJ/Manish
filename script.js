document.getElementById("yesButton").addEventListener("click", function() {
    document.getElementById("customMessage").innerText = "I knew it! ❤️";
    document.getElementById("loveSong").play();
});

document.getElementById("noButton").addEventListener("mouseover", function() {
    this.style.position = "absolute";
    this.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
    this.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
});
