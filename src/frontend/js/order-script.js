document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
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
            </div>
        `;
    });

    cartTotalElement.innerText = `Gesamt: CHF ${total.toFixed(2)}`;
});
