let user = {
    name: "John",
    surname: "Smith",

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

let admin = {
    __proto__: user,
    isAdmin: true
};

console.log(admin.fullName); // John Smith (*)

// срабатывает сеттер!
admin.fullName = "Alice Cooper"; // (**)
console.log(admin.name); // Alice
console.log(admin.surname); // Cooper
console.log(user.name); // John
console.log(user.surname); // Smith
console.log("user:", user);
console.log("admin:", admin);


// методы animal
let animal = {
    walk() {
        if (!this.isSleeping) {
            alert(`I walk`);
        }
    },
    sleep() {
        this.isSleeping = true;
    }
};

let rabbit = {
    name: "White Rabbit",
    __proto__: animal
};

// модифицирует rabbit.isSleeping
rabbit.sleep();

console.log(rabbit.isSleeping); // true
console.log(animal.isSleeping); // undefined (нет такого свойства в прототипе)

let animal_2 = {
    eats: true
};

let rabbit_2 = {
    jumps: true,
    __proto__: animal_2
};

// Object.keys возвращает только собственные ключи
console.log(Object.keys(rabbit_2)); // jumps

// for..in проходит и по своим, и по унаследованным ключам
for(let prop in rabbit_2) console.log(prop); // jumps, затем eats


let animal_3 = {
    eats: true
};

let rabbit_3 = {
    jumps: true,
    __proto__: animal_3
};

for(let prop in rabbit_3) {
    let isOwn = rabbit_3.hasOwnProperty(prop);

    if (isOwn) {
        console.log(`Our: ${prop}`); // Our: jumps
    } else {
        console.log(`Inherited: ${prop}`); // Inherited: eats
    }
}