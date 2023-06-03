//using the methods of the global object axios
    axios.get("https://jsonplaceholder.typicode.com/todos/1")
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });