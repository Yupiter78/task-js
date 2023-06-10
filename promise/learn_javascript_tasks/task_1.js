/*Rewrite using async/await
Rewrite this example code from the chapter Promises chaining using async/await instead of .then/catch:

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404*/


/*
async function loadJson(url) {

    try {
        console.log("START");
        const response = await fetch(url);
        console.log("TRY");
        if (response.status === 200) {
                    return await response.json();
                }
        throw new Error(`STATUS: ${response.status}`);

    } catch (e) {
        console.log(e);
    }

}

loadJson('https://javascript.info/no-such-user.json');*/


async function loadJson(url) {

        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        }

        throw new Error(`STATUS: ${response.status}`);

}

loadJson('https://javascript.info/no-such-user.json')
    .catch((e) => console.log(e));