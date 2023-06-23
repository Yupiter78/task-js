function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const generator = generateSequence(4, 11);
console.log("generator:", generator);

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
function* generatePasswordCode_2() {
    for (let i = 48; i <= 57; i++) yield i;
    for (let i = 65; i <= 90; i++) yield i;
    for (let i = 97; i <= 122; i++) yield i;
}

let str_2 = "";
for (let code of generatePasswordCode_2()) {
    str_2 += String.fromCodePoint(code);
}

console.log("str_2:", str_2);

console.log("str === str_2:", str === str_2);