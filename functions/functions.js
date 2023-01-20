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
o_2.sum = benchmark;
// Replace the method named m of the object o with a version that logs
// messages before and after invoking the original method.
function trace(o, m) {
    let original = o[m]; // Remember original method in the closure.
        o[m] = function(...args) { // Now define the new method.
        console.log(new Date(), "Entering:", m); // Log message.
            let result = original.apply(this, args); // Invoke original.
        console.log(new Date(), `Exiting: ${m}`); // Log message.
            return result; // Return result.
    };
}

trace(o_2, "sum");

console.log("o_2:", o_2);
console.log("o_2.sum(1000000):", o_2.sum(1000000));


// Functional Programming

// nonfunctional style:
let data = [1,1,3,5,5]; // This is our array of numbers
// The mean is the sum of the elements divided by the number of elements
let total = 0;
for(let i = 0; i < data.length; i++) total += data[i];
let mean = total/data.length; // mean == 3; The mean of our data is 3
// To compute the standard deviation, we first sum the squares of
// the deviation of each element from the mean.
total = 0;
for(let i = 0; i < data.length; i++) {
    let deviation = data[i] - mean;
    total += deviation * deviation;
}
let stddev = Math.sqrt(total/(data.length-1));
console.log("stddev:", stddev)// stddev == 2


// We can perform these same computations in concise functional style
// using the array methods map() and reduce()
// First, define two simple functions
const sum = (x, y) => x + y;
const square = x => x * x;
// Then use those functions with Array methods to compute mean and stddev

let mean_2 = data.reduce(sum) / data.length; // mean == 3
let deviations = data.map(x => x - mean_2);
let stddev_2 = Math.sqrt(deviations.map(square).reduce(sum)/(data.length - 1));
console.log("stddev_2:", stddev_2) // => 2

//This new version of the code looks quite different than the first one,
// but it is still invoking methods on objects, so it has some objectoriented
// conventions remaining. Let’s write functional versions of the
// map() and reduce() methods:
const map = function(a, ...args) { return a.map(...args); };
const reduce = function(a, ...args) { return a.reduce(...args); };

let mean_3 = reduce(data, sum) / data.length;
let deviations_2 = map(data, x => x - mean_3);
let stddev_3 = Math.sqrt(reduce( map(deviations_2, square), sum) / (data.length - 1));
console.log("stddev_3:", stddev_3) // => 2


// Higher-Order Functions
// This higher-order function returns a new function that passes its
// arguments to f and returns the logical negation of f's return value;
function not(f) {
    return function(...args) { // Return a new function
        let result = f.apply(this, args); // that calls f
        console.log("result:", result);
        return !result; // and negates its result.
    };
}
const even = x => x % 2 === 0; // A function to determine if a number is even
const odd = not(even); // A new function that does the opposite
    console.log("[1,1,3,5,5].every(odd):", [1,1,3,5,5].every(odd)); // => true: every element of the array is odd

function partialLeft(f, ...outerArgs) {
    return function (...innerArgs) {
        let args = [...outerArgs, ...innerArgs];
        return f.apply(this, args);
    }
}

const func = (x, y, z) => x * (y - z);


console.log("partialLeft(func, 2)(3, 4):", partialLeft(func, 2)(3, 4));
// => -2: Bind first argument: 2 * (3 - 4)

function partialRight(f, ...outerArgs) {
    return function (...innerArgs) {
        let args = [...innerArgs, ...outerArgs];
        return f.apply(this, args);
    }
}

console.log("partialRight(func, 2)(3, 4):", partialRight(func, 2)(3, 4));
// => 6: Bind last argument: 3 * (4 - 2)

function partial(f, ...outerArgs) {
    return function (...innerArgs) {
        const args = [...outerArgs];
        let innerIndex = 0;
        for (let i = 0; i < args.length; i++) {
            if (args[i] === undefined) {
                args[i] = innerArgs[innerIndex++];
            }
        }
        args.push(...innerArgs.slice(innerIndex))
        return f.apply(this, args);
    }
}

console.log("partial(func, undefined, 2)(3, 4):", partial(func, undefined, 2)(3, 4));
// => -6: Bind middle argument: 3 * (2 - 4)


const increment = partialLeft(sum, 1);
const cubeRoot = partialRight(Math.pow, 1 / 3);
console.log(cubeRoot(increment(26)));


function compose(f, g) {
    return function (...args) {
        return f.call(this, g.apply(this, args));
    }
}

console.log("compose(square, sum)(2, 3):", compose(square, sum)(2, 3));

const not_2 = partialLeft(compose, x => !x);
const even_2 = x => x % 2 === 0;
const odd_2 = not_2(even_2);
const isNumber = not_2(isNaN);
console.log("odd_2(3) && isNumber(2)", odd_2(3) && isNumber(2));


function partial_2(func, ...argsBound) {
    return function (...args) {
        return func.call(this, ...argsBound, ...args);
    }
}

