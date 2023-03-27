const circle = document.querySelector(".circle");
const button = document.querySelector("#button");

function showCircle(cx, cy, radius) {
    console.log("click");
    this.style.left = cx + "px";
    this.style.top = cy +"px";
    this.style.width = radius * 2 +"px";
    this.style.height = radius * 2 +"px";

    setTimeout(() => {
        const computedStyle = getComputedStyle(this);
        console.log("style:", {width: computedStyle.width, height: computedStyle.height});
    }, 2000);

}

button.onclick = () => showCircle.call(circle, 150, 150, 100);
