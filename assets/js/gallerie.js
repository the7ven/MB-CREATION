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





const photos = [
    { 
        id: 1, 
        url: "assets/images/gallery (13).jpg", 
        title: "Paysage de Montagne" 
    },
    { 
        id: 2, 
        url: "assets/images/gallery (12).jpg", 
        title: "Coucher de Soleil" 
    },
    { 
        id: 3, 
        url: "assets/images/gallery (11).jpg", 
        title: "Océan Paisible" 
    },
    { 
        id: 1, 
        url: "assets/images/gallery (10).jpg", 
        title: "Paysage de Montagne" 
    },
    { 
        id: 2, 
        url: "assets/images/gallery (9).jpg", 
        title: "Coucher de Soleil" 
    },
    { 
        id: 3, 
        url: "assets/images/gallery (8).jpg", 
        title: "Océan Paisible" 
    },
    { 
        id: 1, 
        url: "assets/images/gallery (7).jpg", 
        title: "Paysage de Montagne" 
    },
    { 
        id: 2, 
        url: "assets/images/gallery (6).jpg", 
        title: "Coucher de Soleil" 
    },
    { 
        id: 3, 
        url: "assets/images/gallery (5).jpg", 
        title: "Océan Paisible" 
    },
    { 
        id: 1, 
        url: "assets/images/gallery (4).jpg", 
        title: "Paysage de Montagne" 
    },
    { 
        id: 2, 
        url: "assets/images/gallery (3).jpg", 
        title: "Coucher de Soleil" 
    },
    { 
        id: 3, 
        url: "assets/images/gallery (2).jpg", 
        title: "Océan Paisible" 
    },
    { 
        id: 1, 
        url: "assets/images/gallery (1).jpg", 
        title: "Paysage de Montagne" 
    },
    { 
        id: 2, 
        url: "assets/images/trendingpic (2).png", 
        title: "Coucher de Soleil" 
    },
    { 
        id: 3, 
        url: "assets/images/trendingpic (1).png", 
        title: "Océan Paisible" 
    },

];

let currentPhotoIndex = 0;
const ratings = new Array(photos.length).fill(0);

const galleryEl = document.getElementById('gallery');
const modalEl = document.getElementById('modal');
const modalImageEl = document.getElementById('modal-image');
const modalTitleEl = document.getElementById('modal-title');
const starRatingEl = document.getElementById('star-rating');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Créer la galerie de miniatures
function createThumbnails() {
    galleryEl.innerHTML = photos.map((photo, index) => `
        <div class="thumbnail" data-index="${index}">
            <img src="${photo.url}" alt="${photo.title}">
            <p>${photo.title}</p>
        </div>
    `).join('');

    // Ajouter des écouteurs d'événements aux miniatures
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            currentPhotoIndex = parseInt(thumbnail.dataset.index);
            openModal();
        });
    });
}

// Ouvrir la modale
function openModal() {
    modalEl.style.display = 'flex';
    updateModalContent();
}

// Mettre à jour le contenu de la modale
function updateModalContent() {
    const currentPhoto = photos[currentPhotoIndex];
    modalImageEl.src = currentPhoto.url;
    modalTitleEl.textContent = currentPhoto.title;
    createStarRating();
}

// Créer le système de notation
function createStarRating() {
    starRatingEl.innerHTML = Array(5).fill().map((_, index) => `
        <span class="star ${index < ratings[currentPhotoIndex] ? 'active' : ''}" 
              data-rating="${index + 1}">★</span>
    `).join('');

    // Ajouter des écouteurs d'événements aux étoiles
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            ratings[currentPhotoIndex] = rating;
            createStarRating();
        });
    });
}

// Fermer la modale
function closeModal(e) {
    if (e.target === modalEl) {
        modalEl.style.display = 'none';
    }
}

// Navigation entre les photos
function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updateModalContent();
}

function previousPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    updateModalContent();
}

// Écouteurs d'événements
modalEl.addEventListener('click', closeModal);
nextBtn.addEventListener('click', nextPhoto);
prevBtn.addEventListener('click', previousPhoto);

// Initialisation
createThumbnails();