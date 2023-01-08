//Using functions as data
const operators = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    pow: Math.pow
}

function operate(operator, operand_1, operand_2) {
    if (typeof operators[operator] === "function") {
        return operators[operator](operand_1, operand_2);
    } else throw "unknown operator";
}

console.log(operate("add", "hello", operate("add", " ", "world")));
console.log(operate("pow", 10, 2));

//defining your own function properties
uniqueInteger.count = 0;

function uniqueInteger() {
    return uniqueInteger.count++;
}

console.log("uniqueInteger.count:", uniqueInteger());
console.log("uniqueInteger.count:", uniqueInteger());

// Compute factorials and cache results as properties of the
//function itself.
function factorial(n) {
    if (Number.isInteger(n) && n > 0) { // Positive integers only
        if (!(n in factorial)) { // If no cached result
            factorial[n] = n * factorial(n-1); // Compute and cache it
        }
        return factorial[n]; // Return the cached result
    } else {
        return NaN; // If input was bad
    }
}
factorial[1] = 1; // Initialize the cache to hold this base case.
console.log("factorial:", factorial(6)); // => 720
factorial[5] // => 120; the call above caches this value


// Closures
let scope = "global scope"; // A global variable

function checkScope() {
    let scope = "local scope"; // A local variable
    function f() { return scope; } // Return the value in scope here
    return f();
}
console.log("checkScope():", checkScope());// => "local scope"

function checkScope_2() {
    let scope = "local scope"; // A local variable
    function f() { return scope; } // Return the value in scope here
    return f;
}
let s = checkScope_2()(); // What does this
console.log("s:", s);

let uniqueInteger_2 = (function() { // Define and invoke
    let counter = 0; // Private state of function below
    return function() { return counter++; };
}());
console.log(uniqueInteger_2()) // => 0
console.log(uniqueInteger_2()) // => 1

function counter() {
    let n = 0;
    return {
        count: function() { return n++; },
        reset: function() {
            n = 0;
            return `n = ${n}`;
        }
    };
}
let c = counter(), d = counter(); // Create two counters
console.log(c.count()) // => 0
console.log(d.count()) // => 0: they count independently
console.log(c.reset()); // reset() and count() methods share state
console.log(c.count()) // => 0: because we reset c
console.log(d.count()) // => 1: d was not reset

function counter_2(n) {
    return {
        get count() {
            return n++;
        },
        set count(value) {
            if (value > n) {
                n = value;
            } else throw Error("count can only be set to a larger value")
        }
    }
}

let c_2 = counter_2(1000);
console.log("c_2.count", c_2.count);
console.log("c_2.count", c_2.count);
console.log("c_2.count", c_2.count);
console.log("c_2.count:", c_2.count = 2000);
console.log("c_2.count", c_2.count);
console.log("c_2.count", c_2.count);


// Filter through function
// filter inBetween
function inBetween(a, b) {
    return function (x) {
        return x >= a && x <= b;
    }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr.filter(inBetween(3, 6)));

// filter inArray
function inArray(arr) {
    return function (x) {
        return arr.includes(x);
    }
}

console.log(arr.filter(inArray([1, 2, 10])));