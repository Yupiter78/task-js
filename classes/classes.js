const log = console.log;

//9.1 Classes and Prototypes

// Example 9-1. A simple JavaScript class
// This is a factory function that returns a new range object.
function range(from, to) {
// Use Object.create() to create an object that inherits from the
// prototype object defined below. The prototype object is stored as
// a property of this function, and defines the shared methods (behavior)
// for all range objects.
    let r = Object.create(range.methods);
// Store the start and end points (state) of this new range object.
// These are non inherited properties that are unique to this object.
    r.from = from;
    r.to = to;
// Finally return the new object
    return r;
}
// This prototype object defines methods inherited by all range objects.
    range.methods = {
// Return true if x is in the range, false otherwise
// This method works for textual and Date ranges as well as numeric.
    includes(x) { return this.from <= x && x <= this.to; },
// A generator function that makes instances of the class iterable.
// Note that it only works for numeric ranges.
    *[Symbol.iterator]() {
        for(let x = Math.ceil(this.from); x <= this.to; x++)
            yield x;
    },
// Return a string representation of the range
    toString() { return "(" + this.from + "..." + this.to + ")"; }
};
// Here are example uses of a range object.
let r = range(1,3); // Create a range object
log(r.includes(2), "=> true") // => true: 2 is in the range
log(r.toString(), "=> (1...3)"); // => "(1...3)"
log([...r], " => [1, 2, 3]") // => [1, 2, 3]; convert to an array via iterator


// Classes and Constructors

// Example 9-2. A Range class using a constructor
// This is a constructor function that initializes new Range objects.
// Note that it does not create or return the object. It just initializes this.
    function Range(from, to) {
// Store the start and end points (state) of this new range object.
// These are non inherited properties that are unique to this object.
    this.from = from;
    this.to = to;
}
// All Range objects inherit from this object.
// Note that the property name must be "prototype" for this to work.
    Range.prototype = {
// Return true if x is in the range, false otherwise
// This method works for textual and Date ranges as well as numeric.
    includes: function(x) { return this.from <= x && x <= this.to; },
// A generator function that makes instances of the class iterable.
// Note that it only works for numeric ranges.
    [Symbol.iterator]: function*() {
        for(let x = Math.ceil(this.from); x <= this.to; x++)
            yield x;
    },
// Return a string representation of the range
    toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};
// Here are example uses of this new Range class
let r_2 = new Range(1,3); // Create a Range object; note the use of new
log(r_2.includes(2), "=> true") // => true: 2 is in the range
log(r_2.toString(), "=> (1...3)"); // => "(1...3)"
log([...r_2], "=> [1, 2, 3]") // => [1, 2, 3]; convert to an array via iterator

// Therefore, every regular JavaScript
// function automatically has a prototype property. The value of this
// property is an object that has a single, non-enumerable constructor
// property. The value of the constructor property is the function
// object:

let F = function() {}; // This is a function object.
let p = F.prototype; // This is the prototype object associated with F.
let constr = p.constructor; // This is the function associated with the prototype.
log("constr === F:", constr === F) // => true: F.prototype.constructor === F for any F

let o = new F(); // Create an object o of class F
log("o.constructor === F:", o.constructor === F) // => true: the constructor property specifies the class


// 9.3 Classes with the class Keyword

// Example 9-3. The Range class rewritten using class
class newRange {
    constructor(from, to) {
// Store the start and end points (state) of this new range object.
// These are non inherited properties that are unique to this object.
        this.from = from;
        this.to = to;
    }
// Return true if x is in the range, false otherwise
// This method works for textual and Date ranges as well as numeric.
    includes(x) { return this.from <= x && x <= this.to; }
// A generator function that makes instances of the class iterable.
// Note that it only works for numeric ranges.
    *[Symbol.iterator]() {
        for(let x = Math.ceil(this.from); x <= this.to; x++)
            yield x;
    }
// Return a string representation of the range
    toString() { return `(${this.from}...${this.to})`; }
}
// Here are example uses of this new Range class
let r_3 = new newRange(1,3); // Create a Range object
log(r_3.includes(2), "=> true") // => true: 2 is in the range
log(r_3.toString(), "=> (1...3)"); // => "(1...3)"
log([...r_3], "=> [1, 2, 3]") // => [1, 2, 3]; convert to an array via iterator


function sum(a, b) {
    return a + b;
}

log("sum:", sum);
log("_______________________________-");
const propSum = Reflect.ownKeys(sum).reduce((prev, cur) => {
    prev[cur] = sum[cur];
    return prev;
}, {});

