const cart = document.querySelector('#cart');
const cartContent = document.querySelector('#cart-content');
const cartContainer = document.querySelector('#cart-items tbody');
const emptyCartButton = document.querySelector('#empty-cart');
const productsList = document.querySelector('#products-list');
const total = document.querySelector('#total');
const shoppingCart = document.querySelector('.fa-cart-shopping');
const emptyCartLabel = document.querySelector('#empty-cart-label');

let cartItems = [];

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        showCart();
    });
    productsList.addEventListener('click', addProduct);
    shoppingCart.addEventListener('click', toggleCartVisibility);
    cart.addEventListener('click', removeProduct);
    emptyCartButton.addEventListener('click', () => {
        // Remove all products from array
        cartItems = [];

        // Clear all table rows
        clearHTML();

        // Check how many items are on the cart
        checkCartLength();

        // Render view
        showCart();
    });
}

function addProduct(event) {
    event.preventDefault();
    
    if (event.target.classList.contains('add-to-cart')) {
        const selectedProduct = event.target.parentElement.parentElement;
        getProductData(selectedProduct);
    }
}

function toggleCartVisibility() {
    cart.classList.toggle('show-cart');

    if (cart.classList.contains('show-cart')) {
        cart.style.display = 'block';
        cart.style.position = 'absolute';
        cart.style.right = 0;
        cart.style.position = '%100';
        cart.style.zIndex = 2;
        // cart.style.backgroundColor = 'white';
        cart.style.padding = '20px';
        cart.style.minWidth = '500px';
        // cart.style.minHeight = '500px';


        checkCartLength();
    } else {
        cart.style.display = 'none';
    }
}

function checkCartLength() {
    if (cartItems.length === 0) {
        cartContent.classList.add('hidden');
        emptyCartLabel.classList.remove('hidden');
    } else {
        emptyCartLabel.classList.add('hidden');
        cartContent.classList.remove('hidden');
    }
}

function removeProduct(event) {
    if (event.target.classList.contains('remove-product')) {
        const productId = event.target.getAttribute('data-id');

        // Get all items except for the one that matches the id
        cartItems = cartItems.filter(product => product.id !== productId);

        // Check how many items are in the cart
        checkCartLength();

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

    total.textContent = '';

    let subtotal = 0;

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
        row.classList.add('bg-dark', 'text-white');

        subtotal += (Number(price) * quantity);
        
        cartContainer.appendChild(row);
    });
    
    total.textContent = `$${subtotal}`;
}

function clearHTML() {
    while(cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
    }
}
