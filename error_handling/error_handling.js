const log = console.log;

// try..catch
let json = '{"name":"John", "age": 30}'; // data from the server

let user = JSON.parse(json); // convert the text representation to JS object

// now user is an object with properties from the string
log( "user.name:", user.name, "//=> John" ); // John
log( "user.age:", user.age, "//=> 30" );  // 30

let json_2 = "{ bad json }";

try {

    let user = JSON.parse(json_2); // <-- when an error occurs...
    log( user.name ); // doesn't work

} catch (err) {
    // ...the execution jumps here
    log( "Our apologies, the data has errors, we'll try to request it one more time." );
    log( "err.name:", err.name );
    log( "err.message:", err.message );
}

// throw

let json_3 = '{ "age": 30 }'; // incomplete data

try {

    let user = JSON.parse(json_3); // <-- no errors

    if (!user.name) {
        throw new SyntaxError("Incomplete data: no name"); // (*)
    }

    log( user.name );

} catch (err) {
    log( "JSON Error: " + err.message ); // JSON Error: Incomplete data: no name
}


function readData() {
    let json = '{ "age": 30 }';

    try {
        // let user = JSON.parse(json);
        //
        // if (!user.name) {
        //     throw new SyntaxError("Данные неполны: нет имени");
        // }

        blabla(); // неожиданная ошибка

        log( user.name );
    } catch (err) {
        // ...
        if (!(err instanceof SyntaxError)) {
            throw err; // rethrow (don't know how to deal with it)
        }
    }
}

try {
    readData();
} catch (err) {
    log( "External catch got: " + err ); // caught it!
}


try {
    log( 'try' );
    if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
    log( 'catch' );
} finally {
    log( 'finally' );
}

let num = +prompt("Enter a positive integer number?", 35)

let diff, result;

function fib(n) {
    if (n < 0 || Math.trunc(n) !== n) {
        throw new Error("Must not be negative, and also an integer.");
    }
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
    result = fib(num);
} catch (err) {
    result = 0;
} finally {
    diff = Date.now() - start;
}

log(result || "error occurred");

log( `execution took ${diff}ms` );