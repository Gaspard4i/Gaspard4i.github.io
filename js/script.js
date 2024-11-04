let lastScrollPosition = 0;
const header = document.getElementById('main-header');

// Fonction pour télécharger le CV
function downloadCV() {
    window.open('res/cv.pdf', '_blank');
}

// Fonction pour télécharger le Portfolio
function downloadPortfolio() {
    window.open('res/portfolio.pdf', '_blank');
}

// Fonction pour télécharger le CV
function downloadCV() {
    window.open('res/cv.pdf', '_blank');
}

// Fonction pour télécharger le Portfolio
function downloadPortfolio() {
    window.open('res/portfolio.pdf', '_blank');
}

// Fonction pour gérer l'affichage du header lors du scroll
window.onscroll = function () {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition < lastScrollPosition || currentScrollPosition < 50) {
        // Si on scrolle vers le haut ou est proche du haut de la page, afficher le header
        header.classList.remove('hidden');
        header.classList.add('visible');
    } else {
        // Si on scrolle vers le bas, cacher le header
        header.classList.remove('visible');
        header.classList.add('hidden');
    }

    // Mettre à jour la dernière position de scroll
    lastScrollPosition = currentScrollPosition;
};

let currentIndex = 0; // Index de la catégorie active

function updateSlider() {
    const skillsContainer = document.querySelector('.skills-container');
    const skillCategories = document.querySelectorAll('.skill-category');
    const containerWidth = skillsContainer.offsetWidth;
    const activeCategory = skillCategories[currentIndex];

    // Calcul du décalage pour centrer la box active
    const offset = (containerWidth / 2) - (activeCategory.offsetWidth / 2);
    const transformValue = -(activeCategory.offsetLeft - offset);

    skillsContainer.style.transform = `translateX(${transformValue}px)`;

    // Mettre à jour l'état actif pour l'opacité
    skillCategories.forEach((category, index) => {
        category.classList.toggle('active', index === currentIndex);
    });
}

function changeSlide(direction) {
    const skillCategories = document.querySelectorAll('.skill-category');
    currentIndex = (currentIndex + direction + skillCategories.length) % skillCategories.length;
    updateSlider();
}

// Initialisation
updateSlider();
