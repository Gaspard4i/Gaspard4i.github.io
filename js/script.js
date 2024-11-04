let lastScrollPosition = 0;
const header = document.getElementById('main-header');

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

    // Animation pour la frise chronologique
    const timelineItems = document.querySelectorAll('.timeline article');
    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
};

// Gérer le clic sur les bulles
document.addEventListener('DOMContentLoaded', () => {
    const timelineArticles = document.querySelectorAll('.timeline article');

    timelineArticles.forEach(article => {
        article.addEventListener('click', () => {
            article.classList.toggle('active');
            checkAllActive();
        });
    });

    function checkAllActive() {
        const allActive = Array.from(timelineArticles).every(article => article.classList.contains('active'));
        if (allActive) {
            // Action à effectuer lorsque tous les ronds sont verts foncés
            console.log("Tous les ronds sont verts foncés.");
            timelineArticles.forEach(article => {
                article.classList.remove('active');
            });
        }
    }
});

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
const slider = document.querySelector('.slider');
const skillsContainer = document.querySelector('.skills-container');

function setSliderPosition() {
    skillsContainer.style.transform = `translateX(${currentTranslate}px)`;
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function touchStart(event) {
    startPos = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.style.cursor = 'grabbing';
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    prevTranslate = currentTranslate;
    slider.style.cursor = 'grab';
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const skillCategories = document.querySelectorAll('.skill-category');

    slider.addEventListener('mousedown', touchStart);
    slider.addEventListener('mousemove', touchMove);
    slider.addEventListener('mouseup', touchEnd);
    slider.addEventListener('mouseleave', touchEnd);

    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchmove', touchMove);
    slider.addEventListener('touchend', touchEnd);

    // Désactiver la sélection de texte dans le slider
    slider.addEventListener('mousedown', (event) => event.preventDefault());

    // Gérer l'envoi du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    const envelopeAnimation = document.getElementById('envelope-animation');
    const toggleFormButton = document.getElementById('toggleForm');

    toggleFormButton.addEventListener('click', () => {
        contactForm.classList.toggle('hidden');
        toggleFormButton.textContent = contactForm.classList.contains('hidden') ? 'Afficher le formulaire' : 'Cacher le formulaire';
    });

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        envelopeAnimation.classList.remove('hidden');
        grecaptcha.enterprise.ready(async () => {
            const token = await grecaptcha.enterprise.execute('6LecR3UqAAAAAFx7ikHM3CgVg_O7YBQXxLgMmOtz', {action: 'submit'});
            // Ajoutez le token au formulaire avant de le soumettre
            const tokenInput = document.createElement('input');
            tokenInput.setAttribute('type', 'hidden');
            tokenInput.setAttribute('name', 'g-recaptcha-response');
            tokenInput.setAttribute('value', token);
            contactForm.appendChild(tokenInput);
            setTimeout(() => {
                contactForm.submit();
            }, 2000); // Attendre 2 secondes avant de soumettre le formulaire
        });
    });
});
