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