log("propSum:", propSum);

for (let key in sum) {
    log(key, ":", sum[key]);
}
sum.test = "TEST";

log("SUM:", Object.getOwnPropertyNames(sum));

const keys = Reflect.ownKeys(sum)
log("SUM_ keys:", keys);

const sumObj = {};
for (let prop of keys) {
    sumObj[prop] = Reflect.get(sum, prop);
}
log("sumObj:", sumObj);
log("sum:", sum);
log("sum.test:", sum.test);
console.dir("sum:", sum);
log("sum.prototype:", sum.prototype);

// Example 9-4. Complex.js: a complex number class:
/**
 * Instances of this Complex class represent complex numbers.
 * Recall that a complex number is the sum of a real number and
 an
 * imaginary number and that the imaginary number i is the
 square root of -1.
 */
class Complex {
// Once class field declarations are standardized, we could declare
// private fields to hold the real and imaginary parts of a complex number
// here, with code like this:
//
// #r = 0;
// #i = 0;
// This constructor function defines the instance fields r and i on every
// instance it creates. These fields hold the real and imaginary parts of
// the complex number: they are the state of the object.
    constructor(real, imaginary) {
        this.r = real; // This field holds the real part of the number.
        this.i = imaginary; // This field holds the imaginary part.
    }
// Here are two instance methods for addition and multiplication
// of complex numbers. If c and d are instances of this class, we
// might write c.plus(d) or d.times(c)
    plus(that) {
        return new Complex(this.r + that.r, this.i + that.i);
    }
    times(that) {
        return new Complex(this.r * that.r - this.i * that.i,
            this.r * that.i + this.i * that.r);
    }
// And here are static variants of the complex arithmetic methods.
// We could write Complex.sum(c,d) and Complex.product(c,d)
    static sum(c, d) { return c.plus(d); }
    static product(c, d) { return c.times(d); }
// These are some instance methods that are defined as getters,
// so they're used like fields. The real and imaginary getters would
// be useful if we were using private fields this.#r and this.#i
    get real() { return this.r; }
    get imaginary() { return this.i; }
    get magnitude() { return Math.hypot(this.r, this.i); }
// Classes should almost always have a toString() method
    toString() { return `{${this.r},${this.i}}`; }
// It is often useful to define a method for testing whether
// two instances of your class represent the same value
    equals(that) {
        return that instanceof Complex &&
            this.r === that.r &&
            this.i === that.i;
    }
// Once static fields are supported inside class bodies, we could
// define a useful Complex.ZERO constant like this:
// static ZERO = new Complex(0,0);
}
// Here are some class fields that hold useful predefined complex numbers.
Complex.ZERO = new Complex(0,0);
Complex.ONE = new Complex(1,0);
Complex.I = new Complex(0,1);

let c = new Complex(2, 3); // Create a new object with the constructor
log("c:", c);
let d = new Complex(c.i, c.r); // Use instance fields of c
log("d:", d);
log("c.plus(d).toString():", c.plus(d).toString(), "=> {5,5}"); // => "{5,5}"; use instance methods
log("c.magnitude:", c.magnitude, "Math.hypot(2,3)"); // => Math.hypot(2,3); use a getter function
log("Complex.product(c, d):", Complex.product(c, d), "new Complex(0, 13)"); // => new Complex(0, 13); a static method
log("Complex.ZERO.toString():", Complex.ZERO.toString(), "=> {0,0}") // => "{0,0}"; a static property


class User {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        alert(this.name);
    }
}

// Использование:
let user = new User("Иван");
log("user:", user);

function Dog(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
    this.bark = function() {
        if (this.weight > 25) {
            log(this.name + " says Woof!");
        } else {
            log(this.name + " says Yip!");
        }
    };
}

const fido = new Dog("Fido", "Mixed", 38);
const fluffy = new Dog("Fluffy", "Poodle", 30);
const spot = new Dog("Spot", "Chihuahua", 10);
const dogs = [fido, fluffy, spot];
for (let i = 0; i < dogs.length; i++) {
    log(dogs[i]);
    dogs[i].bark();
}

function ShowDog(name, breed, weight, handler) {
    Dog.call(this, name, breed, weight);
    this.handler = handler;
}
ShowDog.prototype = new Dog();
ShowDog.prototype.constructor = ShowDog;
ShowDog.prototype.league = "Webville";
ShowDog.prototype.stack = function() {
    log("Stack");
};
ShowDog.prototype.bait = function() {
    log("Bait");
};
ShowDog.prototype.gait = function(kind) {
    log(kind + "ing");
};
ShowDog.prototype.groom = function() {
    log("Groom");
};

