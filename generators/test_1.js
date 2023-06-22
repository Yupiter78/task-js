function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
}

const generator = generateSequence();
console.log(generator.toString());
const one = generator.next();
const two = generator.next();
const three = generator.next();
console.log(JSON.stringify(one, null, 2));
console.log(one);
console.log(two);
console.log(three);


const generator_2 = generateSequence();
for(let value of generator_2) {
    console.log("value:", value);
}

const sequence = [0, ...generateSequence()];
console.log("sequence:", sequence);

