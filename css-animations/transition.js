const stripe = document.querySelector("#stripe");
console.log("stripe:", stripe);

stripe.addEventListener("click", () => stripe.classList.add("animate"));