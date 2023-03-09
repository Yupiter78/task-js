const log = console.log;

const script = document.createElement("script");
// can load any script, from any domain
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js";
document.head.append(script);

// the script creates a variable "_"
script.onload = () => log("_.VERSION:", _.VERSION); // shows library version


const img = document.createElement('img');
img.src = "https://js.cx/clipart/train.gif"; // (*)

document.body.append(img);

img.onload = function() {
    log(`Image loaded, size ${img.width}x${img.height}`);
};

img.onerror = function() {
    log("Error occurred while loading image");
};