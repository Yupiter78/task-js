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
   // if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
    log( 'catch' );
} finally {
    log( 'finally' );
}

// let num = +prompt("Enter a positive integer number?", 35)

let diff, result;

function fib(n) {
    if (n < 0 || Math.trunc(n) !== n) {
        throw new Error("Must not be negative, and also an integer.");
    }
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
    result = fib(num = 35);
} catch (err) {
    result = 0;
} finally {
    diff = Date.now() - start;
}

log(result || "error occurred");

log( `execution took ${diff}ms` );

// In the example below, there’s a return in try.
// In this case, finally is executed just before the control returns to the outer code.
function func() {

    try {
        return 1;

    } catch (err) {
        /* ... */
    } finally {
        log( 'finally' );
    }
}

log( func() ); // first works log from finally, and then this one

window.onerror = function(message, url, line, col, error) {
    log(`${message}\n В ${line}:${col} на ${url}`);
};

function readData_2() {
   // badFunc(); // Whoops, something went wrong!
}

readData_2();


class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError extends MyError {
    constructor(message) {
        super(message); // (1)
    }
}
log("______:", new ValidationError("Whoops!"));
function test() {
    throw new ValidationError("Whoops!");
}

try {
    test();
} catch(err) {
    log(err.message); // Whoops!
    log("err.name:", err.name, "//=> ValidationError"); // ValidationError
    log(err.stack); // a list of nested calls with line numbers for each
}

// Usage
function readUser(json) {
    let user = JSON.parse(json);

    if (!user.age) {
        throw new ValidationError("No field: age");
    }
    if (!user.name) {
        throw new ValidationError("No field: name");
    }

    return user;
}

// Working example with try..catch

try {
    let user = readUser('{ "age": 25 }');
} catch (err) {
    if (err instanceof ValidationError) {
        log("Invalid data: " + err.message); // Invalid data: No field: name
    } else if (err instanceof SyntaxError) { // (*)
        log("JSON Syntax Error: " + err.message);
    } else {
        throw err; // unknown error, rethrow it (**)
    }
}

class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super("No property: " + property);
        this.property = property;
    }
}

log("+++++++:", new PropertyRequiredError("age"));

// Usage
function readUser_2(json) {
    let user = JSON.parse(json);

    if (!user.age) {
        throw new PropertyRequiredError("age");
    }
    if (!user.name) {
        throw new PropertyRequiredError("name");
    }

    return user;
}

// Working example with try..catch

try {
    let user = readUser_2('{ "age": 25 }');
} catch (err) {
    if (err instanceof ValidationError) {
        log("Invalid data: " + err.message); // Invalid data: No property: name
        log("err.name:", err.name, "//=> PropertyRequiredError"); // PropertyRequiredError
        log(err.property); // name
    } else if (err instanceof SyntaxError) {
        log("JSON Syntax Error: " + err.message);
    } else {
        throw err; // unknown error, rethrow it
    }
}


