let s = Object.prototype.toString;

console.log( "s.call(123):", s.call(123), "/ => [object Number]" ); // [object Number]
console.log( "s.call([]):", s.call([]), "/ => [object Array]" ); // [object Array]
console.log( "s.call(null):", s.call(null), "/ => [object Null]" ); // [object Null]
console.log( "s.call(alert):", s.call(alert), "/ => [object Function]" ); // [object Function]

let user = {
    [Symbol.toStringTag]: "User"
};

console.log( "{}.toString.call(user):", {}.toString.call(user), "// => [object User]" ); // [object User]

// toStringTag для браузерного объекта и класса
console.log( "window[Symbol.toStringTag]:", window[Symbol.toStringTag], "/ => window"); // window
console.log( "XMLHttpRequest.prototype[Symbol.toStringTag]:",
    XMLHttpRequest.prototype[Symbol.toStringTag], "// => XMLHttpRequest" ); // XMLHttpRequest

console.log( "{}.toString.call(window):", {}.toString.call(window), "// => [object Window]" ); // [object Window]
console.log( "{}.toString.call(new XMLHttpRequest()):",
    {}.toString.call(new XMLHttpRequest()), "// => [object XMLHttpRequest]" ); // [object XMLHttpRequest]