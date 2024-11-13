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
    const spotifyPlayer = document.getElementById('spotify-player');

    timelineArticles.forEach(article => {
        article.addEventListener('click', () => {
            article.classList.toggle('active');
            checkAllActive();
        });
    });

    function checkAllActive() {
        const allActive = Array.from(timelineArticles).every(article => article.classList.contains('active'));
        if (allActive) {
            // Afficher ou masquer l'intégration Spotify
            spotifyPlayer.classList.toggle('hidden');
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
});

document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const platforms = document.querySelectorAll('.project-platform');
    const platformGame = document.querySelector('.platform-game');
    const openGameBtn = document.getElementById('open-game-btn');
    const gameModal = document.getElementById('game-modal');
    const closeBtn = document.querySelector('.close-btn');
    const pauseGameBtn = document.getElementById('pause-game-btn');
    const quitGameBtn = document.getElementById('quit-game-btn');
    const projectList = document.querySelector('.project-list');
    let playerPosition = { x: 50, y: 0 };
    let isJumping = false;
    let velocity = { x: 0, y: 0 };
    const gravity = 0.5;
    const jumpStrength = 10;
    let isPaused = false;
    let gameOver = false;

    function movePlayer(event) {
        const key = event.key.toLowerCase();
        if (key === 'd') {
            velocity.x = 5;
        } else if (key === 'q') {
            velocity.x = -5;
        }
    }

    function stopPlayer(event) {
        const key = event.key.toLowerCase();
        if (key === 'd' || key === 'q') {
            velocity.x = 0;
        }
    }

    function updatePlayer() {
        if (!isPaused && !gameOver) {
            playerPosition.x += velocity.x;
            playerPosition.y += velocity.y;
            velocity.y += gravity;

            if (playerPosition.y > 0) {
                playerPosition.y = 0;
                isJumping = false;
                velocity.y = 0;
            }

            player.style.left = `${playerPosition.x}px`;
            player.style.bottom = `${playerPosition.y}px`;

            checkPlatformCollision();
            requestAnimationFrame(updatePlayer);
        }
    }

    function checkPlatformCollision() {
        platforms.forEach(platform => {
            const platformRect = platform.getBoundingClientRect();
            const playerRect = player.getBoundingClientRect();
            if (
                playerRect.right > platformRect.left &&
                playerRect.left < platformRect.right &&
                playerRect.bottom > platformRect.top &&
                playerRect.top < platformRect.bottom
            ) {
                gameOver = true;
                alert('Game Over!');
                gameModal.style.display = 'none';
                projectList.style.display = 'flex';
            }
        });
    }

    function movePlatforms() {
        if (!isPaused && !gameOver) {
            platforms.forEach(platform => {
                let top = parseFloat(platform.style.top) || 0;
                top += 2; // Vitesse de défilement
                if (top > platformGame.offsetHeight) {
                    top = -100; // Réinitialiser la position en haut
                    platform.style.left = `${Math.random() * (platformGame.offsetWidth - platform.offsetWidth)}px`;
                }
                platform.style.top = `${top}px`;
            });
            requestAnimationFrame(movePlatforms);
        }
    }

    platforms.forEach(platform => {
        platform.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', null);
            platform.classList.add('dragging');
        });

        platform.addEventListener('dragend', (event) => {
            platform.classList.remove('dragging');
            const rect = platformGame.getBoundingClientRect();
            const x = event.clientX - rect.left - platform.offsetWidth / 2;
            const y = event.clientY - rect.top - platform.offsetHeight / 2;
            platform.style.position = 'absolute';
            platform.style.left = `${x}px`;
            platform.style.top = `${y}px`;
            platformGame.appendChild(platform);
        });
    });

    openGameBtn.addEventListener('click', () => {
        projectList.style.display = 'none';
        gameModal.style.display = 'block';
        gameOver = false;
        isPaused = false;
        requestAnimationFrame(updatePlayer);
        requestAnimationFrame(movePlatforms);
    });

    closeBtn.addEventListener('click', () => {
        gameModal.style.display = 'none';
        projectList.style.display = 'flex';
    });

    pauseGameBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        if (!isPaused) {
            requestAnimationFrame(updatePlayer);
            requestAnimationFrame(movePlatforms);
        }
    });

    quitGameBtn.addEventListener('click', () => {
        gameModal.style.display = 'none';
        projectList.style.display = 'flex';
    });

    window.addEventListener('click', (event) => {
        if (event.target === gameModal) {
            gameModal.style.display = 'none';
            projectList.style.display = 'flex';
        }
    });

    document.addEventListener('keydown', movePlayer);
    document.addEventListener('keyup', stopPlayer);
    requestAnimationFrame(updatePlayer);
});
