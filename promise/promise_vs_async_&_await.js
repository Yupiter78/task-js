function fetchUserData(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            const { name, email } = data;
            return { name, email };
        })
        .catch(error => console.error(error));
}

fetchUserData(7)
    .then(userData => console.log(userData))
    .catch(error => console.error(error));


async function fetchUserDataAsync(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await response.json();
        const { name, email } = data;
        return { name, email };
    } catch (error) {
        console.error(error);
    }
}

async function getUserDataAsync() {
    try {
        const userData = await fetchUserDataAsync(7);
        console.log(userData);
    } catch (error) {
        console.error(error);
    }
}

getUserDataAsync();