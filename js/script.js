let lastScrollPosition = 0;
const header = document.getElementById('main-header');

// Fonction pour télécharger le CV
function downloadCV() {
    window.open('./cv/Gaspard_Catry_CV.pdf', '_blank');
}

// Fonction pour télécharger le Portfolio
function downloadPortfolio() {
    window.open('./portfolio/Gaspard_Catry_Portfolio.pdf', '_blank');
}

// Fonction pour afficher le header lors du scroll vers le haut
window.onscroll = function () {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition < lastScrollPosition || currentScrollPosition < 50) {
        // Si on scrolle vers le haut ou est proche du haut de la page, afficher le header
        header.classList.remove('hidden');
    } else {
        // Si on scrolle vers le bas, cacher le header
        header.classList.add('hidden');
    }

    // Mettre à jour la dernière position de scroll
    lastScrollPosition = currentScrollPosition;
};

// Script pour les barres de compétences (compétences en pourcentage)
document.addEventListener('DOMContentLoaded', function() {
    const skillCharts = document.querySelectorAll('.chart');
    skillCharts.forEach(chart => {
        const percent = chart.getAttribute('data-percent');
        chart.style.width = percent + '%';
        chart.textContent = percent + '%';
    });
});
