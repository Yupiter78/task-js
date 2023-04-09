const list = document.createElement("ol");

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        console.log(countries);
        countries.forEach(country => {
            const li = document.createElement("li");
            const flag = document.createElement("img");
            const p = document.createElement("p")
            console.log(country.flags.png);
            flag.src = country.flags.png;
            flag.alt = country.flags.alt;
            p.append(country.name?.common);
            li.append(p);
            li.append(flag);
            list.append(li);
        });
        document.body.append(list);
    })
    .catch(err => console.log(err))
    .finally()