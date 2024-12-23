let currentSlide = 0;
const carousel = document.getElementById('carousel');
const dots = document.getElementById('carousel-dots').getElementsByClassName('dot');
const slides = carousel.getElementsByClassName('carousel-slide');

function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    dots[currentSlide].classList.add('active');
}





class Slider {
constructor() {
this.slides = document.querySelectorAll('.slide');
this.dots = document.querySelectorAll('.slider-dot');
this.prevBtn = document.querySelector('.slider-btn.prev');
this.nextBtn = document.querySelector('.slider-btn.next');
this.currentSlide = 0;
this.slideInterval = null;

this.init();
}

init() {
// Event listeners pour les boutons
this.prevBtn.addEventListener('click', () => this.prevSlide());
this.nextBtn.addEventListener('click', () => this.nextSlide());

// Event listeners pour les dots
this.dots.forEach((dot, index) => {
    dot.addEventListener('click', () => this.goToSlide(index));
});

// Démarrer le slider automatique
this.startAutoSlide();

// Pause sur hover
document.querySelector('.hero').addEventListener('mouseenter', () => this.stopAutoSlide());
document.querySelector('.hero').addEventListener('mouseleave', () => this.startAutoSlide());
}

updateSlide() {
this.slides.forEach(slide => slide.classList.remove('active'));
this.dots.forEach(dot => dot.classList.remove('active'));

this.slides[this.currentSlide].classList.add('active');
this.dots[this.currentSlide].classList.add('active');
}

nextSlide() {
this.currentSlide = (this.currentSlide + 1) % this.slides.length;
this.updateSlide();
}

prevSlide() {
this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
this.updateSlide();
}

goToSlide(index) {
this.currentSlide = index;
this.updateSlide();
}

startAutoSlide() {
if (this.slideInterval) this.stopAutoSlide();
this.slideInterval = setInterval(() => this.nextSlide(), 5000);
}

stopAutoSlide() {
if (this.slideInterval) {
    clearInterval(this.slideInterval);
    this.slideInterval = null;
}
}
}

// Initialiser le slider
document.addEventListener('DOMContentLoaded', () => {
new Slider();
});




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

let cartItems = []; // Déclaration de cartItems au niveau global

// Fonction pour afficher le toast
function showToast(message, className = '') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = className;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Fonction pour mettre à jour le compteur d'articles
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartItems.length;
    cartCountElement.style.display = cartItems.length > 0 ? 'block' : 'none';
}

// Fonction pour ajouter un produit au panier
function addToCart(productName, productPrice, productImage) {
    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
        showToast(`${productName} existe déjà dans le panier !`, 'toast-error');
        return;
    }

    cartItems.push({ name: productName, price: productPrice, image: productImage });
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Sauvegarde dans le localStorage
    updateCartCount();
    showToast(`${productName} ajouté au panier !`);
}

// Fonction pour supprimer un article du panier
function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Sauvegarde dans le localStorage
    updateCartCount();
    showCart();
}

// Fonction pour afficher le contenu du panier
function showCart() {
    const cartDropdown = document.querySelector('.cart-dropdown'); // Assurez-vous que cet élément existe dans votre HTML
    cartDropdown.innerHTML = ''; // Réinitialise le contenu
    const closeIcon = document.createElement('i');
closeIcon.classList.add('fas', 'fa-times', 'close-cart');
closeIcon.style.cursor = 'pointer';
closeIcon.addEventListener('click', function() {
    cartDropdown.style.display = 'none'; // Ferme la liste déroulante
});
cartDropdown.appendChild(closeIcon); // Ajoute l'icône à la liste déroulante
// Ajoutez le titre
const title = document.createElement('h3');
title.textContent = 'Votre Sélection';
cartDropdown.appendChild(title); 
    
    // Charger les articles du panier depuis le localStorage
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems); // Met à jour cartItems avec les articles du localStorage
    }

    if (cartItems.length === 0) {
        cartDropdown.innerHTML += '<p>Votre panier est vide.</p>';
    } else {
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
            textElement.textContent = `${item.name} - ${item.price} `;

            // Ajout de l'icône de suppression
            const removeIcon = document.createElement('i');
            removeIcon.classList.add('fas', 'fa-trash', 'remove-item');
            removeIcon.style.cursor = 'pointer';
            removeIcon.addEventListener('click', function() {
                removeFromCart(index); // Supprime l'article du panier
                showCart(); // Met à jour l'affichage du panier
            });

            // Ajoutez l'image, le texte et l'icône de suppression à l'élément produit
            itemElement.appendChild(imgElement);
            itemElement.appendChild(textElement);
            itemElement.appendChild(removeIcon);
            cartDropdown.appendChild(itemElement); // Ajoute l'élément à la liste déroulante
        });
    }

    // Ajout du bouton "Aller au panier"
    const goToCartButton = document.createElement('button');
    goToCartButton.textContent = 'Aller au panier';
    goToCartButton.classList.add('go-to-cart'); // Assurez-vous que cette ligne est présente
    goToCartButton.addEventListener('click', function() {
        // Logique pour rediriger vers la page du panier
        window.location.href = '../../panier.html'; // Remplacez par l'URL de votre page panier
    });
    cartDropdown.appendChild(goToCartButton); // Ajoute le bouton à la liste déroulante

    cartDropdown.style.display = 'block'; // Affiche le dropdown
}

const cartIcon = document.querySelector('.cart-icon');
cartIcon.addEventListener('click', showCart);

// Écouteur d'événements pour fermer le dropdown si l'utilisateur clique en dehors
document.addEventListener('click', function(event) {
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartIcon = document.querySelector('.cart-icon');

    // Vérifie si le clic a eu lieu en dehors du dropdown et de l'icône du panier
    const isClickInsideDropdown = cartDropdown.contains(event.target);
    const isClickOnCartIcon = cartIcon.contains(event.target);

    if (!isClickInsideDropdown && !isClickOnCartIcon) {
        cartDropdown.style.display = 'none'; // Ferme le dropdown
    }
});

// Écouteur d'événements pour chaque bouton "Add To Cart"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.products-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        const productImage = productCard.querySelector('.products-image').src;

        addToCart(productName, productPrice, productImage);
    });
});

// Récupérer les articles du localStorage lors du chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems); // Met à jour cartItems avec les articles du localStorage
        updateCartCount(); // Met à jour le compteur d'articles
        showCart(); // Affiche le contenu du panier si nécessaire
    }
});


