async function retryApiRequest(path, retries = 3, delay = 1000) {
    const url = `https://jsonplaceholder.typicode.com/${path}`;
    for (let i = 0; i < retries; i++) {
        try {
            console.log("first try");
            const response = await fetch(url);
            console.log(response.status);
            console.log(response.ok);
            if (!response.ok) {
                throw new Error('_____Request failed______');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error(`Failed to fetch data after ${retries} retries`);
}

// Example usage:
(async () => {
    try {
        const posts = await retryApiRequest('posts');
        console.log(posts);
    } catch (error) {
        console.error(error);
    }
})();

// Example usage:
(async () => {
    try {
        const posts = await retryApiRequest('posts/1000', 5, 2000);
        console.log(posts);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
})();

const multipleRequest = async (fn, limit) => {
    let retries = 0;
    while (retries < limit) {
        try {
            console.log("second try");
            const response = await fn();
            console.log(response.ok);
            console.log(response.status);
            if (!response.ok) throw new Error(`a request error occurred`);
            return response.json();
        } catch (e) {
            console.log(e.message);
            retries++;
        }
    }
    throw new Error(`function failed after ${limit} retries`);
}

// usage example
multipleRequest(() => fetch(`https://jsonplaceholder.typicode.com/posts`), 3)
    .then(data => console.log(data))
    .catch(error => console.error(error.message));