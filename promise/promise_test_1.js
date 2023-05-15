// create a new promise
const promise = new Promise((resolve, reject) => {
    // we will randomly determine the grade that we will receive after some time (for example, 5 seconds)
    setTimeout(() => {
        // generate a mark from 2 to 5
        const mark = Math.floor(Math.random() * 4) + 2;
        // if the mark is greater than 3, then...
        if (mark > 3) {
            // complete the promise successfully: for this, call the resolve() function and pass it
            // the received grade in parentheses (this is necessary so that we can later get it in the then() method)
            resolve(mark);
        }
        // complete the promise with an error
        reject(mark);
    }, 5000);
});

// actions after the promise is completed are performed using methods: then (in case of success) and catch (in case of an error)
promise
    .then(result => console.log(`Yay! I passed the exam with a ${result}! Dad gave me $100 as he promised.`))
    .catch(result => console.log(`Alas, I got a ${result}! Dad didn't give me $100.`));