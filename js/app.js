const cart = document.querySelector('#cart');
const cartContainer = document.querySelector('#cart-items tbody');
const emptyCartButton = document.querySelector('#empty-cart');
const productsList = document.querySelector('#products-list');
let cartItems = [];

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        cartItems = JSON.parse(localStorage.getItem('items')) || [];
        showCart();
    });
    productsList.addEventListener('click', addCourse);
    cart.addEventListener('click', removeCourse);
    emptyCartButton.addEventListener('click', () => {
        cartItems = [];
        clearHTML();
    });
}

function addCourse(event) {
    event.preventDefault();
    
    if (event.target.classList.contains('add-to-cart')) {
        const selectedProduct = event.target.parentElement.parentElement;
        getProductData(selectedProduct);
    }
}

function removeCourse(event) {
    if (event.target.classList.contains('remove-course')) {
        const productId = event.target.getAttribute('data-id');

        // Get all items except for the one that matches the id
        cartItems = cartItems.filter(product => product.id !== productId);

        // Update view
        showCart();
    }
}

function getProductData(product) {
    const productInfo = {
        id: product.querySelector('button').getAttribute('data-id'),
        image: product.querySelector('img').src,
        title: product.querySelector('h5').textContent,
        price: product.querySelector('.price span').textContent,
        quantity: 1
    };

    // Check if item exists in cart
    const exists = cartItems.some(product => product.id === productInfo.id);
    if (exists) {
        // Update item quantity
        const products = cartItems.map(product => {
            if (product.id === productInfo.id) {
                product.quantity++
                return product;  // Return updated course
            } else {
                return product;  // Return not duplicated objects
            }
        });

        cartItems = [...products];
    } else {
        // Add element to cartItems array
        cartItems = [...cartItems, productInfo];
    }

    showCart();
}

function showCart() {
    // Clear HTML before generating cart items
    clearHTML();

    // Generate HTML
    cartItems.forEach(item => {
        const {id, image, title, price, quantity} = item;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${image}" width="100"></td>
            <td>${title}</td>
            <td>$${price}</td>
            <td>${quantity}</td>
            <td><a href="#" class="remove-product" data-id="${id}">X</td>
        `;

        cartContainer.appendChild(row);
    });

    // Save to localStorage
    syncStorage();
}

function syncStorage() {
    localStorage.setItem('products', JSON.stringify(cartItems));
}
 
function clearHTML() {
    while(cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
    }
}