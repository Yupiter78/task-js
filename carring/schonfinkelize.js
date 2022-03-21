function schonfinkelize(fn) {
    const slice = Array.prototype.slice,
        stored_args = slice.call(arguments, 1);
    return function () {
        const newArgs = slice.call(arguments),
            args = stored_args.concat(newArgs);
        return fn.apply(null, args);
    };
}

// обычная функция
function add(x, y) {
    return x + y;
}
// каррировать существующую функцию и получить новую
const newAdd = schonfinkelize(add, 5);
newAdd(4); // 9
// другой вариант – вызвать новую функцию сразу же
schonfinkelize(add, 6)(7); // 13