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

// ...в течении 1 секунды
user = {
    sayHi() {console.log('Another user in setTimeout!');
    }
} // выводит другого пользователя в setTimeout

//let boundFunc = func.bind(context);

let user_2 = {
    firstName: "Vasya"
}

function func() {
    console.log(`Hello, ${this.firstName}!`);
}

const funcUser = func.bind(user_2); // func.bind(user_2) – это «связанный вариант» func, с фиксированным this=user_2
funcUser();