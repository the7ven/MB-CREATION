// Gestion menus sur mobile

document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

// Gestion des sous-menus sur mobile
document.querySelectorAll('.has-dropdown').forEach(item => {
    item.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.parentElement.classList.toggle('active');
        }
    });
});

// Fermeture du menu au clic en dehors
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && !e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
        document.querySelector('nav').classList.remove('active');
    }
});

// Gestion du panier
let cartItems = [];
const cartIcon = document.querySelector('.cart-icon');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartCount = document.querySelector('.cart-count');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const goToCartButton = document.querySelector('.go-to-cart');

// Charger le panier depuis le localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Sauvegarder le panier dans le localStorage
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Mettre à jour l'affichage du panier
function updateCartDisplay() {
    cartCount.textContent = cartItems.length;
    cartCount.style.display = cartItems.length > 0 ? 'block' : 'none';
    goToCartButton.disabled = cartItems.length === 0;

    cartItemsContainer.innerHTML = '';
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div>
                <div>${item.name}</div>
                <div>${item.price}</div>
            </div>
            <i class="fas fa-times remove-item" data-index="${index}"></i>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Supprimer un article du panier
function removeFromCart(index) {
    cartItems.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

// Event Listeners pour le panier
cartIcon.addEventListener('click', (e) => {
    if (!e.target.closest('.cart-dropdown')) {
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    }
});

closeCart.addEventListener('click', () => {
    cartDropdown.style.display = 'none';
});

document.addEventListener('click', (e) => {
    if (!cartIcon.contains(e.target)) {
        cartDropdown.style.display = 'none';
    }
});

cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const index = parseInt(e.target.dataset.index);
        removeFromCart(index);
    }
});

// Charger le panier au chargement de la page
document.addEventListener('DOMContentLoaded', loadCart);