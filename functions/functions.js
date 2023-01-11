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

// Private property accessor methods using closures
// This function adds property accessor methods for a property with
// the specified name to the object o. The methods are named get<name>
// and set<name>. If a predicate function is supplied, the setter
// method uses it to test its argument for validity before storing it.
// If the predicate returns false, the setter method throws an exception.
//
// The unusual thing about this function is that the property value
// that is manipulated by the getter and setter methods is not stored in
// the object o. Instead, the value is stored only in a local variable
// in this function. The getter and setter methods are also defined
// locally to this function and therefore have access to this local variable.
// This means that the value is private to the two accessor methods, and it
// cannot be set or modified except through the setter method.
function addPrivateProperty(o, name, predicate) {
    let value; // This is the property value
// The getter method simply returns the value.
    o[`get${name}`] = function() { return value; };
// The setter method stores the value or throws an exception if
// the predicate rejects the value.
        o[`set${name}`] = function(v) {
            if (predicate && !predicate(v)) {
                throw new TypeError(`set${name}: invalid value ${v}`);
            } else {
                value = v;
            }
        };
}
// The following code demonstrates the addPrivateProperty() method.
    let o = {}; // Here is an empty object
// Add property accessor methods getName and setName()
// Ensure that only string values are allowed
addPrivateProperty(o, "Name", x => typeof x === "string");
o.setName("Frank"); // Set the property value
console.log(o.getName()); // => "Frank"
//console.log(o.setName(0)); // !TypeError: try to set a value of the wrong type


// This function returns a function that always returns v
function constFunc(v) { return () => v; }
// Create an array of constant functions:
let funcs = [];
for(var i = 0; i < 10; i++) funcs[i] = constFunc(i);
// The function at array element 5 returns the value 5.
console.log("funcs[5]():", funcs[5]()) // => 5

// Return an array of functions that return the values 0-9
function constFuncs_2() {
    let funcs_2 = [];
    for(var i = 0; i < 10; i++) {
        funcs_2[i] = () => i;
    }
    return funcs_2;
}
let funcs_2 = constFuncs_2();
console.log("funcs_2[5]():", funcs_2[5]()) // => 10; Why doesn't this return 5?

function constFuncs_3() {
    let funcs_3 = [];
    for(let i = 0; i < 10; i++) { // changed var to let
        funcs_3[i] = () => i;
    }
    return funcs_3;
}
let funcs_3 = constFuncs_3();
console.log("funcs_3[5]():", funcs_3[5]());


// This function takes a function and returns a wrapped version
function timed(f) {
    return function(...args) { // Collect args into a rest parameter array
        console.log(`Entering function ${f.name}`);
        let startTime = Date.now();
        try {
// Pass all of our arguments to the wrapped function
            return f(...args); // Spread the args back out again
        }
        finally {
// Before we return the wrapped return value, print elapsed time.
            console.log(`Exiting ${f.name} after ${Date.now() - startTime}ms`);
        }
    };
}
// Compute the sum of the numbers between 1 and n by brute force
function benchmark(n) {
    let sum = 0;
    console.log("Sum of natural numbers:", n * (n + 1) / 2);
    for(let i = 1; i <= n; i++) sum += i;
    return sum;
}
// Now invoke the timed version of that test function
console.log(timed(benchmark)(1000000)) // => 500000500000; this is the sum of the numbers




const o_2 = {};
o_2.m = benchmark;
// Replace the method named m of the object o with a version that logs
// messages before and after invoking the original method.
function trace(o, m) {
    let original = o[m]; // Remember original method in the closure.
        o[m] = function(...args) { // Now define the new method.
        console.log(new Date(), "Entering:", m); // Log message.
            let result = original.apply(this, args); // Invoke original.
        console.log(new Date(), "Exiting:", m); // Log message.
            return result; // Return result.
    };
}

