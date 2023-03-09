const log = console.log;

const script = document.createElement("script");
script.src = "https://example.com/404.js"; // no such script
document.head.append(script);
script.onerror = function () {
        log("Error loading", this.src) // Error loading https://example.com/404.js
}
