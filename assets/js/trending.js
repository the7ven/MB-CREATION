


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

































// Données de produits

const products = [
    {
        id: 1,
        name: "",
        description: "",
        price: 999.99,
        image: "IMAGES/malepage (4).PNG"
    },
    {
        id: 2,
        name: "",
        description: "",
        price: 599.99,
        image: "IMAGES/malepage (3).PNG"
    },
    {
        id: 3,
        name: "",
        description: "",
        price: 199.99,
        image: "IMAGES/malepage (2).PNG"
    },
    {
        id: 4,
        name: "",
        description: "",
        price: 249.99,
        image: "IMAGES/malepage (1).PNG"
    },
  
];



// Génération de la grille de produits
function generateProductGrid() {
const gridContainer = document.getElementById('productGrid');

products.forEach(product => {
const productCard = document.createElement('div');
productCard.classList.add('product-card');
productCard.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">${product.price.toFixed(2)} cfa</p>
    <button onclick="openModal(${product.id})">Détails</button>
`;
gridContainer.appendChild(productCard);
});
}

// Ouverture du modal
function openModal(productId) {
const product = products.find(p => p.id === productId);
const modal = document.getElementById('productModal');

document.getElementById('modalImage').src = product.image;
document.getElementById('modalTitle').textContent = product.name;
document.getElementById('modalDescription').textContent = product.description;
document.getElementById('modalPrice').textContent = `${product.price.toFixed(2)} cfa`;

modal.style.display = 'flex';
}

// Fermeture du modal
function closeModal() {
const modal = document.getElementById('productModal');
modal.style.display = 'none';
}

// Événements
document.querySelector('.close-modal').addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
const modal = document.getElementById('productModal');
if (event.target === modal) {
closeModal();
}
});

// Initialisation
generateProductGrid();