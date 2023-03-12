const log = console.log;

const color = document.getElementById("color");
log("color:", color);

const computedStyle = getComputedStyle(color);
log("computedStyle.fontSize:", computedStyle.fontSize);
log("computedStyle.backgroundColor:", computedStyle.backgroundColor);

changeColor = () => {
    if (computedStyle.backgroundColor === "rgb(0, 0, 255)" || computedStyle.backgroundColor === "rgb(240, 240, 240)") {
        return "red";
    } else if (computedStyle.backgroundColor === "rgb(255, 0, 0)") {
        return "blue";
    }
};
changeSize = () => computedStyle.fontSize === "36px" ? "13.3333px" : "36px";

color.onclick = function() {
    log("CLICK");
    log("computedStyle.backgroundColor:", computedStyle.backgroundColor);
    log("computedStyle.fontSize:", computedStyle.fontSize);
    this.style.backgroundColor = changeColor();
    this.style.fontSize = changeSize();
};