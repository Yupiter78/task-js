/*Create a function that takes an array of Promises and returns
a Promise that resolves with an array of resolved values:*/

/*function allSettled(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
        status: "fulfilled",
        value
    }), reason => ({
        status: "rejected",
        reason
    }))));
}
*/


// usage example
const promises = [Promise.resolve(1), Promise.resolve(2), Promise.reject("error")];

const allSettled = promises => Promise.allSettled(promises);
/*const allSettled = promises => Promise.all(promises.map(item => {
    return Promise.resolve(item)
        .then(value => ({status: "fulfilled", value}))
        .catch(reason => ({status: "rejected", reason}))
}));*/
allSettled(promises).then(results => console.log(results));
// output: [{ status: "fulfilled", value: 1 }, { status: "fulfilled", value: 2 }, { status: "rejected", reason: "error" }]
