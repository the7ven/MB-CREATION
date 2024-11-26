
const products = [
    {
        id: 1,
        name: "Appareil Photo Numérique",
        price: "599.99 €",
        description: "Appareil photo professionnel 24MP avec objectif interchangeable. Capturez vos moments les plus précieux avec une qualité exceptionnelle.",
        image: "IMAGES/product-test.png",
        specs: "Capteur CMOS, ISO 100-12800, 4K vidéo"
    },
    {
        id: 2,
        name: "Smartphone Premium",
        price: "899.99 €",
        description: "Dernier smartphone haut de gamme avec écran OLED. Une expérience utilisateur incomparable.",
        image: "/api/placeholder/300/200",
        specs: "6.7 pouces, 256GB, 5G"
    },
    {
        id: 3,
        name: "Ordinateur Portable",
        price: "1299.99 €",
        description: "Ultrabook léger et puissant pour les professionnels. Parfait pour le travail et les loisirs.",
        image: "/api/placeholder/300/200",
        specs: "Intel i7, 16GB RAM, 512GB SSD"
    },
    {
        id: 4,
        name: "Casque Audio",
        price: "249.99 €",
        description: "Casque sans fil avec réduction de bruit active. Une immersion sonore totale.",
        image: "/api/placeholder/300/200",
        specs: "Bluetooth 5.0, 30h d'autonomie"
    },
    {
        id: 5,
        name: "Tablette Graphique",
        price: "799.99 €",
        description: "Tablette professionnelle pour les créatifs. Libérez votre créativité.",
        image: "/api/placeholder/300/200",
        specs: "4096 niveaux de pression, écran 13 pouces"
    },
    {
        id: 6,
        name: "Enceinte Bluetooth",
        price: "199.99 €",
        description: "Enceinte portable waterproof haute qualité. Emportez votre musique partout.",
        image: "/api/placeholder/300/200",
        specs: "20h d'autonomie, IP67"
    },
    {
        id: 7,
        name: "Moniteur Gaming",
        price: "449.99 €",
        description: "Écran 27 pouces haute performance pour le gaming. Une expérience de jeu immersive.",
        image: "/api/placeholder/300/200",
        specs: "144Hz, 1ms, HDR"
    },
    {
        id: 8,
        name: "Drone",
        price: "699.99 €",
        description: "Drone avec caméra 4K stabilisée. Explorez le monde d'en haut.",
        image: "/api/placeholder/300/200",
        specs: "30min d'autonomie, portée 5km"
    }
];

function displayProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <a href="#" class="view-details" onclick="showProductDetails(${product.id}); return false;">
                    Voir les détails
                </a>
            </div>
        </div>
    `).join('');
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-image">
        <div class="modal-product-info">
            <h2 class="modal-product-name">${product.name}</h2>
            <div class="modal-product-price">${product.price}</div>
            <p class="modal-product-description">${product.description}</p>
            <div class="specs-container">
                <div class="specs-title">Caractéristiques</div>
                <p>${product.specs}</p>
            </div>
        </div>
    `;
    
    document.getElementById('productModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
}

displayProducts();
