

const worker = {
    getNoCacheFibNum(num) {
            return num <= 1 ? num
                : this.getNoCacheFibNum(num - 1) + this.getNoCacheFibNum(num - 2);
    },

    getSum() {
        arguments = typeof arguments[0] === "object" ? arguments[0] : arguments;
        return  Array.prototype.reduce.call(arguments, (sum, current) => sum + current, 0);
    }
}

function cachingDecorator(func, sum) {
    let cache = new Map();

    return function () {
        let key = arguments.length === 1 ? arguments[0] : sum(arguments);
        if (cache.has(key)) { // если кеш содержит такой x,
            return cache.get(key); // читаем из него результат
        }
        let result = func.call(this, key); // иначе, вызывает функцию с key

        cache.set(key, result); // и кешируем (запоминаем) результат вычислений
        return result;
    }
}

worker.getNoCacheFibNum = cachingDecorator(worker.getNoCacheFibNum, worker.getSum);

function bench(f) {
    let numF = 8;

    let start = Date.now();
    for (let i = 0; i < 100000; i++) {
        // console.log(`BENCH ${i}`);
        f(numF)
    }
    return Date.now() - start;
}

const benchmarkWorker = worker.getNoCacheFibNum.bind(worker);
console.log( 'Время worker.getNoCacheFibNum: ' + bench(benchmarkWorker) + 'мс' );