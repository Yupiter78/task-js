
// let div = document.querySelector('div');
//
// function showCircle() {
//     const computedStyle = getComputedStyle(div),
//     radius = computedStyle.width === "20px" ? 250 : 10;
//     div.style.width = radius * 2 + 'px';
//     div.style.height = radius * 2 + 'px';
// }

let div = document.querySelector('div'),
    isLarge = false;

function showCircle() {
    let radius = isLarge ? 10 : 250;
    div.style.width = radius * 2 + 'px';
    div.style.height = radius * 2 + 'px';
    isLarge = !isLarge;
}

div.addEventListener("click", showCircle);
