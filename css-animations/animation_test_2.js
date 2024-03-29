function go() {
    showCircle(150, 150, 100, div => {
        div.classList.add('message-ball');
        div.append("Hello, world!");
    });
}
function showCircle(cx, cy, radius, callback) {
    const div = document.createElement("div");
    div.style.width = "0px";
    div.style.height = "0px";
    div.style.left = cx + "px";
    div.style.top = cy + "px";
    div.className = "circle";
    document.body.append(div);

    setTimeout(() => {
        div.style.width = radius * 2 + "px";
        div.style.height = radius * 2 + "px";


        div.addEventListener("transitionend", function handler() {
                div.removeEventListener("transitionend", handler);
                callback(div);
        });
    }, 0);

}

const button = document.createElement("button");
button.textContent = "showCircle(150, 150, 100)"
document.body.append(button);
button.onclick = () => go();