const scotty = new ShowDog("Scotty", "Scottish Terrier", 15, "Cookie");
log("scotty:", scotty);
log("scotty.name:", scotty.name);


const propScottyObj = {};
for (let prop of Reflect.ownKeys(scotty)) {
    propScottyObj[prop] = Reflect.get(scotty, prop);
}
const propScottyObj_2 = Reflect.ownKeys(scotty).reduce((prev, cur) => {
    prev[cur] = scotty[cur];
    return prev;
}, {});

log("propScottyObj:", propScottyObj);
log("propScottyObj_2:", propScottyObj_2);

log("Object.getPrototypeOf(scotty):", Object.getPrototypeOf(scotty));
log("Object.getPrototypeOf(fido):", Object.getPrototypeOf(fido));

class User_2 {

    constructor(name) {
        // вызывает сеттер
        this.name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length < 4) {
            log("Имя слишком короткое.");
            return;
        }
        this._name = value;
    }

}

let user_3 = new User_2("Иван");
log(user_3.name); // Иван

user_3 = new User_2(""); // Имя слишком короткое.


let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');
log("descriptor:", JSON.stringify(descriptor, null, 2));

class User_3 {

    ['say' + 'Hi']() {
        log("Привет");
    }
}

new User_3().sayHi();


class User_4 {
    name = "Аноним";

    sayHi() {
        log(`Привет, ${this.name}!`);
    }
}

new User_4().sayHi();

function Clock({ template }) {

    let timer;

    function render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        log(output);
    }

    this.stop = function() {
        clearInterval(timer);
    };

    this.start = function() {
        render();
        timer = setInterval(render, 1000);
    };

}

// let clock = new Clock({template: 'h:m:s'});
// clock.start();

class Clock_2 {

    timer = null;
    constructor({template}) {
        this.template = template;
    }

    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        log(output);
    }

    stop() {
        clearInterval(this.timer);
    };

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    };

}

let clock_2 = new Clock_2({template: 'h:m:s'});
//clock_2.start();


class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }
    run(speed) {
        this.speed = speed;
        log(`${this.name} бежит со скоростью ${this.speed}.`);
    }
    stop() {
        this.speed = 0;
        log(`${this.name} стоит неподвижно.`);
    }
}

let animal = new Animal("Мой питомец");

class Rabbit extends Animal {
    constructor(name, earLength) {
        super(name);
        this.speed = 0;
        this.earLength = earLength;
    }
    hide() {
        log(`${this.name} прячется!`);
    }

    stop() {
        super.stop(); // вызываем родительский метод stop
        this.hide(); // и затем hide
    }
}

let rabbit = new Rabbit("Белый кролик", 10);

rabbit.run(5); // Белый кролик бежит со скоростью 5.
rabbit.stop(); // Белый кролик стоит. Белый кролик прячется!
log(rabbit.name); // Белый кролик
log(rabbit.earLength); // 10


let animal_2 = {
    name: "Animal",
    eat() {
        log(`${this.name} ест.`);
    }
};

let rabbit_2 = {
    __proto__: animal_2,
    name: "Кролик",
    eat() {
        // вот как предположительно может работать super.eat()
        this.__proto__.eat.call(this); // (*)
    }
};

rabbit_2.eat(); // Кролик ест.

let animal_3 = {
    name: "Животное",
    eat() {
        log(`${this.name} ест.`);
    }
};

let rabbit_3 = {
    __proto__: animal_3,
    eat() {
        // ...делаем что-то специфичное для кролика и вызываем родительский (animal_3) метод
        this.__proto__.eat.call(this); // (*)
    }
};

let longEar = {
    __proto__: rabbit_3,
    eat() {
        // ...делаем что-то, связанное с длинными ушами, и вызываем родительский (rabbit_3) метод
        this.__proto__.eat.call(this); // (**)
    }
};

// longEar.eat(); // Error: Maximum call stack size exceeded

// 1. Внутри longEar.eat() строка (**) вызывает rabbit.eat со значением this=longEar.

// внутри longEar.eat() у нас this = longEar
// this.__proto__.eat.call(this) // (**)
// становится
// longEar.__proto__.eat.call(this)
// то же что и
// rabbit.eat.call(this);

// 2. В строке (*) в rabbit.eat мы хотим передать вызов выше по цепочке, но this=longEar, поэтому this.__proto__.eat снова равен rabbit.eat!

