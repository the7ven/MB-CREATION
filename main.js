
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



    // Données des produits
    const products = {
        1: {
            title: "Smartphone XYZ",
            price: "599 €",
            rating: 4.5,
            description: "Un smartphone haut de gamme avec un appareil photo exceptionnel, une batterie longue durée et un écran AMOLED 6.5 pouces."
        },
        2: {
            title: "Casque Audio Pro",
            price: "199 €",
            rating: 5,
            description: "Casque audio professionnel avec réduction de bruit active, son haute fidélité et autonomie de 30 heures."
        },
        3: {
            title: "Montre Connectée",
            price: "299 €",
            rating: 4,
            description: "Montre connectée avec suivi d'activité, GPS intégré et moniteur cardiaque. Étanche jusqu'à 50m."
        },
        4: {
            title: "Tablette Pro",
            price: "449 €",
            rating: 4.5,
            description: "Tablette performante avec écran 11 pouces, processeur rapide et stylet inclus. Parfaite pour les créatifs."
        },
        5: {
            title: "Enceinte Bluetooth",
            price: "129 €",
            rating: 3.5,
            description: "Enceinte portable waterproof avec un son puissant et une autonomie de 20 heures."
        },
        6: {
            title: "Clavier Gaming",
            price: "89 €",
            rating: 4,
            description: "Clavier mécanique RGB avec switches personnalisables et repose-poignets ergonomique."
        }
    };

    // Initialisation des étoiles
    function initRatings() {
        document.querySelectorAll('.rating').forEach(ratingContainer => {
            const rating = parseFloat(ratingContainer.dataset.rating);
            updateStars(ratingContainer, rating);
        });
    }

    // Mise à jour de l'affichage des étoiles
    function updateStars(container, rating) {
        const stars = container.querySelectorAll('span');
        const displayContainer = container.parentElement.querySelector('.rating-display');
        
        stars.forEach(star => {
            const value = parseFloat(star.dataset.value);
            if (value <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });

        // Mise à jour de l'affichage du rating
        displayContainer.textContent = `${rating}/5`;
    }

    // Gestion des clics sur les étoiles
    document.querySelectorAll('.rating span').forEach(star => {
        star.addEventListener('click', (e) => {
            const ratingContainer = e.target.parentElement;
            const value = parseFloat(e.target.dataset.value);
            ratingContainer.dataset.rating = value;
            updateStars(ratingContainer, value);
        });
    });

    // Gestion du modal
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-modal');
    const productImages = document.querySelectorAll('.product-image');

    // Ouvrir le modal
    productImages.forEach(img => {
        img.addEventListener('click', () => {
            const productId = img.dataset.id;
            const product = products[productId];
            
            modal.querySelector('.modal-image').src = img.src;
            modal.querySelector('.product-title').textContent = product.title;
            modal.querySelector('.product-price').textContent = product.price;
            modal.querySelector('.rating').dataset.rating = product.rating;
            updateStars(modal.querySelector('.rating'), product.rating);
            modal.querySelector('.modal-details').textContent = product.description;
            
            modal.style.display = 'block';
        });
    });

    // Fermer le modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initialiser les notations au chargement
    initRatings();