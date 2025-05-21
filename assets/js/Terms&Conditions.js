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


 // JavaScript to handle the accordion functionality
        document.addEventListener('DOMContentLoaded', function() {
            const questions = document.querySelectorAll('.faq-question');
            
            questions.forEach(question => {
                question.addEventListener('click', () => {
                    const item = question.parentElement;
                    const isActive = item.classList.contains('active');
                    
                    // Close all items
                    document.querySelectorAll('.faq-item').forEach(el => {
                        el.classList.remove('active');
                    });
                    
                    // Open clicked item if it wasn't already active
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            });
        });