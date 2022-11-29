let user = {
    firstName: "Vasya",
    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
}

setTimeout(user.sayHi, 1000); //Hello, undefined!
// let f = user.sayHi;
// setTimeout(f, 1000); контекст user потерян, this === globalThis
console.log(globalThis);

setTimeout(function() {user.sayHi()}, 1000); //Hello, Vasya!

setTimeout(() => user.sayHi(), 1000); //Hello, Vasya!