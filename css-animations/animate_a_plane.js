const plane = document.querySelector("#flyJet");
console.log(plane);

// plane.onclick = function () {
//     this.onclick = null;
//
//     this.style.width = "400px";
//     this.style.height = "240px";
// }

const computedStyle = getComputedStyle(plane);
console.log("computedStyle.width:", computedStyle.width);
// const changeSize =  (width, height) => {
//     this.style.width = width * 10 + "px";
//     this.style.height = height * 10 + "px";
// }

plane.addEventListener("click", function () {
    this.style.width = computedStyle.width * 10 + "px";
    this.style.height = computedStyle.height * 10 + "px";
});