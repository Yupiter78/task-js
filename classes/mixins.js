// mixin
let sayHiMixin = {
    sayHi() {
        console.log(`Hello ${this.name}`);
    },
    sayBye() {
        console.log(`Bye ${this.name}`);
    }
};

// usage:
class User {
    constructor(name) {
        this.name = name;
    }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!

// There’s no inheritance, but a simple method copying.
// So User may inherit from another class and also include the mixin to “mix-in” the additional methods

// Mixins can make use of inheritance inside themselves.

// For instance, here sayHiMixin inherits from sayMixin:

    let sayMixin = {
        say(phrase) {
            console.log(phrase);
        }
    };

let sayHiMixin_2 = {
    __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)

    sayHi() {
        // call parent method
        super.say(`Hello ${this.name}`); // (*)
    },
    sayBye() {
        super.say(`Bye ${this.name}`); // (*)
    }
};

class User_2 {
    constructor(name) {
        this.name = name;
    }
}

// copy the methods
Object.assign(User_2.prototype, sayHiMixin_2);

// now User_2 can say hi
new User_2("Dude").sayHi(); // Hello Dude!