const stripe = Stripe('pk_test_51NLLR7KcCr5TssgVLaBLp24EJTUUOQLWyVl1AGoNZhQ0AqJExujKBRBZ7fLMshafUNpe4rKyNOFcymyXmaisaAsX000fAwfCcY');

document.getElementById("checkout-button").addEventListener("click", function () {
    // Récupérer les articles du panier
    const cartItems = [];
    document.querySelectorAll(".cart-item").forEach(item => {
        const name = item.querySelector('.cart-item-name').textContent;
        const priceText = item.querySelector('.cart-item-price').textContent;
        const price = parseFloat(priceText.replace('€', '').trim()) * 100; // Convertir en centimes
        const quantity = parseInt(item.querySelector('.quantity-input').value);

        cartItems.push({
            name: name,
            price: price,
            quantity: quantity
        });
    });

    // Vérifier si le panier n'est pas vide
    if (cartItems.length === 0) {
        alert("Votre panier est vide");
        return;
    }

    // Envoyer les données du panier à checkout.php
    fetch('checkout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ cartItems: cartItems })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la communication avec le serveur');
        }
        return response.json();
    })
    .then(session => {
        if (!session || !session.id) {
            throw new Error('Session ID invalide reçu du serveur');
        }
        return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .catch(error => {
        console.error("Erreur :", error);
        alert("Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.");
    });
});
