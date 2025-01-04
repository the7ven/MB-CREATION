// Variables pour le modal
let currentImageIndex = 0;
let currentProduct = null;

// DOM Elements pour le modal
const productModal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');
const modalCurrentImage = document.getElementById('modal-current-image');
const modalThumbnails = document.querySelectorAll('.modal-thumbnail');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
const modalName = document.getElementById('modal-name');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const modalAddToCart = document.getElementById('modal-add-to-cart');

// Update Modal Images
function updateModalImages() {
    if (!currentProduct) return;
    
    modalCurrentImage.src = currentProduct.images[currentImageIndex];
    modalCurrentImage.alt = `${currentProduct.name} - Image ${currentImageIndex + 1}`;
    
    modalThumbnails.forEach((thumbnail, index) => {
        if (currentProduct.images[index]) {
            thumbnail.src = currentProduct.images[index];
            thumbnail.style.display = 'block';
            thumbnail.classList.toggle('active', index === currentImageIndex);
        } else {
            thumbnail.style.display = 'none';
        }
    });
}

// Open Product Modal
function openProductModal(product) {
    currentProduct = {
        name: product.querySelector('.product-name').textContent,
        price: product.querySelector('.product-price').textContent,
        description: product.querySelector('.product-description')?.textContent || 'Description non disponible',
        images: [
            product.querySelector('.products-image').src,
            product.querySelector('.products-image').src,
            product.querySelector('.products-image').src
        ]
    };
    currentImageIndex = 0;
    
    modalName.textContent = currentProduct.name;
    modalDescription.textContent = currentProduct.description;
    modalPrice.textContent = currentProduct.price;
    
    updateModalImages();
    productModal.style.display = 'flex';
}

// Navigate Images
function navigateImages(direction) {
    if (!currentProduct) return;
    currentImageIndex = (currentImageIndex + direction + currentProduct.images.length) % currentProduct.images.length;
    updateModalImages();
}

// Close Modal
function closeModal() {
    productModal.style.display = 'none';
    currentProduct = null;
    currentImageIndex = 0;
}

// Event Listeners pour le modal
modalClose.addEventListener('click', closeModal);
modalPrev.addEventListener('click', () => navigateImages(-1));
modalNext.addEventListener('click', () => navigateImages(1));

modalThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        currentImageIndex = index;
        updateModalImages();
    });
});

// Ajouter les écouteurs d'événements pour ouvrir le modal sur les cartes produits
document.querySelectorAll('.products-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('add-to-cart')) {
            openProductModal(this);
        }
    });
});

// Écouteur d'événements pour le bouton "Add to Cart" dans le modal
modalAddToCart.addEventListener('click', function() {
    if (currentProduct) {
        addToCart(
            currentProduct.name,
            currentProduct.price,
            currentProduct.images[currentImageIndex]
        );
        closeModal();
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (!currentProduct) return;
    
    if (e.key === 'ArrowLeft') {
        navigateImages(-1);
    } else if (e.key === 'ArrowRight') {
        navigateImages(1);
    } else if (e.key === 'Escape') {
        closeModal();
    }
});
