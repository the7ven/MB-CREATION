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


// carrousel


document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carrousel-slide');
    const indicatorsContainer = document.getElementById('indicators');
    let currentIndex = 0;
    let interval;

    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');

    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');
        currentIndex = index;
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }

    function startCarousel() {
        interval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(interval);
        startCarousel();
    }

    indicatorsContainer.addEventListener('click', resetInterval);
    startCarousel();
});





 // new arrivals


 const products = [
    {
        id: 1,
        name: "Poduit 1",
        price: 999.99,
        description: " lorem ipsum dolor samet",
        image: "/assets/images/cover1-removebg-preview.png"
    },
    {
        id: 2,
        name: "Produit 2",
        price: 599.99,
        description: "lorem ipsum dolor samet",
        image: "assets/images/IMG_0340_1_-removebg-preview.png"
    },
    {
        id: 3,
        name: "Produit 3",
        price: 199.99,
        description: "lorem ipsum dolor samet",
        image: "assets/images/slider1 (1).jpg"
    },
    {
        id: 4,
        name: "Produit 4",
        price: 249.99,
        description: "lorem ipsum dolor samet",
        image: "assets/images/sellers1__1_-removebg-preview.png"
    },
    {
        id: 5,
        name: "Produit 5",
        price: 449.99,
        description: "lorem ipsum dolor samet",
        image: "assets/images/slider1 (6).jpg"
    },
    {
        id: 6,
        name: "Produit 6",
        price: 149.99,
        description: "lorem ipsum dolor samet",
        image: "assets/images/slider1__2_-removebg-preview (1).png"
    }
];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const productModal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');
const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const modalAddToCart = document.getElementById('modal-add-to-cart');

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.price} €</p>
        </div>
    `;
    card.addEventListener('click', function() {
        openProductModal(product);
    });
    return card;
}

// Open Product Modal
function openProductModal(product) {
    modalImage.src = product.image;
    modalName.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `${product.price} €`;
    
    productModal.style.display = 'flex';
}

// Close Modal
function closeModal() {
    productModal.style.display = 'none';
}

// Event Listeners
modalClose.addEventListener('click', closeModal);

productModal.addEventListener('click', function(event) {
    if (event.target === productModal) {
        closeModal();
    }
});

let count = 0; // Initialiser le compteur
let cartItems = []; // Tableau pour stocker les articles du panier

// Charger le panier depuis le localStorage
const storedCartItems = localStorage.getItem('cartItems');
if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
    count = cartItems.length; // Met à jour le compteur
    const cartCount = document.getElementById('cart-count'); // Récupère l'élément du compteur
    cartCount.textContent = count; // Met à jour le texte du compteur
    cartCount.style.display = count > 0 ? 'block' : 'none'; // Affiche ou masque le compteur
}

// Fonction pour afficher le toast
function showToast(message, className = '') {
    const toast = document.getElementById('toast');
    toast.textContent = message; // Met à jour le message du toast
    toast.className = className; // Applique la classe CSS
    toast.style.display = 'block'; // Affiche le toast

    // Masque le toast après 3 secondes
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Fonction pour ajouter un produit au panier
function addToCart(productName, productPrice, productImage) {
    // Vérifie si le produit existe déjà dans le panier
    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
        // Si l'article existe déjà, affiche un message dans le toast
        showToast(`${productName} existe déjà dans le panier !`, 'toast-error'); // Ajout de la classe pour le toast rouge
        return; // Sort de la fonction pour ne pas ajouter le produit
    }

    count++; // Incrémente le compteur
    const cartCount = document.getElementById('cart-count'); // Récupère l'élément du compteur
    cartCount.textContent = count; // Met à jour le texte du compteur
    cartCount.style.display = 'block'; // Affiche le compteur

    // Ajoute l'article au tableau du panier
    cartItems.push({ name: productName, price: productPrice, image: productImage }); // Ajoutez l'image ici

    // Sauvegarde le panier dans le localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Affiche le toast pour confirmation
    showToast(`${productName} ajouté au panier !`); 
}

// Fonction pour supprimer un produit du panier
function removeFromCart(index) {
    cartItems.splice(index, 1); // Supprime l'élément à l'index donné
    count--; // Décrémente le compteur
    const cartCount = document.getElementById('cart-count'); // Récupère l'élément du compteur
    cartCount.textContent = count; // Met à jour le texte du compteur
    cartCount.style.display = count > 0 ? 'block' : 'none'; // Masque le compteur si vide

    // Sauvegarde le panier mis à jour dans le localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Fonction pour afficher le contenu du panier
function showCart() {
    const cartDropdown = document.querySelector('.cart-dropdown'); // Assurez-vous que cet élément existe dans votre HTML
    cartDropdown.innerHTML = ''; // Réinitialise le contenu

    // Ajoutez l'icône de fermeture
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
    cartDropdown.appendChild(title); // Ajoute le titre à la liste déroulante

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
            textElement.textContent = `${item.name} - ${item.price} €`;

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

// Écouteur d'événements pour l'icône du panier
const cartIcon = document.querySelector('.cart-icon');
cartIcon.addEventListener('click', showCart);

// Exemple d'écouteur d'événements pour le bouton "Ajouter au panier"
if (modalAddToCart) { // Vérifie si l'élément existe
    modalAddToCart.addEventListener('click', function() {
        const productName = document.getElementById('modal-name').textContent; // Récupère le nom du produit
        const productPrice = document.getElementById('modal-price').textContent; // Récupère le prix du produit
        const productImageElement = document.getElementById('modal-image'); // Récupère l'élément image
        const productImage = productImageElement ? productImageElement.src : '/assets/images/cover1-removebg-preview.png'; // Utilise une image par défaut si l'élément n'existe pas

        addToCart(productName, productPrice, productImage); // Appelle la fonction pour ajouter au panier
    });
}

// Populate Grid
products.forEach(function(product) {
    productGrid.appendChild(createProductCard(product));
});

document.addEventListener('DOMContentLoaded', function() {
    let count = 0; // Initialiser le compteur
    let cartItems = []; // Tableau pour stocker les articles du panier

    // Charger le panier depuis le localStorage
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
        count = cartItems.length; // Met à jour le compteur
        const cartCount = document.getElementById('cart-count'); // Récupère l'élément du compteur
        cartCount.textContent = count; // Met à jour le texte du compteur
        cartCount.style.display = count > 0 ? 'block' : 'none'; // Affiche ou masque le compteur
    }

    // Fonction pour afficher le toast
    function showToast(message, className = '') {
        const toast = document.getElementById('toast');
        toast.textContent = message; // Met à jour le message du toast
        toast.className = className; // Applique la classe CSS
        toast.style.display = 'block'; // Affiche le toast

        // Masque le toast après 3 secondes
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    // Fonction pour ajouter un produit au panier
    function addToCart(productName, productPrice, productImage) {
        // Vérifie si le produit existe déjà dans le panier
        const existingItem = cartItems.find(item => item.name === productName);
        if (existingItem) {
            // Si l'article existe déjà, affiche un message dans le toast
            showToast(`${productName} existe déjà dans le panier !`, 'toast-error'); // Ajout de la classe pour le toast rouge
            return; // Sort de la fonction pour ne pas ajouter le produit
        }

        count++; // Incrémente le compteur
        const cartCount = document.getElementById('cart-count'); // Récupère l'élément du compteur
        cartCount.textContent = count; // Met à jour le texte du compteur
        cartCount.style.display = 'block'; // Affiche le compteur

        // Ajoute l'article au tableau du panier
        cartItems.push({ name: productName, price: productPrice, image: productImage }); // Ajoutez l'image ici

        // Sauvegarde le panier dans le localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Affiche le toast pour confirmation
        showToast(`${productName} ajouté au panier !`); 
    }

    // Fonction pour supprimer un produit du panier
    function removeFromCart(index) {
        cartItems.splice(index, 1); // Supprime l'élément à l'index donné
        count--; // Décrémente le compteur
        const cartCount = document.getElementById('cart-count'); // Récupère l'élément du compteur
        cartCount.textContent = count; // Met à jour le texte du compteur
        cartCount.style.display = count > 0 ? 'block' : 'none'; // Masque le compteur si vide

        // Sauvegarde le panier mis à jour dans le localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Fonction pour afficher le contenu du panier
    function showCart() {
        const cartDropdown = document.querySelector('.cart-dropdown'); // Assurez-vous que cet élément existe dans votre HTML
        cartDropdown.innerHTML = ''; // Réinitialise le contenu

        // Ajoutez l'icône de fermeture
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times', 'close-cart');
        closeIcon.style.cursor = 'pointer';
        closeIcon.addEventListener('click', function() {
            cartDropdown.style.display = 'none'; // Ferme la liste déroulante
        });
        cartDropdown.appendChild(closeIcon); // Ajoute l'icône à la liste déroulante

        // Ajoutez le titre
        const title = document.createElement('h3');
        title.textContent = 'Votre Panier';
        cartDropdown.appendChild(title); // Ajoute le titre à la liste déroulante

        if (cartItems.length === 0) {
            cartDropdown.innerHTML += '<p>Votre panier est vide.</p>';
        } else {
            cartItems.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item'); // Ajoutez une classe pour le style

                // Créez un ��lément d'image
                const imgElement = document.createElement('img');
                imgElement.src = item.image || '/assets/images/cover1-removebg-preview.png'; // Utilise une image par défaut si l'image est undefined
                imgElement.alt = item.name; // Texte alternatif pour l'image
                imgElement.classList.add('cart-item-image'); // Classe pour le style de l'image

                // Ajoutez le nom et le prix
                const textElement = document.createElement('span');
                textElement.textContent = `${item.name} - ${item.price} €`;

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
            window.location.href = 'panier.html'; // Remplacez par l'URL de votre page panier
        });
        cartDropdown.appendChild(goToCartButton); // Ajoute le bouton à la liste déroulante

        cartDropdown.style.display = 'block'; // Affiche le dropdown
    }

    // Écouteur d'événements pour l'icône du panier
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.addEventListener('click', showCart);

    // Exemple d'écouteur d'événements pour le bouton "Ajouter au panier"
    const modalAddToCart = document.getElementById('modal-add-to-cart');
    if (modalAddToCart) { // Vérifie si l'élément existe
        modalAddToCart.addEventListener('click', function() {
            const productName = document.getElementById('modal-name').textContent; // Récupère le nom du produit
            const productPrice = document.getElementById('modal-price').textContent; // Récupère le prix du produit
            const productImageElement = document.getElementById('modal-image'); // Récupère l'élément image
            const productImage = productImageElement ? productImageElement.src : '/assets/images/cover1-removebg-preview.png'; // Utilise une image par défaut si l'élément n'existe pas

            addToCart(productName, productPrice, productImage); // Appelle la fonction pour ajouter au panier
        });
    }

    // Fermer le dropdown si l'utilisateur clique en dehors
    document.addEventListener('click', function(event) {
        const cartDropdown = document.querySelector('.cart-dropdown');
        const isClickInside = cartDropdown.contains(event.target) || cartIcon.contains(event.target);
        if (!isClickInside) {
            cartDropdown.style.display = 'none'; // Ferme le dropdown
        }
    });
});

