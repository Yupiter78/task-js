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
let c = p.constructor; // This is the function associated with the prototype.
console.log("c === F:", c === F) // => true: F.prototype.constructor === F for any F

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