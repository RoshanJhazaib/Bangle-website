 // Product Data (images, names, descriptions, prices, colors, and sizes)
 const products = [
    { name: "Golden Bangle", price: 25, img: "https://via.placeholder.com/350x300", description: "A beautiful golden bangle", colors: ["Gold", "Silver"], sizes: ["Small", "Medium", "Large"] },
    { name: "Silver Bangle", price: 30, img: "https://via.placeholder.com/350x300", description: "Elegant silver bangle", colors: ["Silver", "Gold"], sizes: ["Small", "Medium"] },
    { name: "Diamond Bangle", price: 50, img: "https://via.placeholder.com/350x300", description: "A premium diamond bangle", colors: ["White", "Blue"], sizes: ["Medium", "Large"] },
    { name: "Pearl Bangle", price: 35, img: "https://via.placeholder.com/350x300", description: "Sophisticated pearl bangle", colors: ["Pearl White", "Gold"], sizes: ["Small", "Large"] },
    { name: "Ruby Bangle", price: 45, img: "https://via.placeholder.com/350x300", description: "A ruby-studded bangle", colors: ["Red", "Gold"], sizes: ["Medium", "Large"] },
    { name: "Emerald Bangle", price: 40, img: "https://via.placeholder.com/350x300", description: "Elegant emerald bangle", colors: ["Green", "Gold"], sizes: ["Small", "Medium"] }
];

let cart = [];

// Function to render product cards
function renderProductCards(products) {
    const productCardsContainer = document.getElementById('productCards');
    productCardsContainer.innerHTML = ''; // Clear previous products
    products.forEach(product => {
        const productCard = `
            <div class="col-md-4">
                <div class="card product-card">
                    <img src="${product.img}" class="card-img-top product-img" alt="${product.name}">
                    <div class="card-body product-details">
                        <h5 class="product-name">${product.name}</h5>
                        <p class="product-description">${product.description}</p>
                        <p class="price">$${product.price}</p>

                        <!-- Color Selection -->
                        <div class="color-options">
                            <strong>Color:</strong>
                            ${product.colors.map(color => `<span class="color-option">${color}</span>`).join('')}
                        </div>

                        <!-- Size Selection -->
                        <div class="size-options">
                            <strong>Size:</strong>
                            ${product.sizes.map(size => `<span class="size-option">${size}</span>`).join('')}
                        </div>

                        <!-- Quantity Buttons -->
                        <div class="quantity-btns">
                            <button class="btn btn-light minus-btn">-</button>
                            <input type="number" class="quantity" value="1" min="1" class="form-control w-25" readonly>
                            <button class="btn btn-light plus-btn">+</button>
                        </div>

                        <!-- Add to Cart Button -->
                        <button class="btn add-to-cart-btn mt-3" data-product="${product.name}" data-price="${product.price}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        productCardsContainer.innerHTML += productCard;
    });
}

// Handle Add to Cart
function handleAddToCart(productName, productPrice) {
    const quantity = parseInt(document.querySelector(`.quantity[data-product="${productName}"]`).value);
    cart.push({ name: productName, price: productPrice, quantity: quantity });
    updateCartPreview();
}

// Update Cart Preview
function updateCartPreview() {
    const cartPreview = document.getElementById('cartPreview');
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(li);
    });
    cartPreview.style.display = cart.length > 0 ? 'block' : 'none';
}

// Event Listeners
document.getElementById('seeMoreBtn').addEventListener('click', () => {
    renderProductCards(products);
});

// Render initial products
renderProductCards(products);

// Add event listeners for Add to Cart buttons dynamically
document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('add-to-cart-btn')) {
        const productName = e.target.getAttribute('data-product');
        const productPrice = parseFloat(e.target.getAttribute('data-price'));
        handleAddToCart(productName, productPrice);
    }
});

// Adjust Quantity using + and -
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('plus-btn')) {
        const quantityInput = e.target.previousElementSibling;
        quantityInput.value = parseInt(quantityInput.value) + 1;
    } else if (e.target.classList.contains('minus-btn')) {
        const quantityInput = e.target.nextElementSibling;
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    }
});
