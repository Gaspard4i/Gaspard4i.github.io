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

// Fonction pour afficher le header lors du scroll vers le haut
window.onscroll = function () {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition < lastScrollPosition || currentScrollPosition < 50) {
        // Si on scrolle vers le haut ou est proche du haut de la page, afficher le header
        header.classList.remove('visible');
    } else {
        // Si on scrolle vers le bas, cacher le header
        header.classList.add('visible');
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

document.addEventListener("DOMContentLoaded", function () {
    const points = document.querySelectorAll('.timeline-point');

    points.forEach(point => {
        const year = point.getAttribute('data-year');
        const position = calculatePositionByYear(year);
        point.style.left = `${position}%`;
    });

    function calculatePositionByYear(year) {
        const startYear = 2020;
        const endYear = 2023;
        return ((year - startYear) / (endYear - startYear)) * 100;
    }
});

