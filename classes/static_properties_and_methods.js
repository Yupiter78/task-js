class Rabbit {}

console.log( "Rabbit.prototype.__proto__ === Object.prototype:", Rabbit.prototype.__proto__ === Object.prototype,
    "// => true" ); // (1) true
console.log( "Rabbit.__proto__ === Object:", Rabbit.__proto__ === Object,
    "// => false" ); // (2) false (!)
console.log( "Rabbit.__proto__ === Function.prototype:", Rabbit.__proto__ === Function.prototype,
    "// as any function by default" ); // as any function by default