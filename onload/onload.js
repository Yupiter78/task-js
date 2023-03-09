const log = console.log;

const script = document.createElement("script");
// can load any script, from any domain
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js";
document.head.append(script);

// the script creates a variable "_"
script.onload = () => log("_.VERSION:", _.VERSION); // shows library version