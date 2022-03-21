

const fibonacciNumbers = (num) => {
    let x = 0;
    let y = 1;
    let sum = 0;
    let n = 1

    if (num === 0) n = 0;

    while (sum < num) {
        sum = x + y;
        console.log("sum:", sum);
        console.log("x:", x);
        console.log("y:", y);

        n++;
        x = y;
        y = sum;
    }
    if (sum === num) {
        return n;
    }
    return -1;
}

// console.log(fibonacciNumbers(8));
// console.log(fibonacciNumbers( 1));
// console.log(fibonacciNumbers(10));
// console.log(fibonacciNumbers(144));
// console.log(fibonacciNumbers(1597));
console.log(fibonacciNumbers(6557470319842));

