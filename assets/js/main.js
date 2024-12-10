
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

modalAddToCart.addEventListener('click', function() {
    alert(modalName.textContent + ' ajouté au panier !');
    closeModal();
});

// Populate Grid
products.forEach(function(product) {
    productGrid.appendChild(createProductCard(product));
});







  // notation par etoile



