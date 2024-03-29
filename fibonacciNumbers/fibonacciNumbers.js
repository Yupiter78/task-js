

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

// console.log(fibonacciNumbers(0));
// console.log(fibonacciNumbers(1));
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

// console.log(Object.values(cacheFibNums));

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

// console.log(Object.values(cacheFibNums_2));

function getFibonacciNumberNoCache(num) {
    if (num <= 1) {
        return num;
    } else {
        return getFibonacciNumberNoCache(num - 1) + getFibonacciNumberNoCache(num - 2);
    }
}

// console.log("getFibonacciNumberNoCache: ", getFibonacciNumberNoCache(7));

function hash() {
    return  [].join.call(arguments);
}

// console.log(hash(1, 2));



const worker = {
    getNoCacheFibNum(num) {
        console.log("============START==WORKER===========");
        console.log("num_worker: ", num);
        if (num <= 1) {
            return num;
        } else {
            console.log("this_worker: ", this);
            return this.getNoCacheFibNum(num - 1) + this.getNoCacheFibNum(num - 2);
        }
    },

    getSum() {
        console.log("arguments_getSum: ", arguments);
        console.log("typeof arguments[0]: ", typeof arguments[0]);
        arguments = typeof arguments[0] === "object" ? arguments[0] : arguments;
        return  Array.prototype.reduce.call(arguments, (sum, current) => sum + current, 0);
    }
}

// console.log("worker.getSum(2, 5): ", worker.getSum(3, 5));
// console.log("worker.getNoCacheFibNum(7): ", worker.getNoCacheFibNum(7));


// function cachingDecorator(func) {
//     let cache = new Map();
//
//     return function(x) {
//         if (cache.has(x)) { // если кеш содержит такой x,
//             return cache.get(x); // читаем из него результат
//         }
//
//         let result = func(x); // иначе, вызывает функцию с x
//
//         cache.set(x, result); // и кешируем (запоминаем) результат вычислений
//         return result;
//     }
// }

function cachingDecorator(func, sum) {
    let cache = new Map();

    return function() {
        console.log("------------ARGUMENTS: ------------", arguments);
        let key = arguments.length === 1 ? arguments[0] : sum(arguments);
        console.log("key_cache: ", key);
        console.log("___________cache.has(key):______________ ", cache.has(key));
        if (cache.has(key)) { // если кеш содержит такой x,
            console.log("cache.has(key): ", cache.has(key));
            return cache.get(key); // читаем из него результат
        }

        // console.log("func_cache: ", func);
        console.log("this_cache: ", this);
        let result = func.call(this, key); // иначе, вызывает функцию с x
        console.log("RESULT: ", result);

        cache.set(key, result); // и кешируем (запоминаем) результат вычислений
        console.log("cache: ", cache);
        return result;
    }
}

worker.getNoCacheFibNum = cachingDecorator(worker.getNoCacheFibNum, worker.getSum);
// console.log("worker.getNoCacheFibNum: ", worker.getNoCacheFibNum);
console.log(worker.getNoCacheFibNum(2, 5));

const getCacheFibNum = cachingDecorator(getFibonacciNumberNoCache);
// console.log("getCacheFibNum: ", getCacheFibNum);

const bench = (f) => {
    console.log("__________________START_BENCH________________________")

    let numF = 8;

    let start = Date.now();
    for (let i = 0; i < 10; i++) {
        console.log(`**********BENCH ${i}***********`);
        f.call(this, numF)
    }
    return Date.now() - start;
}

// const benchmark = cachingDecorator(worker.getNoCacheFibNum, worker.getSum);
// console.log("benchmark: ", benchmark);
// const benchmarkWorker = benchmark.bind(worker);
// console.log("benchmarkWorker: ", benchmarkWorker);


// console.log( 'Время getCacheFibNum: ' + bench(getCacheFibNum) + 'мс' );
// console.log( 'Время getFibonacciNumbers: ' + bench(getFibonacciNumbers) + 'мс' );
// console.log( 'Время getFibonacciNumbers_2: ' + bench(getFibonacciNumbers_2) + 'мс' );
// console.log( 'Время getFibonacciNumberNoCache: ' + bench(getFibonacciNumberNoCache) + 'мс' );
// console.log( 'Время worker.getNoCacheFibNum: ' + bench(benchmarkWorker) + 'мс' );




