const log = console.log;

function loadScript(src, callback) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}

function loadScriptPromise(src) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement("script");
        script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));

        document.head.append(script);
    })
}

let promise = loadScriptPromise("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
    script => log(`${script.src} is loaded!`),
    error => log(`Error: ${error.message}`)
);

promise.then(script => log('Another handler...'));


function delay(ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
}

function delay_2(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => log('runs after 3 seconds'));
delay_2(4000).then(() => log('runs after 4 seconds'));