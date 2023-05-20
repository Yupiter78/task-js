// 1. Create a function that returns a Promise that resolves after a given number of seconds.
// The function should take a parameter for the time in seconds.

function getPromise(sec) {
    return new Promise(resolve => setTimeout(() => resolve(sec), sec * 1000));
}

getPromise(5).then((time) => console.log(`Executed after ${time} seconds!`));


function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// usage example
wait(3).then(() => console.log("3 seconds have passed"));