const _sum3 = (x, y, z) => x + y + z;

function schonfinkelize(fn) {
    const slice = Array.prototype.slice;
    console.log("slice:", slice);
    const storedArgs = slice.call(arguments, 1);
    console.log("storedArgs:", storedArgs);
    return function () {
        const newArgs = slice.call(arguments);
        const args = storedArgs.concat(newArgs);
        return fn.apply(null, args);
    };
}

// обычная функция
function add(x, y) {
    return x + y;
}

// каррировать существующую функцию и получить новую
// const newAdd = schonfinkelize(add, 5);
// console.log(newAdd(4)); // 9
// другой вариант – вызвать новую функцию сразу же
// console.log(schonfinkelize(add, 6)(7)); // 13
// console.log(schonfinkelize(_sum3, 6, 6)(7)); //19
console.log(schonfinkelize(_sum3, 1, 3)(2)); //6


const mul = (x) => {
    return (y) => {
        return (z) => {
            return x * y * z;
        };
    };
};


const _sum4 = (p, q, r, s) => p + q + r + s;

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
