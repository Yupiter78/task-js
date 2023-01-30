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
console.log(r.includes(2), "=> true") // => true: 2 is in the range
console.log(r.toString(), "=> (1...3)"); // => "(1...3)"
console.log([...r], " => [1, 2, 3]") // => [1, 2, 3]; convert to an array via iterator


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
console.log(r_2.includes(2), "=> true") // => true: 2 is in the range
console.log(r_2.toString(), "=> (1...3)"); // => "(1...3)"
console.log([...r_2], "=> [1, 2, 3]") // => [1, 2, 3]; convert to an array via iterator

// Therefore, every regular JavaScript
// function automatically has a prototype property. The value of this
// property is an object that has a single, non-enumerable constructor
// property. The value of the constructor property is the function
// object:

let F = function() {}; // This is a function object.
let p = F.prototype; // This is the prototype object associated with F.
let constr = p.constructor; // This is the function associated with the prototype.
console.log("constr === F:", constr === F) // => true: F.prototype.constructor === F for any F

let o = new F(); // Create an object o of class F
console.log("o.constructor === F:", o.constructor === F) // => true: the constructor property specifies the class


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
console.log(r_3.includes(2), "=> true") // => true: 2 is in the range
console.log(r_3.toString(), "=> (1...3)"); // => "(1...3)"
console.log([...r_3], "=> [1, 2, 3]") // => [1, 2, 3]; convert to an array via iterator


function sum(a, b) {
    return a + b;
}

console.log("sum:", sum);
console.log("_______________________________-");
const propSum = Reflect.ownKeys(sum).reduce((prev, cur) => {
    prev[cur] = sum[cur];
    return prev;
}, {});

console.log("propSum:", propSum);

for (let key in sum) {
    console.log(key, ":", sum[key]);
}
sum.test = "TEST";

console.log("SUM:", Object.getOwnPropertyNames(sum));

const keys = Reflect.ownKeys(sum)
console.log("SUM_ keys:", keys);

const sumObj = {};
for (let prop of keys) {
    sumObj[prop] = Reflect.get(sum, prop);
}
console.log("sumObj:", sumObj);
console.log("sum:", sum);
console.log("sum.test:", sum.test);
console.dir("sum:", sum);
console.log("sum.prototype:", sum.prototype);

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
console.log("c:", c);
let d = new Complex(c.i, c.r); // Use instance fields of c
console.log("d:", d);
console.log("c.plus(d).toString():", c.plus(d).toString(), "=> {5,5}"); // => "{5,5}"; use instance methods
console.log("c.magnitude:", c.magnitude, "Math.hypot(2,3)"); // => Math.hypot(2,3); use a getter function
console.log("Complex.product(c, d):", Complex.product(c, d), "new Complex(0, 13)"); // => new Complex(0, 13); a static method
console.log("Complex.ZERO.toString():", Complex.ZERO.toString(), "=> {0,0}") // => "{0,0}"; a static property


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
console.log("user:", user);

function Dog(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
    this.bark = function() {
        if (this.weight > 25) {
            console.log(this.name + " says Woof!");
        } else {
            console.log(this.name + " says Yip!");
        }
    };
}

const fido = new Dog("Fido", "Mixed", 38);
const fluffy = new Dog("Fluffy", "Poodle", 30);
const spot = new Dog("Spot", "Chihuahua", 10);
const dogs = [fido, fluffy, spot];
for (let i = 0; i < dogs.length; i++) {
    console.log(dogs[i]);
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
    console.log("Stack");
};
ShowDog.prototype.bait = function() {
    console.log("Bait");
};
ShowDog.prototype.gait = function(kind) {
    console.log(kind + "ing");
};
ShowDog.prototype.groom = function() {
    console.log("Groom");
};

const scotty = new ShowDog("Scotty", "Scottish Terrier", 15, "Cookie");
console.log("scotty:", scotty);
console.log("scotty.name:", scotty.name);


const propScottyObj = {};
for (let prop of Reflect.ownKeys(scotty)) {
    propScottyObj[prop] = Reflect.get(scotty, prop);
}
const propScottyObj_2 = Reflect.ownKeys(scotty).reduce((prev, cur) => {
    prev[cur] = scotty[cur];
    return prev;
}, {});

console.log("propScottyObj:", propScottyObj);
console.log("propScottyObj_2:", propScottyObj_2);

console.log("Object.getPrototypeOf(scotty):", Object.getPrototypeOf(scotty));
console.log("Object.getPrototypeOf(fido):", Object.getPrototypeOf(fido));

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
            console.log("Имя слишком короткое.");
            return;
        }
        this._name = value;
    }

}

let user_3 = new User_2("Иван");
console.log(user_3.name); // Иван

user_3 = new User_2(""); // Имя слишком короткое.


let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');
console.log("descriptor:", JSON.stringify(descriptor, null, 2));

class User_3 {

    ['say' + 'Hi']() {
        console.log("Привет");
    }
}

new User_3().sayHi();


class User_4 {
    name = "Аноним";

    sayHi() {
        console.log(`Привет, ${this.name}!`);
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

        console.log(output);
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

        console.log(output);
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
        console.log(`${this.name} бежит со скоростью ${this.speed}.`);
    }
    stop() {
        this.speed = 0;
        console.log(`${this.name} стоит неподвижно.`);
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
        console.log(`${this.name} прячется!`);
    }

    stop() {
        super.stop(); // вызываем родительский метод stop
        this.hide(); // и затем hide
    }
}

let rabbit = new Rabbit("Белый кролик", 10);

rabbit.run(5); // Белый кролик бежит со скоростью 5.
rabbit.stop(); // Белый кролик стоит. Белый кролик прячется!
console.log(rabbit.name); // Белый кролик
console.log(rabbit.earLength); // 10