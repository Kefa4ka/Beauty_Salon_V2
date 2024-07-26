document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart');
    const orderItemsElement = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');
    const checkoutForm = document.getElementById('checkout-form');

    const updateCartDisplay = () => {
        if (cartItemsElement) {
            cartItemsElement.innerHTML = '';
            let total = 0;
            cartItems.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.price} грн`;
                total += parseInt(item.price);
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Видалити';
                removeButton.addEventListener('click', () => {
                    cartItems.splice(index, 1);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCartDisplay();
                });
                li.appendChild(removeButton);
                cartItemsElement.appendChild(li);
            });
            cartCountElement.textContent = cartItems.length;
            cartTotalElement.textContent = `Загальна сума: ${total} грн`;
        } else if (cartCountElement) {
            cartCountElement.textContent = cartItems.length;
        }

        if (orderItemsElement) {
            orderItemsElement.innerHTML = '';
            let total = 0;
            cartItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.price} грн`;
                total += parseInt(item.price);
                orderItemsElement.appendChild(li);
            });
            orderTotalElement.textContent = `Загальна сума: ${total} грн`;
        }
    };

    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            cartItems.length = 0;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartDisplay();
        });
    }

    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            cartItems.push({ name, price });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartDisplay();
        });
    });

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Замовлення оформлено успішно!');
            cartItems.length = 0;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartDisplay();
            checkoutForm.reset();
        });
    }

    updateCartDisplay();
});
