let s = Object.prototype.toString;

console.log( "s.call(123):", s.call(123), "/ => [object Number]" ); // [object Number]
console.log( "s.call([]):", s.call([]), "/ => [object Array]" ); // [object Array]
console.log( "s.call(null):", s.call(null), "/ => [object Null]" ); // [object Null]
console.log( "s.call(alert):", s.call(alert), "/ => [object Function]" ); // [object Function]