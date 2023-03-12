const log = console.log;

const color = document.getElementById("color");
log("color:", color);
log("window.getComputedStyle:", window.getComputedStyle(color));
log("color.style:", color.style);
log("color.style.backgroundColor:", color.style.backgroundColor);
log("color.style.fontSize:", color.style.font);

changeColor = () => {
    if (color.style.backgroundColor === "blue" || color.style.backgroundColor === "") {
        return "red";
    } else if (color.style.backgroundColor === "red") {
        return "blue";
    }
};

color.onclick = function() {
    log("CLICK");
    log("color.style.backgroundColor:", color.style.backgroundColor);
    log("color.style.fontSize:", color.style.fontSize);
    this.style.backgroundColor = changeColor();
    this.style.fontSize = "36px";
    log("changeColor():", changeColor());
};