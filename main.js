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