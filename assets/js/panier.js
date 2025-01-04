document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('total-price');
    const storedCartItems = localStorage.getItem('cartItems');

    if (storedCartItems) {
        const cartItems = JSON.parse(storedCartItems);

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Votre panier est vide.</p>';
            totalElement.textContent = 'Total : 0 €';
        } else {
            cartItems.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');

                const imgElement = document.createElement('img');
                imgElement.src = item.image || '/assets/images/cover1-removebg-preview.png';
                imgElement.alt = item.name;
                imgElement.classList.add('cart-item-image');

                const detailsElement = document.createElement('div');
                detailsElement.classList.add('cart-item-details');

                const nameElement = document.createElement('span');
                nameElement.classList.add('cart-item-name');
                nameElement.textContent = item.name;

                const priceElement = document.createElement('span');
                priceElement.classList.add('cart-item-price');
                priceElement.textContent = `${item.price} €`;

                detailsElement.appendChild(nameElement);
                detailsElement.appendChild(priceElement);

                const quantityContainer = document.createElement('div');
                quantityContainer.classList.add('quantity-container');

                const decreaseButton = document.createElement('button');
                decreaseButton.textContent = '-';
                decreaseButton.classList.add('quantity-button');
                decreaseButton.addEventListener('click', () => {
                    const quantityInput = quantityContainer.querySelector('input');
                    let quantity = parseInt(quantityInput.value);
                    if (quantity > 1) {
                        quantityInput.value = quantity - 1;
                        updateTotal(cartItems);
                    }
                });

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = item.quantity || 1;
                quantityInput.min = 1;
                quantityInput.classList.add('quantity-input');
                quantityInput.setAttribute('data-name', item.name);
                quantityInput.addEventListener('change', () => {
                    updateTotal(cartItems);
                });

                const increaseButton = document.createElement('button');
                increaseButton.textContent = '+';
                increaseButton.classList.add('quantity-button');
                increaseButton.addEventListener('click', () => {
                    const quantityInput = quantityContainer.querySelector('input');
                    let quantity = parseInt(quantityInput.value);
                    quantityInput.value = quantity + 1;
                    updateTotal(cartItems);
                });

                quantityContainer.appendChild(decreaseButton);
                quantityContainer.appendChild(quantityInput);
                quantityContainer.appendChild(increaseButton);

                const removeButton = document.createElement('button');
                removeButton.innerHTML = '<i class="fas fa-times"></i>';
                removeButton.classList.add('remove-button');
                removeButton.addEventListener('click', () => {
                    removeItemFromCart(index);
                });

                itemElement.appendChild(imgElement);
                itemElement.appendChild(detailsElement);
                itemElement.appendChild(quantityContainer);
                itemElement.appendChild(removeButton);
                cartItemsContainer.appendChild(itemElement);
            });

            updateTotal(cartItems);
        }
    } else {
        cartItemsContainer.innerHTML = '<p>Votre panier est vide.</p>';
        totalElement.textContent = 'Total : 0 €';
    }
});

function updateTotal(cartItems) {
    const totalElement = document.getElementById('total-price');
    let total = 0;

    cartItems.forEach(item => {
        const quantityInput = document.querySelector(`input[data-name="${item.name}"]`);
        const quantity = parseInt(quantityInput.value);
        const price = parseFloat(item.price);

        if (!isNaN(quantity) && !isNaN(price)) {
            total += price * quantity;
        }
    });

    totalElement.textContent = `Total : ${total.toFixed(2)} €`;
}

function removeItemFromCart(index) {
    const storedCartItems = localStorage.getItem('cartItems');
    let cartItems = [];
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
    }

    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    location.reload();
}
