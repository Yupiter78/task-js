function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const generator = generateSequence(4, 11);

/*
for (let value of generator) {
    console.log(value);
}*/

// console.log([...generator]);

function* generatePasswordCode() {
    yield* generateSequence(48, 57);
    yield* generateSequence(65, 90);
    yield* generateSequence(97, 122);
}

let str = "";
for (let code of generatePasswordCode()) {
    str += String.fromCodePoint(code)
}

console.log("str:", str);