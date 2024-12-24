document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('total-price'); // Élément pour afficher le total
    const storedCartItems = localStorage.getItem('cartItems');

    if (storedCartItems) {
        const cartItems = JSON.parse(storedCartItems); // Convertit la chaîne JSON en tableau d'objets

        // Vérifie si le panier est vide
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Votre panier est vide.</p>';
            totalElement.textContent = 'Total : 0 €'; // Affiche le total
        } else {
            // Affiche chaque article dans le panier
            cartItems.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item'); // Ajoutez une classe pour le style

                // Créez un élément d'image
                const imgElement = document.createElement('img');
                imgElement.src = item.image || '/assets/images/cover1-removebg-preview.png'; // Utilise une image par défaut si l'image est undefined
                imgElement.alt = item.name; // Texte alternatif pour l'image
                imgElement.classList.add('cart-item-image'); // Classe pour le style de l'image

                // Ajoutez le nom et le prix
                const textElement = document.createElement('span');
                textElement.textContent = `${item.name} - ${item.price} €`;

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
                        updateTotal(cartItems); // Met à jour le total
                    }
                });

                // Champ de saisie pour la quantité
                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = item.quantity || 1; // Définit la quantité par défaut à 1
                quantityInput.min = 1; // Empêche les valeurs négatives
                quantityInput.classList.add('quantity-input');
                quantityInput.setAttribute('data-name', item.name); // Ajoute un attribut pour lier le nom
                quantityInput.addEventListener('change', () => {
                    updateTotal(cartItems); // Met à jour le total
                });

                // Bouton pour augmenter la quantité
                const increaseButton = document.createElement('button');
                increaseButton.textContent = '+';
                increaseButton.classList.add('quantity-button');
                increaseButton.addEventListener('click', () => {
                    const quantityInput = quantityContainer.querySelector('input');
                    let quantity = parseInt(quantityInput.value);
                    quantityInput.value = quantity + 1; // Augmente la quantité
                    updateTotal(cartItems); // Met à jour le total
                });

                // Ajoutez les boutons et le champ de saisie au conteneur de quantité
                quantityContainer.appendChild(decreaseButton);
                quantityContainer.appendChild(quantityInput);
                quantityContainer.appendChild(increaseButton);

                // Créer le bouton de suppression
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Supprimer';
                removeButton.classList.add('remove-button');
                removeButton.addEventListener('click', () => {
                    removeItemFromCart(index); // Appelle la fonction pour supprimer l'article
                });

                // Ajoutez l'image, le texte, le conteneur de quantité et le bouton de suppression à l'élément produit
                itemElement.appendChild(imgElement);
                itemElement.appendChild(textElement);
                itemElement.appendChild(quantityContainer);
                itemElement.appendChild(removeButton); // Ajoute le bouton de suppression
                cartItemsContainer.appendChild(itemElement); // Ajoute l'élément à la liste des articles du panier
            });

            updateTotal(cartItems); // Calcule le total initial
        }
    } else {
        cartItemsContainer.innerHTML = '<p>Votre panier est vide.</p>'; // Si aucun article n'est trouvé
        totalElement.textContent = 'Total : 0 €'; // Affiche le total
    }
});

// Fonction pour mettre à jour le total du panier
function updateTotal(cartItems) {
    const totalElement = document.getElementById('total-price');
    let total = 0;

    cartItems.forEach(item => {
        const quantityInput = document.querySelector(`input[data-name="${item.name}"]`);
        const quantity = parseInt(quantityInput.value);
        total += item.price * quantity; // Calcule le total
    });

    totalElement.textContent = `Total : ${total} €`; // Affiche le total
}

// Fonction pour supprimer un article du panier
function removeItemFromCart(index) {
    const storedCartItems = localStorage.getItem('cartItems');
    let cartItems = [];
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems); // Convertir en tableau d'objets
    }

    // Supprimer l'article du tableau
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Mettre à jour le localStorage

    // Rafraîchir l'affichage du panier
    location.reload(); // Recharge la page pour mettre à jour l'affichage
}
