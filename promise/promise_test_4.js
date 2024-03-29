// This code contains a function sleep that needs to be implemented. The function takes one argument - the number of milliseconds to delay execution of an action. Inside the function,
// you can use the setTimeout method to delay execution for a specified number of milliseconds.
/*
const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Example usage of the sleep function to perform an action with a 5-second delay:
sleep(5000).then(() => {
    console.log('Executed after 5 seconds!');
});
// Example usage of the sleep function to perform an action with a 10-second delay:
sleep(10000).then(() => {
    console.log('Executed after 10 seconds!');
});*/

const sleep = ms => {
    return new Promise(resolve => setTimeout(() => resolve(`Executed after ${ms / 1000} seconds!`), ms));
}

sleep(5000).then((message) => {
    console.log(message);
});
sleep(10000).then((message) => {
    console.log(message);
});
sleep(15000).then((message) => {
    console.log(message);
});
