const list = document.createElement("ol");

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        const countryList = countries.map(country => {
            return `
            <li>
            <p>${country.name?.common}</p>
            <img src=${country.flags.png} alt=${country.flags.alt} />
            </li>`;
        });

        list.innerHTML = countryList.join("");
        document.body.append(list);
    })
    .catch(err => console.log(err))
    .finally()