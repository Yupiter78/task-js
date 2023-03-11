const log = console.log;

const color = document.getElementById("color");
log("color:", color);
log("color.style.backgroundColor:", color.style.backgroundColor);

changeColor = () => {
    if (color.style.backgroundColor === "red" || color.style.backgroundColor === "") {
        return "blue";
    } else if (color.style.backgroundColor === "blue") {
        return "red";
    }
};

color.onclick = function() {
    log("CLICK");
    log("color.style.backgroundColor:", color.style.backgroundColor);
    this.style.backgroundColor = changeColor();
    log("changeColor():", changeColor());
};