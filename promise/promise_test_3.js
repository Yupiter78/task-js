
/*const request = (url, success, error) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      xhr.status === 200 ? success(xhr.response) : error(xhr.statusText);
    }
    xhr.onerror = () => error(xhr.statusText);
    xhr.send();
  }
  document.querySelector('#get-text').onclick = () => {
    request('https://restcountries.com/v3.1/all', data => {
      document.querySelector('#result').innerHTML = data;
    }, error => {
      console.error(error);
    });
  }*/

const request = (url) => {

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        console.log(xhr);
        xhr.open('GET', url);
        xhr.onload = () => {
            console.log(xhr.status);
            xhr.status === 200 ? resolve(xhr.response) : reject(xhr.statusText);
        }
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    })

}
document.querySelector('#get-text').onclick = () => {
    request('https://restcountries.com/v3.1/all')
        .then(data => document.querySelector('#result').innerHTML = data)
        .catch(error => console.error(error));
}