// внутри rabbit.eat() у нас также this = longEar
// this.__proto__.eat.call(this) // (*)
// становится
// longEar.__proto__.eat.call(this)
// или (снова)
// rabbit.eat.call(this);

// 3. …rabbit.eat вызывает себя в бесконечном цикле, потому что не может подняться дальше по цепочке.

let animal_4 = {
    name: "Животное",
    eat() {         // animal_4.eat.[[HomeObject]] == animal_4
        log(`${this.name} ест.`);
    }
};

let rabbit_4 = {
    __proto__: animal_4,
    name: "Кролик",
    eat() {         // rabbit_4.eat.[[HomeObject]] == rabbit_4
        super.eat();
    }
};

let longEar_2 = {
    __proto__: rabbit_4,
    name: "Длинноух",
    eat() {         // longEar_2.eat.[[HomeObject]] == longEar_2
        super.eat();
    }
};

// работает верно
longEar_2.eat();  // Длинноух ест.

//Это работает как задумано благодаря [[HomeObject]]. Метод, такой как longEar.eat,
// знает свой [[HomeObject]] и получает метод родителя из его прототипа. Вообще без использования this.


class Animal_5 {

    constructor(name) {
        this.name = name;
    }

}

class Rabbit_2 extends Animal_5 {
    constructor(name) {
        super(name);
        this.created = Date.now();
    }
}

let rabbit_5 = new Rabbit_2("Белый кролик"); // Белый кролик
log(rabbit_5.name);


class Clock_3 {
    constructor({ template }) {
        this.template = template;
    }

    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        log(output);
    }

    stop() {
        clearInterval(this.timer);
    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }
}

let clock_3 = new Clock_3({
    template: 'h:m:s'
});
//clock_3.start();

class ExtendedClock extends Clock_3{
    #precisionDefault = 1000;
    // constructor({template, precision}) {
    //     super({template});
    //     this.precision = precision ?? this.#precisionDefault;
    // }

    constructor(options) {
        super(options);
        let { precision = 1000 } = options;
        this.precision = precision;
    }
    start() {
        this.render();
        this.timer = setInterval(() => this.render(), this.precision);
    }
}


  let lowResolutionClock = new ExtendedClock({
    template: 'h:m:s',
    precision: 10000
  });

  // lowResolutionClock.start();

class Animal_6 {

    constructor(name, speed) {
        this.speed = speed;
        this.name = name;
    }

    run(speed = 0) {
        this.speed += speed;
        log(`${this.name} бежит со скоростью ${this.speed}.`);
    }

    static compare(animalA, animalB) {
        return animalA.speed - animalB.speed;
    }

}

// Наследует от Animal_6
class Rabbit_3 extends Animal_6 {
    hide() {
        alert(`${this.name} прячется!`);
    }
}

let rabbits = [
    new Rabbit_3("Белый кролик", 10),
    new Rabbit_3("Чёрный кролик", 5)
];

rabbits.sort(Rabbit_3.compare);

rabbits[0].run(); // Чёрный кролик бежит со скоростью 5.


class Rabbit_4 extends Object {
    constructor(name) {
        super();
        this.name = name;
    }
}

let rabbit_6 = new Rabbit_4("Кроль");

log( rabbit_6.hasOwnProperty('name') ); // true
log( Rabbit_4.getOwnPropertyNames({a: 1, b: 2}) ); // a,b


class CoffeeMachine {
    _waterAmount = 0;

    set waterAmount(value) {
        if (value < 0) throw new Error("Отрицательное количество воды");
        this._waterAmount = value;
    }

    get waterAmount() {
        return this._waterAmount;
    }

    constructor(power) {
        this._power = power;
    }

    get power() {
        return this._power;
    }

}

// создаём новую кофеварку
let coffeeMachine = new CoffeeMachine(100);

// устанавливаем количество воды
// coffeeMachine.waterAmount = -10; // Error: Отрицательное количество воды

log(`Мощность: ${coffeeMachine.power}W`); // Мощность: 100W

coffeeMachine.power = 25; // Error (no setter)

log(`Мощность: ${coffeeMachine.power}W`); // Мощность: 100W

// Here we used getter/setter syntax.
//
// But most of the time get.../set... functions are preferred, like this:

// Private “#waterLimit”

class CoffeeMachine_2 {
    _waterAmount = 0;

    #waterLimit = 200;

    #checkWater(value) {
        if (value < 0) throw new Error("Отрицательный уровень воды");
        if (value > this.#waterLimit) throw new Error("Слишком много воды");
    }

    setWaterAmount(value) {
        if (value < 0) throw new Error("Отрицательное количество воды");
        this._waterAmount = value;
    }

