//Счетчик через замыкание

function makeCounter() {
    let count = 0;

    return function() {
        return count++; // есть доступ к внешней переменной "count"
    };
}

let counter = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1
console.log( counter() ); // 2


//Счетчик через function custom properties
function makeCounter_2() {
    // вместо
    // let count = 0

    function counter() {
        return counter.count++;
    }

    counter.count = 0;

    return counter;
}

let counter_2 = makeCounter_2();
console.log( counter_2() ); // 0
console.log( counter_2() ); // 1

//Свойство count теперь хранится прямо в функции, а не в её внешнем лексическом окружении.


