
let div = document.querySelector('div');
let computedStyle = getComputedStyle(div);
console.log("computedStyle.width:", computedStyle.width);


function showCircle(radius) {
    setTimeout(() => {
        div.style.width = radius * 2 + 'px';
        div.style.height = radius * 2 + 'px';
    }, 0);
     computedStyle = getComputedStyle(div);
    console.log("computedStyle.width:", computedStyle.width);
}

const handler_1 = () => {
    console.log("HANDLER_1");
    showCircle(250);
}
const handler_2 = () => {
    console.log("HANDLER_2");
    showCircle(10);
}


const handler = computedStyle.width === "20px" ? handler_1 : handler_2;

div.addEventListener("click", handler);
