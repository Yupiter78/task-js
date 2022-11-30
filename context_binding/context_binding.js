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

function func_2(phrase) {
    console.log(`${phrase}, ${this.firstName}!`);
}

// привязка this к user_2
const func_2User = func_2.bind(user_2);
func_2User("HELLO"); // HELLO, Vasya! (аргумент "HELLO" передан, при этом this=user_2)

const user_3 = {
    firstName: "Petya",
    secondName: "Ivanov",
    get fullName() {
        return `${this.firstName} ${this.secondName}`;
    },
    set fullName(value) {
        [this.firstName, this.secondName] = value.split(" ");
    },
    sayHi() {
        console.log(`Hello, `)
    }
}

console.log(user_3.fullName);
user_3.fullName = "New Name";
console.log(user_3.fullName);