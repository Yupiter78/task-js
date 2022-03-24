const _sum3 = (x, y, z) => x + y + z;

// function schonfinkelize(fn) {
//     const slice = Array.prototype.slice;
//     console.log("slice:", slice);
//     const storedArgs = slice.call(arguments, 1);
//     console.log("storedArgs:", storedArgs);
//     return function () {
//         const newArgs = slice.call(arguments);
//         const args = storedArgs.concat(newArgs);
//         return fn.apply(null, args);
//     };
// }

function schonfinkelize(fn, ...rest) {
    return function (...newRest) {
        const args = [...rest, ...newRest];
        console.log("args:", args);
        return fn.apply(null, args);
    };
}

// обычная функция
function add(x, y) {
    console.log("x, y:", x, y);
    return x + y;
}

// каррировать существующую функцию и получить новую
const newAdd = schonfinkelize(add, 5);
console.log(newAdd(4)); // 9
// другой вариант – вызвать новую функцию сразу же
console.log(schonfinkelize(add, 6)(7)); // 13
console.log(schonfinkelize(_sum3, 6, 6)(7)); //19
console.log(schonfinkelize(_sum3, 1, 3)(2)); //6


// const mul = (x) => {
//     return (y) => {
//         return (z) => {
//             return x * y * z;
//         };
//     };
// };
//
//
// const _sum4 = (p, q, r, s) => p + q + r + s;

function curry(fn) {
    console.log("arguments:", arguments);
    const N = fn.length;
    console.log("N:", N);

    function innerFn(n, args) {
        console.log("n, args:", n, args)
        return function actualInnerFn(a) {
            console.log("a:", a);
            if (n <= 1) {
                return fn(...args, a);
            }
            console.log("[...args, a]:", [...args, a]);
            return innerFn(n - 1, [...args, a]);

        }
    }

    console.log("innerFn(N, []):", innerFn(N, []));
    return innerFn(N, [])
}

const sum3 = curry(_sum3);
// const sum4 = curry(_sum4);

console.log(sum3(1)(3)(2)); // 6
/*
console.log(sum4(1)(3)(2)(4)); // 10*/

function sum(a) {
    console.log("a:", a);

    let currentSum = a;

    function f(b) {
        console.log("b:", b);
        currentSum += b;
        return f;
    }

    f.toString = function () {
        return currentSum;
    };

    return f;
}

console.log("sum:",sum(1)(2).toString()); // 3
alert(sum(5)(-1)(2)); // 6
console.log(sum(6)(-1)(-2)(-3)); // 0
console.log(sum(0)(1)(2)(3)(4)(5)); // 15

console.log(+sum(1)(2) === 3); // 1 + 2
console.log(+sum(1)(2)(3) === 6); // 1 + 2 + 3
console.log(+sum(5)(-1)(2) === 6)
console.log(+sum(6)(-1)(-2)(-3) === 0)
console.log(+sum(0)(1)(2)(3)(4)(5) === 15)

console.log("{}:", {});
alert({});

function curry2(func) {
    console.log("func:", func)

    return function curried(...args) {
        console.log("args:", args);
        console.log({args});
        console.log("args.length:", args.length);
        console.log("func.length:", func.length);
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    };

}


function added(a, b, c) {
    return a + b + c;
}

let curriedSum = curry2(added);

alert( curriedSum(1, 2, 3) ); // 6, всё ещё можно вызывать нормально
alert( curriedSum(1)(2,3) ); // 6, каррирование первого аргумента
alert( curriedSum(1)(2)(3) ); // 6, каррирование всех аргументов