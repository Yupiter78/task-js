/*async function getDataSequentially(urls) {
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
]).then(results => console.log(results));*/

const urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://api.github.com/users/jeresig'
];

const getResponses = async (urls) => {
    try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        return  await Promise.all(responses.map(async (response) => {
            const { name, location } = await response.json();
            return { name, location };
        }));
    } catch (error) {
        console.log(error);
    }
};

getResponses(urls)
    .then(responseData => console.log({ responseData }))
    .catch(error => console.log(error));





