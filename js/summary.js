const tableContent = document.querySelector('#cart-items tbody');
const total = document.querySelector('#total');

let products = [];
let subtotal = 0;

document.addEventListener('DOMContentLoaded', () => {
    products = JSON.parse(localStorage.getItem('products'));
    showProducts();
});

function showProducts() {
    products.forEach(product => {
        const { title, price, image, quantity, id } = product;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${image}" width="100"></td>
            <td>${title}</td>
            <td>$${price}</td>
            <td>${quantity}</td>
        `;
        row.classList.add('bg-dark', 'text-white');

        subtotal += (Number(price) * quantity);
        
        tableContent.appendChild(row);
    });

    total.textContent = `$${subtotal}`;
}