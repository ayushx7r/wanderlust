let taxSwitch = document.querySelector("#flexSwitchCheckDefault");
let beforeTaxes = document.querySelectorAll(".beforeTax");

for(let beforeTax of beforeTaxes) {
    let afterTax = beforeTax.previousElementSibling;
    const priceString = afterTax.innerText;
    const cleanedString = priceString.replace(/[^0-9.,-]/g, '');
    const numericString = cleanedString.replace(/,/g, '');
    const afterTaxPrice = parseFloat(numericString);

    let beforeTaxPrice = Math.ceil(afterTaxPrice * 100 / 118);
    beforeTax.innerHTML = `&#8377; ${beforeTaxPrice.toLocaleString("en-IN")} `;
}





taxSwitch.addEventListener('click', () => {
    let prices = document.querySelectorAll(".priceInfo");
    for(let price of prices) {
        price.classList.toggle("hide");
    }
})