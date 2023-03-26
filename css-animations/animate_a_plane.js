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


const handleChangeSize = function () {
    const changeSize = (width, height) => {
        console.log("this:", this);
        this.style.width = parseInt(width) * 10 + "px";
        this.style.height = parseInt(height) * 10 + "px";
    }
    changeSize(computedStyle.width, computedStyle.height);
    this.removeEventListener("click", handleChangeSize);

    function test() {
        changeSize();
    }
    test();
}

plane.addEventListener("click", handleChangeSize);