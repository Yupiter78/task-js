
const log = console.log;
const url = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js';
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`++++++Script load error for ${src}`));
    document.head.append(script);
}

loadScript(url, (error, script) => {
    if (error) {
        log("error:", error);
    } else {
        log(`Cool, the script ${script.src} is loaded`);
        log( _ ); // _ is a function declared in the loaded script
    }

});

loadScript(url, function(script) {

    loadScript(url, function(script) {

        loadScript(url, function(script) {
            // ...continue after all scripts are loaded
        });

    });

});

const handleError = (error) => log("error:", error);

loadScript(url, function(error, script) {

    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript(url, function(error, script) {
            if (error) {
                handleError(error);
            } else {
                // ...
                loadScript(url, function(error, script) {
                    if (error) {
                        handleError(error);
                    } else {
                        // ...continue after all scripts are loaded (*)
                    }
                });

            }
        })
    }
});

// As calls become more nested, the code becomes deeper and increasingly
// more difficult to manage, especially if we have real code instead
// of ... that may include more loops, conditional statements and so on.
//
// That’s sometimes called “callback hell” or “pyramid of doom.”

// We can try to alleviate the problem by making every action a standalone function, like this:

loadScript(url, step1);

function step1(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript(url, step2);
    }
}

function step2(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript(url, step3);
    }
}

function step3(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...continue after all scripts are loaded (*)
    }
}