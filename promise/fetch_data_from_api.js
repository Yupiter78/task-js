function fetchDataFromAPI(endpointURL) {
    // Check if data is already cached
    const cachedData = localStorage.getItem(endpointURL);

    if (cachedData !== null) {
        console.log("localStorage");
        // Data is cached, return cached data
        return Promise.resolve(JSON.parse(cachedData));
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
const postsData = fetchDataFromAPI(endpointURL).then(data => console.log(data));
//console.log(postsData); // Returns the cached or fetched posts data


 //Fetches users data from Reqres API and caches it locally

const endpointURL_2 = 'https://reqres.in/api/users?page=2';
const usersData = fetchDataFromAPI(endpointURL_2).then(data => console.log(data));
//console.log(usersData); // Returns the cached or fetched users data for page 2


 // Fetches users data from MockAPI API and caches it locally

/*const endpointURL_3 = 'https://mockapi.io/api/v1/users';
const usersData_2 = fetchDataFromAPI(endpointURL_3).then(data => console.log(data));*/
//console.log(usersData_2); // Returns the cached or fetched users data



// Fetches users data from Beeceptor API and caches it locally

/*const endpointURL_4 = 'https://my-api.beeceptor.com/users';
const usersData_3 = fetchDataFromAPI(endpointURL_4).then(data => console.log(data));
console.log(usersData_3); // Returns the cached or fetched users data*/

async function fetchDataWithCache(url) {
    const cacheKey = "cache:" + url;
    const cache = localStorage.getItem(cacheKey);

    if (cache) {
        console.log("localStorage");
        return JSON.parse(cache);
    } else {
        const response = await fetch(url);
        const data = await response.json();
        localStorage.setItem(cacheKey, JSON.stringify(data));
        return data;
    }
}

// usage example
fetchDataWithCache("https://jsonplaceholder.typicode.com/posts/1")
    .then(data => console.log(data))
    .catch(error => console.error(error));

