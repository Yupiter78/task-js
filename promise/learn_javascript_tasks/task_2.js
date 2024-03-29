/*Below you can find the “rethrow” example. Rewrite it using async/await instead of .then/catch.

And get rid of the recursion in favour of a loop in demoGithubUser: with async/await that becomes easy to do.*/

/*class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// Ask for a user name until github returns a valid user
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      console.log(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        console.log("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();*/

class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = this.constructor.name;
        this.response = response;
    }
}

async function loadJson(url) {
    const response = await fetch(url);

    if (response.status === 200) {
        return response.json();
    } else {
        throw new HttpError(response);
    }
}

// Ask for a user name until github returns a valid user
async function demoGithubUser() {
    let user = null;
    do {
        let name = prompt("Enter a name?", "iliakan");
        try {
             user = await loadJson(`https://api.github.com/users/${name}`);
            console.log(`Full name: ${user.name}.`);
            return user;
        } catch (err) {
            if (err instanceof HttpError && err.response.status === 404) {
                console.log("No such user, please reenter.");
            } else {
                throw err;
            }
        }
    } while (!user)

}

demoGithubUser();

async function demoGithubUser_2() {
    let user = null;
    while (true) {
        let name = prompt("Enter a name?", "iliakan");
        try {
            user = await loadJson(`https://api.github.com/users/${name}`);
            break;
        } catch (err) {
            if (err instanceof HttpError && err.response.status === 404) {
                console.log("No such user, please reenter.");
            } else {
                throw err;
            }
        }
    }
    console.log(`Full name: ${user.name}.`);
    return user;
}

demoGithubUser_2();