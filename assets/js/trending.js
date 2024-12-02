

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

