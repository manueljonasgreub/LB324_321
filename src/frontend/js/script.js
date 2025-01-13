let products = [
    // Die Produktliste
    { "id": 1, "name": "Standard Ente", "description": "Die klassische gelbe Gummiente für jedes Badeerlebnis.", "price": 5.99, "imageURL": "https://i.imgur.com/kdcueaj.png" },
    { "id": 2, "name": "Pinke Ente", "description": "Eine pinke Ente für alle, die Farbe ins Spiel bringen möchten.", "price": 6.49, "imageURL": "https://i.imgur.com/rPyJadu.png" },
    { "id": 3, "name": "Lesende Ente", "description": "Perfekt für Buchliebhaber: eine Ente mit Buch.", "price": 7.99, "imageURL": "https://i.imgur.com/xboFWI0.png" },
    { "id": 4, "name": "Schlafende Ente", "description": "Diese entspannte Ente mit Schlafmütze sorgt für ruhige Momente.", "price": 6.99, "imageURL": "https://i.imgur.com/kBNaBt8.png" },
    { "id": 5, "name": "Einhorn Ente", "description": "Eine magische Einhorn-Ente für zauberhafte Stunden im Wasser.", "price": 8.49, "imageURL": "https://i.imgur.com/CcK6Hqc.png" },
    { "id": 6, "name": "Coole Ente", "description": "Mit Sonnenbrille ausgestattet: Diese Ente ist einfach cool.", "price": 7.49, "imageURL": "https://i.imgur.com/0FcrS7n.png" },
    { "id": 7, "name": "Rennfahrer Ente", "description": "Die Rennfahrer-Ente ist bereit, jedes Rennen zu gewinnen!", "price": 7.99, "imageURL": "https://i.imgur.com/kAfnoVs.png" },
    { "id": 8, "name": "Tennis Ente", "description": "Für Sportfans: Die Tennis-Ente bringt Bewegung ins Wasser.", "price": 7.99, "imageURL": "https://i.imgur.com/3mku1IW.png" },
    { "id": 9, "name": "Kuh Ente", "description": "Eine charmante Ente im Kuh-Look – ideal für Tierliebhaber.", "price": 6.99, "imageURL": "https://i.imgur.com/jo38IzD.png" },
    { "id": 10, "name": "Dino Ente", "description": "Eine Dino-Ente für kleine und große Dinosaurier-Fans.", "price": 8.99, "imageURL": "https://i.imgur.com/aQSwuam.png" },
    { "id": 11, "name": "Flamingo", "description": "Flamingo.", "price": 8.49, "imageURL": "https://i.imgur.com/fuJcQd1.png" }
];

let cart = [];

function loadProducts() {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
        let productHTML = `
            <div class="product">
                <img src="${product.imageURL}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">CHF ${product.price}</p>
                <button class="btn-add-to-cart" onclick="addToCart(${product.id})">In den Warenkorb</button>
            </div>
        `;
        productList.innerHTML += productHTML;
    });
}

// Funktion, um den Warenkorb anzuzeigen und die Anzahl zu aktualisieren
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    if (count === 0) {
        cartCount.classList.remove('show');
    } else {
        cartCount.classList.add('show');
    }
}

function addToCart(productId) {
    const product = products.find(prod => prod.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
    updateCartCount();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.imageURL}" alt="${item.name}">
                <div>
                    <p>${item.name} (x${item.quantity})</p>
                    <p>CHF ${itemTotal.toFixed(2)}</p>
                </div>
                <span class="remove-item" onclick="removeFromCart(${item.id})">✖</span>
            </div>
        `;
    });

    cartTotalElement.innerText = `Gesamt: CHF ${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartCount();
}

function orderNow() {
    if (cart.length > 0) {
        // Weiterleitung zur bestellung.html im html Ordner
        window.location.href = 'bestellung.html';
    } else {
        alert("Ihr Warenkorb ist leer.");
    }
}

function toggleCartDropdown() {
    document.getElementById("cart-dropdown").classList.toggle("active");
}

function toggleDropdown() {
    document.querySelector(".dropdown-content").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", loadProducts);