    getWaterAmount() {
        return this._waterAmount;
    }
}

let coffeeMachine_2 = new CoffeeMachine_2();
coffeeMachine_2.setWaterAmount(100);

// That looks a bit longer, but functions are more flexible.
// They can accept multiple arguments (even if we don’t need them right now).
//
// On the other hand, get/set syntax is shorter, so ultimately there’s no strict rule,
// it’s up to you to decide.


//log(coffeeMachine_2.#waterLimit = 1000); // Error
//log(coffeeMachine_2.#checkWater()); // Error
// On the language level, # is a special sign that the field is private.
// We can’t access it from outside or from inheriting classes.

class CoffeeMachine_3 {

    #waterAmount = 0;

    get waterAmount() {

        return this.#waterAmount;
    }

    set waterAmount(value) {
        if (value < 0) throw new Error("Отрицательный уровень воды");
        this.#waterAmount = value;
    }
}

let machine = new CoffeeMachine_3();

machine.waterAmount = 100;
// log(machine.#waterAmount); // Error

// Extending built-in classes

// Built-in classes like Array, Map and others are extendable also.
//
// For instance, here PowerArray inherits from the native Array:

// add one more method to it (can do more)
class PowerArray extends Array {
    isEmpty() {
        return this.length === 0;
    }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
log(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);

log("arr.constructor:", arr.constructor);
log(filteredArr); // 10, 50
log("Array.isArray(filteredArr):", Array.isArray(filteredArr)); // true
log("filteredArr.constructor:", filteredArr.constructor); // class PowerArray extends Array {
// isEmpty() {
//     return this.length === 0;
// }
// }

log(filteredArr.isEmpty()); // false
log("filteredArr.__proto__:", filteredArr.__proto__);
log("filteredArr.__proto__ === Array.prototype:", filteredArr.__proto__ === Array.prototype);
log("filteredArr.__proto__ === PowerArray.prototype:", filteredArr.__proto__ === PowerArray.prototype);
log("filteredArr.__proto__.__proto__ === Array.prototype:", filteredArr.__proto__.__proto__ === Array.prototype);
log("filteredArr.__proto__.__proto__.__proto__ === Object.prototype:",
    filteredArr.__proto__.__proto__.__proto__ === Object.prototype);

log("PowerArray.prototype.__proto__:", PowerArray.prototype.__proto__);
log("PowerArray.prototype.__proto__ === Array.prototype:", PowerArray.prototype.__proto__ === Array.prototype);
log("Object.getPrototypeOf(PowerArray.prototype) === Array.prototype:",
    Object.getPrototypeOf(PowerArray.prototype) === Array.prototype);


class PowerArray_2 extends Array {
    isEmpty() {
        return this.length === 0;
    }

    // built-in methods will use this as the constructor
    static get [Symbol.species]() {
        return Array;
    }
}

let arr_2 = new PowerArray_2(1, 2, 5, 10, 50);
log("arr_2.isEmpty():", arr_2.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArr_2 = arr_2.filter(item => item >= 10);

// filteredArr_2 не является PowerArray_2, это Array
//log("filteredArr_2.isEmpty():", filteredArr_2.isEmpty()); // Error: filteredArr_2.isEmpty is not a function

log("Object.__proto__ === Function.prototype:", Object.__proto__ === Function.prototype);
log("Function.prototype:", Function.prototype);
log("Object.__proto__:", Object.__proto__);


// Class checking: "instanceof"
// Normally, instanceof examines the prototype chain for the check.
// We can also set a custom logic in the static method Symbol.hasInstance.
// setup instanceOf check that assumes that
// anything with canEat property is an animal
class Animal_7 {
    static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
    }
}

let obj = { canEat: true };

log(obj instanceof Animal_7); // true: Animal[Symbol.hasInstance](obj) is called

// A trivial Array subclass that adds getters for the first and last elements.
    class EZArray extends Array {
    get first() { return this[0]; }
    get last() { return this[this.length-1]; }
}
let a = new EZArray();
a instanceof EZArray // => true: a is subclass instance
a instanceof Array // => true: a is also a superclass instance.
a.push(1,2,3,4); // a.length == 4; we can use inherited methods
a.pop() // => 4: another inherited method
a.first // => 1: first getter defined by subclass
a.last // => 3: last getter defined by subclass
a[1] // => 2: regular array access syntax still works.
Array.isArray(a) // => true: subclass instance really is an array
EZArray.isArray(a) // => true: subclass inherits static methods, too!

