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
                textElement.textContent = `${item.name} - ${item.price}`;

                // Ajoutez l'image et le texte à l'élément produit
                itemElement.appendChild(imgElement);
                itemElement.appendChild(textElement);
                cartItemsContainer.appendChild(itemElement); // Ajoute l'élément à la liste des articles du panier
            });
        }
    } else {
        cartItemsContainer.innerHTML = '<p>Votre panier est vide.</p>'; // Si aucun article n'est trouvé
    }
});
