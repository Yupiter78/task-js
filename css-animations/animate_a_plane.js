const plane = document.querySelector("#flyJet");
console.log(plane);

plane.onclick = function () {
    this.onclick = null;

    this.style.width = "400px";
    this.style.height = "240px";
}