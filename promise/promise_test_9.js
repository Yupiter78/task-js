function getRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText))
            } else {
                reject(new Error(`data loading error: ${xhr.responseText}`))
            }
        };
        xhr.onerror = () => reject(new Error(`Network error`));
        xhr.send();
    })
}

const url = "https://jsonplaceholder.typicode.com/todos/1";
const url2 = "https://jsonplaceholder.typicode.com/todos/2";

/*
getRequest(url)
    .then(data => console.log("Data uploaded successfully:", data))
    .catch(error => console.log("An error has occurred:", error));*/


(async function () {
    try {
        const data = await getRequest(url);
        console.log("Data uploaded successfully:", data);
        if (data) {
            const newData = await getRequest(url2);
            console.log("newData uploaded successfully:", newData);
        }


    } catch (error) {
        console.log("An error has occurred:", error);
    }
})();