const user = {
    firstName: "John",
    say(time, phrase) {
        console.log(`[${time}] ${this.firstName}: ${phrase}!`);
    }
}

user.sayHi = partial_2(user.say, `${new Date().getHours()} : ${new Date().getMinutes()}`);

user.sayHi("Hello");


function askPassword(ok, fail) {
    let password = prompt("Password?", '');
    if (password === "rockstar") ok();
    else fail();
}

let user_2 = {
    name: 'Вася',

    loginOk() {
        console.log("loginOk:", `${this.name} logged in`);
    },

    loginFail() {
        console.log("loginFail:", `${this.name} failed to log in`);
    },

};

// askPassword(user_2.loginOk.bind(user_2), user_2.loginFail.bind(user_2));
// askPassword(() => user_2.loginOk(), () => user_2.loginFail());

function askPassword_2(ok, fail) {
    let password = prompt("Password?", '');
    if (password === "rockstar") ok();
    else fail();
}

let user_3 = {
    name: 'John',

    login(result) {
        console.log( this.name + (result ? ' logged in' : ' failed to log in') );
    }
};

// askPassword_2(() => user_3.login(true), () => user_3.login(false));
// askPassword_2(user_3.login.bind(user_3, true), user_3.login.bind(user_3, false));


// We can also use composition and partial application to redo our mean
// and standard deviation calculations in extreme functional style:
// sum() and square() functions are defined above. Here are some more:
const product = (x,y) => x * y;
const neg = partial(product, -1);
const sqrt = partial(Math.pow, undefined, .5);
const reciprocal = partial(Math.pow, undefined, neg(1));
// Now compute the mean and standard deviation.
let data_2 = [1,1,3,5,5]; // Our data_2
let mean_4 = product(reduce(data_2, sum), reciprocal(data_2.length));
let stddev_4 = sqrt(product( reduce( map(data_2, compose( square, partial( sum, neg( mean_4 ) ) ) ), sum),
    reciprocal(sum( data_2.length,neg(1) ) ) ) );
console.log([mean_4, stddev_4]); // => [3, 2]


// Arrow functions have no “this”
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(
            student => console.log(this.title + ': ' + student)
        );
    }
};

group.showList();


// Memoization
// Return a memoized version of f.
// It only works if arguments to f all have distinct string representations.
    function memoize(f) {
    const cache = new Map(); // Value cache stored in the closure.
        return function(...args) {
// Create a string version of the arguments to use as a cache key.
            let key = args.length + args.join("+");
        if (cache.has(key)) {
            return cache.get(key);
        } else {
            let result = f.apply(this, args);
            cache.set(key, result);
            return result;
        }
    };
}

// Return the Greatest Common Divisor of two integers using the Euclidian
// algorithm: http://en.wikipedia.org/wiki/Euclidean_algorithm
    function gcd(a, b) { // Type checking for a and b has been omitted
        if (a < b) { // Ensure that a >= b when we start
                [a, b] = [b, a]; // Destructuring assignment to swap variables
        }
        while(b !== 0) { // This is Euclid's algorithm for GCD
                [a, b] = [b, a % b];
        }
        return a;
    }
const gcdMemo = memoize(gcd);
console.log("gcdMemo(85, 187):", gcdMemo(85, 187), "=> 17") // => 17
// Note that when we write a recursive function that we will be memoizing,
// we typically want to recurse to the memoized version, not the original.
    const factorial_2 = memoize(function(n) {
    return (n <= 1) ? 1 : n * factorial_2(n - 1);
});
console.log("factorial_2(5):", factorial_2(5), "=> 120"); // => 120: also caches values for 4, 3, 2 and 1.


// Here is the general-purpose currying function:
function schonfinkelize(fn) {
    const slice = Array.prototype.slice,
        stored_args = slice.call(arguments, 1);
    return function () {
        const new_args = slice.call(arguments),
            args = stored_args.concat(new_args);
        return fn.apply(null, args);
    };
}

// a normal function
function add_3(x, y) {
    return x + y;
}
// curry a function to get a new function
const newAdd = schonfinkelize(add_3, 5);
console.log(newAdd(4), "=> 9"); // 9
// another option -- call the new function directly
console.log(schonfinkelize(add_3, 6)(7), "=> 13"); // 13
//The transformation function schonfinkelize() is not limited to single parameters or to
//single-step currying. Here are some more usage examples:
// a normal function
    function add_4(a, b, c, d, e) {
        return a + b + c + d + e;
    }
// works with any number of arguments
schonfinkelize(add_4, 1, 2, 3)(5, 5); // 16
// two-step currying
const addOne = schonfinkelize(add_4, 1);
console.log(addOne(10, 10, 10, 10), "=> 41"); // 41
const addSix = schonfinkelize(addOne, 2, 3);
console.log(addSix(5, 5), "=> 16"); // 16


