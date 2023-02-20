class Rabbit_2 extends Object {}

console.log( "Rabbit_2.prototype.__proto__ === Object.prototype:",
    Rabbit_2.prototype.__proto__ === Object.prototype, "// => true" ); // (1) true
console.log( "Rabbit_2.__proto__ === Object:", Rabbit_2.__proto__ === Object, "// => true" ); // (2) true

class Rabbit {}

console.log( "Rabbit.prototype.__proto__ === Object.prototype:", Rabbit.prototype.__proto__ === Object.prototype,
    "// => true" ); // (1) true
console.log( "Rabbit.__proto__ === Object:", Rabbit.__proto__ === Object,
    "// => false" ); // (2) false (!)
console.log( "Rabbit.__proto__ === Function.prototype:", Rabbit.__proto__ === Function.prototype,
    "// as any function by default" ); // as any function by default