
const log = console.log;
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`++++++Script load error for ${src}`));
    document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', (error, script) => {
    if (error) {
        log("error:", error);
    } else {
        log(`Cool, the script ${script.src} is loaded`);
        log( _ ); // _ is a function declared in the loaded script
    }

});

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', function(script) {

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', function(script) {

        loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', function(script) {
            // ...continue after all scripts are loaded
        });

    });

});