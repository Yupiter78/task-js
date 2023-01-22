let a = {};

(function(a) {
    a.a = 10;
    a = null;
})(a);

console.log(a);

let q = {};
let e = q;
e = null;
console.log(q);



var x = 1, foo = {}

foo: {
    x: 2
    y: ++x
}
console.log(foo.y + foo.x + x); // => NaN