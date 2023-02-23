// try..catch
let json = '{"name":"John", "age": 30}'; // data from the server

let user = JSON.parse(json); // convert the text representation to JS object

// now user is an object with properties from the string
console.log( "user.name:", user.name, "//=> John" ); // John
console.log( "user.age:", user.age, "//=> 30" );  // 30

let json_2 = "{ bad json }";

try {

    let user = JSON.parse(json_2); // <-- when an error occurs...
    console.log( user.name ); // doesn't work

} catch (err) {
    // ...the execution jumps here
    console.log( "Our apologies, the data has errors, we'll try to request it one more time." );
    console.log( "err.name:", err.name );
    console.log( "err.message:", err.message );
}