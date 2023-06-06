async function retryApiRequest(path, retries = 3, delay = 1000) {
    const url = `https://jsonplaceholder.typicode.com/${path}`;
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Request failed');
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