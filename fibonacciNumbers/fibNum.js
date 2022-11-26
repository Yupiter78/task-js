

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

function cachingDecorator(func, sum) {
    let cache = new Map();

    return function () {
        console.log("------------ARGUMENTS: ------------", arguments);
        let key = arguments.length === 1 ? arguments[0] : sum(arguments);
        console.log("key_cache: ", key);
        console.log("Cache: ", cache);
        console.log("___________cache.has(key):______________ ", cache.has(key));
        if (cache.has(key)) { // если кеш содержит такой x,
            console.log("cache.has(key): ", cache.has(key));
            console.log("cache.get(key): ", cache.get(key));
            return cache.get(key); // читаем из него результат
        }

        // console.log("func_cache: ", func);
        console.log("this_cache: ", this);
        let result = func.call(this, key); // иначе, вызывает функцию с key
        console.log("RESULT: ", result);

        cache.set(key, result); // и кешируем (запоминаем) результат вычислений
        console.log("cache: ", cache);
        return result;
    }
}

worker.getNoCacheFibNum = cachingDecorator(worker.getNoCacheFibNum, worker.getSum);
console.log("worker.getNoCacheFibNum: ", worker.getNoCacheFibNum);
// console.log(worker.getNoCacheFibNum(2, 5));


// console.log("getCacheFibNum: ", getCacheFibNum);

function bench(f) {
    console.log("__________________START_BENCH________________________")

    let numF = 8;

    let start = Date.now();
    for (let i = 0; i < 100000; i++) {
        console.log(`**********BENCH ${i}***********`);
        f(numF)
    }
    return Date.now() - start;
}

// const benchmark = cachingDecorator(worker.getNoCacheFibNum, worker.getSum);
// console.log("benchmark: ", benchmark);
const benchmarkWorker = worker.getNoCacheFibNum.bind(worker);
console.log("benchmarkWorker: ", benchmarkWorker);


// console.log( 'Время getCacheFibNum: ' + bench(getCacheFibNum) + 'мс' );
// console.log( 'Время getFibonacciNumbers: ' + bench(getFibonacciNumbers) + 'мс' );
// console.log( 'Время getFibonacciNumbers_2: ' + bench(getFibonacciNumbers_2) + 'мс' );
// console.log( 'Время getFibonacciNumberNoCache: ' + bench(getFibonacciNumberNoCache) + 'мс' );
// console.log( 'Время worker.getNoCacheFibNum: ' + bench(benchmarkWorker) + 'мс' );
console.log( 'Время worker.getNoCacheFibNum: ' + bench(benchmarkWorker) + 'мс' );