const promise = Promise.reject(new Error("Promise Failed!"))
    .catch(error => console.log(error.message));

const promise_2 = Promise.reject(new Error("Promise Failed unhandledrejection!"));

window.addEventListener("unhandledrejection", event => console.log(event.reason));