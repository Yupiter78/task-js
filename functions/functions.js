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