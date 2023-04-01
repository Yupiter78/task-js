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

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

const displayUserProfile = (profile) => log(profile);
const displayLoggedOutProfilePage = () => log("Error");
const displayErrorMessage = (message) => log(message);

fetch("/api/user/profile") // Start the HTTP request
    .then(response => { // Call this when status and headers are ready
        if (!response.ok) { // If we got a 404 Not Found or similar error
            return null; // Maybe user is logged out; return null profile
        }
// Now check the headers to ensure that the server sent us JSON.
// If not, our server is broken, and this is a serious error!
            let type = response.headers.get("content-type");
        if (type !== "application/json") {
            throw new TypeError(`Expected JSON, got ${type}`);
        }
// If we get here, then we got a 2xx status and a JSON content-type,
// so we can confidently return a Promise for the response
// body as a JSON object.
        return response.json();
    })
    .then(profile => { // Called with the parsed response body or null
        if (profile) {
            displayUserProfile(profile);
        }
        else { // If we got a 404 error above and returned null we end up here
            displayLoggedOutProfilePage();
        }
    })
    .catch(e => {
        if (e instanceof NetworkError) {
// fetch() can fail this way if the internet connection is down
            displayErrorMessage("Check your internet connection.");
        }
        else if (e instanceof TypeError) {
// This happens if we throw TypeError above
            displayErrorMessage("Something is wrong with our server!");
        }
        else {
// This must be some kind of unanticipated error
            console.error(e);
        }
    });