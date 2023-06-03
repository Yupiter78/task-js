function fetchDataFromAPI(endpointURL) {
    // Check if data is already cached
    const cachedData = localStorage.getItem(endpointURL);

    if (cachedData !== null) {
        // Data is cached, return cached data
        return JSON.parse(cachedData);
    } else {
        // Data is not cached, fetch from API
        return fetch(endpointURL)
            .then(response => response.json())
            .then(data => {
                // Cache the response
                localStorage.setItem(endpointURL, JSON.stringify(data));
                // Return the response
                return data;
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}

 // Fetches posts data from JSONPlaceholder API and caches it locally
const endpointURL = 'https://jsonplaceholder.typicode.com/posts';
const postsData = fetchDataFromAPI(endpointURL);
console.log(postsData); // Returns the cached or fetched posts data