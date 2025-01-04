// Récupération des éléments du DOM
const checkoutButton = document.getElementById('checkout-button');
const cartItemsContainer = document.getElementById('cart-items');

// Fonction pour formater le prix pour Stripe (en centimes)
function formatPriceForStripe(price) {
    return Math.round(parseFloat(price.replace('€', '').trim()) * 100);
}

// Fonction pour récupérer les articles du panier
function getCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return cartItems.map(item => ({
        name: item.name,
        price: formatPriceForStripe(item.price),
        quantity: parseInt(item.quantity)
    }));
}

// Fonction pour afficher une erreur
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
}

// Gestionnaire de clic pour le bouton de paiement
checkoutButton.addEventListener('click', async () => {
    try {
        const cartItems = getCartItems();
        
        if (!cartItems.length) {
            showError('Votre panier est vide');
            return;
        }

        // Désactiver le bouton pendant le traitement
        checkoutButton.disabled = true;
        
        const response = await fetch('/MB-CREATION/checkout.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ cartItems })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la communication avec le serveur');
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.message || 'Erreur lors de la création de la session');
        }

        if (!data.id) {
            throw new Error('ID de session manquant dans la réponse');
        }

        // Redirection vers Stripe Checkout
        const stripe = Stripe('pk_test_51OGQkbGxmxvQr8Hy7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7Hs7');
        const result = await stripe.redirectToCheckout({
            sessionId: data.id
        });

        if (result.error) {
            throw new Error(result.error.message);
        }

    } catch (error) {
        console.error('Erreur:', error);
        showError(error.message);
    } finally {
        // Réactiver le bouton
        checkoutButton.disabled = false;
    }
}); 