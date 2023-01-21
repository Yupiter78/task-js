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