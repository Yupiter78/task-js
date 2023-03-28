function showCircle(cx, cy, radius) {
    const div = document.createElement("div");
    div.classList.add("circle");
    div.style.width = "0px";
    div.style.height = "0px";
    document.body.append(div);

    div.style.left = cx + "px";
    div.style.top = cy + "px";

    setTimeout(() => {
        div.style.width = radius * 2 + "px";
        div.style.height = radius * 2 + "px";
    }, 0);

}

const button = document.createElement("button");
button.textContent = "showCircle(150, 150, 100)"
document.body.append(button);
button.onclick = () => showCircle(150, 150, 100);