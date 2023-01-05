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