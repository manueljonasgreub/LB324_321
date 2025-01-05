const products = [
    {
        id: 1,
        name: "Schwimmende Badeente",
        price: 23.99,
        description: "Was für eine schöne Ente!",
        imageURL: "https://i.imgur.com/example1.png"
    },
    {
        id: 2,
        name: "Gelbe Badeente",
        price: 19.99,
        description: "Die klassische gelbe Ente!",
        imageURL: "https://i.imgur.com/example2.png"
    }
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const checkoutButton = document.getElementById("checkout-button");
const checkoutSection = document.getElementById("checkout");
const checkoutForm = document.getElementById("checkout-form");

let cart = [];

// Render products
function renderProducts() {
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.imageURL}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price.toFixed(2)} €</p>
            <button onclick="addToCart(${product.id})">In den Warenkorb</button>
        `;
        productList.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ productId: product.id, quantity: 1, price: product.price });
    }
    updateCart();
}

// Update cart
function updateCart() {
    cartItems.innerHTML = "";
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Ihr Warenkorb ist leer.</p>";
        checkoutButton.disabled = true;
        return;
    }

    checkoutButton.disabled = false;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span>${product.name} (${item.quantity})</span>
            <span>${(item.quantity * item.price).toFixed(2)} €</span>
            <button onclick="removeFromCart(${item.productId})">Entfernen</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    updateCart();
}

// Handle checkout form
checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const order = {
        customerName: checkoutForm.name.value,
        address: checkoutForm.address.value,
        items: cart
    };

    // Send order to API (example only)
    console.log("Order submitted:", order);

    alert("Vielen Dank für Ihre Bestellung!");
    cart = [];
    updateCart();
    checkoutForm.reset();
    checkoutSection.classList.add("hidden");
});

checkoutButton.addEventListener("click", () => {
    checkoutSection.classList.remove("hidden");
});

// Initial rendering
renderProducts();
