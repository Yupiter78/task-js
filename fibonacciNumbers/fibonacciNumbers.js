

const fibonacciNumbers = (num) => {
    let x = 0,
    y = 1,
    sum = 0,
    n = 2;

    if (num === 0) n = 1;

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

console.log(fibonacciNumbers(0));
console.log(fibonacciNumbers(1));
// console.log(fibonacciNumbers(10));
// console.log(fibonacciNumbers(144));
// console.log(fibonacciNumbers(1597));
// console.log(fibonacciNumbers(6557470319842));
// console.log(fibonacciNumbers(5527939700884757));

const cacheFibNums = {};
function getFibonacciNumbers(num) {
    if (num <= 1) {
        return num;
    } else {
        let firstFibNum, secondFibNum;

        if (cacheFibNums[num - 1]) {
            firstFibNum = cacheFibNums[num - 1];
        } else {
            firstFibNum = getFibonacciNumbers(num - 1);
            cacheFibNums[num - 1] = firstFibNum;
        }

        if (cacheFibNums[num - 2]) {
            secondFibNum = cacheFibNums[num - 2];
        } else {
            secondFibNum = getFibonacciNumbers(num - 2);
            cacheFibNums[num - 2] = secondFibNum;
        }

        return firstFibNum + secondFibNum;
    }
}

// console.log(getFibonacciNumbers(20));

console.log(Object.values(cacheFibNums));

const cacheFibNums_2 = {};

function getFibonacciNumbers_2(num) {
    if (num <= 1) {
        return num;
    } else {
        cacheFibNums_2[num - 1] || (cacheFibNums_2[num - 1] = getFibonacciNumbers_2(num - 1));
        cacheFibNums_2[num - 2] || (cacheFibNums_2[num - 2] = getFibonacciNumbers_2(num - 2));

        return cacheFibNums_2[num - 1] + cacheFibNums_2[num - 2];
    }
}

// console.log(getFibonacciNumbers_2(20));

console.log(Object.values(cacheFibNums_2));

function getFibonacciNumberNoCache(num) {
    if (num <= 1) {
        return num;
    } else {
        return getFibonacciNumberNoCache(num - 1) + getFibonacciNumberNoCache(num - 2);
    }
}

// console.log("getFibonacciNumberNoCache: ", getFibonacciNumberNoCache(30));


function bench(f) {
    let numF = 9

    let start = Date.now();
    for (let i = 0; i < 10000000; i++) f(numF);
    return Date.now() - start;
}

console.log( 'Время getFibonacciNumbers: ' + bench(getFibonacciNumbers) + 'мс' );
console.log( 'Время getFibonacciNumbers_2: ' + bench(getFibonacciNumbers_2) + 'мс' );
console.log( 'Время getFibonacciNumberNoCache: ' + bench(getFibonacciNumberNoCache) + 'мс' );



