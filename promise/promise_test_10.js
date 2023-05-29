async function getDataSequentially(urls) {
    const results = [];
    for (const url of urls) {
        const response = await fetch(url);
        const data = await response.json();
        results.push(data);
    }
    return results;
}

// usage example
getDataSequentially([
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3"
]).then(results => console.log(results));


