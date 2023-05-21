
// Create a function that makes an API request and returns a Promise
function getData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.ok) {
// If the response is successful, parse JSON and pass it through resolve
                    response.json().then(data => {
                        resolve(data);
                    });
                } else {
// In case of error, pass it through reject
                    reject(new Error(`Error ${response.status}`));
                }
            })
            .catch(error => {
// In case of error, pass it through reject
                reject(error);
            });
    });
}

// Use the function to request data
getData('https://jsonplaceholder.typicode.com/todos/1')
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });