const stripe = Stripe('pk_test_51NLLR7KcCr5TssgVLaBLp24EJTUUOQLWyVl1AGoNZhQ0AqJExujKBRBZ7fLMshafUNpe4rKyNOFcymyXmaisaAsX000fAwfCcY');

document.getElementById("checkout-button").addEventListener("click", function () {
    // Récupérer les articles du panier
    const cartItems = [];
    document.querySelectorAll(".cart-item").forEach(item => {
        const name = item.querySelector('span').textContent.split(" - ")[0];
        const price = parseFloat(item.querySelector('span').textContent.split(" - ")[1]);
        const quantity = parseInt(item.querySelector('.quantity-input').value);

        cartItems.push({
            name: name,
            price: price * 100,  // Convertir en centimes pour Stripe
            quantity: quantity
        });
    });

    // Envoyer les données du panier à checkout.php
    fetch('checkout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cartItems })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Change to text to log the raw response
    })
    .then(text => {
        console.log('Raw response:', text); // Log the raw response
        return JSON.parse(text); // Manually parse the JSON
    })
    .then(session => stripe.redirectToCheckout({ sessionId: session.id }))
    .catch(error => console.error("Erreur :", error));
});
