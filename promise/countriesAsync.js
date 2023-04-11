(async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        ((countries) => {
            const template = countries.map(country => (
                `<li>
                    <p>${country.name?.common}</p>
                    <img src=${country.flags.png} alt=${country.flags.alt} />
                </li>`));
            document.body.innerHTML = `
            <ol>
                ${template.join("")}
            </ol>`;
        })(await response.json());
    } catch ({name, message}){
        console.log(name, message);
    } finally {
        console.log("finally")
    }
})();