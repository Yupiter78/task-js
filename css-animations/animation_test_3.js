function go() {
    showCircle(150, 150, 100).then(div => {
        div.classList.add('message-ball');
        div.append("Hello, world!");
    });
}
function showCircle(cx, cy, radius) {
    const div = document.createElement("div");
        div.style.width = "0px";
        div.style.height = "0px";
        div.style.left = cx + "px";
        div.style.top = cy + "px";
        div.className = "circle";
        document.body.append(div);

    return new Promise((resolve) => {
        setTimeout(() => {
            div.style.width = radius * 2 + "px";
            div.style.height = radius * 2 + "px";


            div.addEventListener("transitionend", function handler() {
                div.removeEventListener("transitionend", handler);
                resolve(div);
            });
        }, 0);
    });
}

const button = document.createElement("button");
button.textContent = "showCircle_promise"
document.body.append(button);
button.onclick = () => go();