function getDataSimultaneously(urls) {
    const promises = urls.map(url => fetch(url).then(response => response.json()));
    return Promise.all(promises);
}

// usage example
getDataSimultaneously([
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3"
]).then(results => console.log(results));

async function f() {return 1;}
// console.log(f());
f().then(console.log); // 1
async function f2() {return Promise.resolve(1);}
// console.log(f2());
f2().then(console.log); // 1
