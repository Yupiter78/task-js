

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        const template = countries.map(country => (
            `<li>
                <p>${country.name?.common}</p>
                <img src=${country.flags.png} alt=${country.flags.alt} />
            </li>`));
        document.body.innerHTML = `
        <ol>
            ${template.join("")}
        </ol>`;
    })
    .catch(({name, message}) => console.log(name, message))
    .finally();