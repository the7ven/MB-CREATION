document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const storedCartItems = localStorage.getItem('cartItems');

    if (storedCartItems) {
        const cartItems = JSON.parse(storedCartItems); // Convertit la chaîne JSON en tableau d'objets

        // Vérifie si le panier est vide
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Votre panier est vide.</p>';
        } else {
            // Affiche chaque article dans le panier
            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item'); // Ajoutez une classe pour le style

                // Créez un élément d'image
                const imgElement = document.createElement('img');
                imgElement.src = item.image || '/assets/images/cover1-removebg-preview.png'; // Utilise une image par défaut si l'image est undefined
                imgElement.alt = item.name; // Texte alternatif pour l'image
                imgElement.classList.add('cart-item-image'); // Classe pour le style de l'image

                // Ajoutez le nom et le prix
                const textElement = document.createElement('span');
                textElement.textContent = `${item.name} - ${item.price} `;

                // Créez un conteneur pour la quantité
                const quantityContainer = document.createElement('div');
                quantityContainer.classList.add('quantity-container');

                // Bouton pour diminuer la quantité
                const decreaseButton = document.createElement('button');
                decreaseButton.textContent = '-';
                decreaseButton.classList.add('quantity-button');
                decreaseButton.addEventListener('click', () => {
                    const quantityInput = quantityContainer.querySelector('input');
                    let quantity = parseInt(quantityInput.value);
                    if (quantity > 1) {
                        quantityInput.value = quantity - 1; // Diminue la quantité
                    }
                });

                // Champ de saisie pour la quantité
                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = item.quantity || 1; // Définit la quantité par défaut à 1
                quantityInput.min = 1; // Empêche les valeurs négatives
                quantityInput.classList.add('quantity-input');

                // Bouton pour augmenter la quantité
                const increaseButton = document.createElement('button');
                increaseButton.textContent = '+';
                increaseButton.classList.add('quantity-button');
                increaseButton.addEventListener('click', () => {
                    const quantityInput = quantityContainer.querySelector('input');
                    let quantity = parseInt(quantityInput.value);
                    quantityInput.value = quantity + 1; // Augmente la quantité
                });

                // Ajoutez les boutons et le champ de saisie au conteneur de quantité
                quantityContainer.appendChild(decreaseButton);
                quantityContainer.appendChild(quantityInput);
                quantityContainer.appendChild(increaseButton);

                // Ajoutez l'image, le texte et le conteneur de quantité à l'élément produit
                itemElement.appendChild(imgElement);
                itemElement.appendChild(textElement);
                itemElement.appendChild(quantityContainer);
                cartItemsContainer.appendChild(itemElement); // Ajoute l'élément à la liste des articles du panier
            });
        }
    } else {
        cartItemsContainer.innerHTML = '<p>Votre panier est vide.</p>'; // Si aucun article n'est trouvé
    }
});
