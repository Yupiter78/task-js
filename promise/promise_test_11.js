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