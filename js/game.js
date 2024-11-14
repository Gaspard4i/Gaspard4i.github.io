document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const platformGame = document.querySelector('.platform-game');
    const quitGameBtn = document.getElementById('quit-game-btn');
    const startGameBtn = document.getElementById('start-game-btn');
    const restartGameBtn = document.getElementById('restart-game-btn');
    const continueGameBtn = document.getElementById('continue-game-btn');
    const gameModal = document.getElementById('game-modal');
    const gameOverModal = document.getElementById('game-over-modal');
    const pauseModal = document.getElementById('pause-modal');
    const closeGameOverBtn = document.getElementById('close-game-over-btn');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const recordElement = document.getElementById('record');
    const pauseScoreElement = document.getElementById('pause-score');
    const gameHeader = document.getElementById('game-header');
    let playerPosition = { x: 0, y: 0 };
    let isPaused = false;
    let gameOver = false;
    let score = 0;
    let speed = 2;
    let startTime;
    let timerInterval;
    let record = localStorage.getItem('record') || 0;
    let mousePosition = { x: 0, y: 0 };
    let informations = {};
    let blueSpeed = 2;
    let redSpeed = 0.5;
    let yellowSpeed = 1;
    let yellowObstacleThreshold = 20;

    fetch('./data/informations.json')
        .then(response => response.json())
        .then(data => {
            informations = data.reduce((acc, info) => {
                if (!acc[info.type]) acc[info.type] = [];
                acc[info.type].push(info);
                return acc;
            }, {});
        })
        .catch(error => {
            console.error('Erreur lors du chargement des informations:', error);
            informations = null; // Indiquer qu'il y a eu une erreur
        });

    function getRandomInfo(type) {
        if (!informations || !informations[type] || informations[type].length === 0) {
            return { nom_info: "", info: "Information" }; // Retourner "Information" en cas d'erreur
        }
        const infoList = informations[type];
        return infoList[Math.floor(Math.random() * infoList.length)];
    }

    recordElement.textContent = `Record: ${record}`;

    function resetGameVariables() {
        blueSpeed = 2;
        redSpeed = 0.5;
        yellowSpeed = 1;
        yellowObstacleThreshold = 20;
        score = 0;
        speed = 2;
        isPaused = false;
        gameOver = false;
    }

    function startGame() {
        gameModal.style.display = 'none';
        gameOverModal.style.display = 'none';
        pauseModal.style.display = 'none';
        emptyModal.style.display = 'none';
        resetGameVariables(); // Réinitialiser les variables de jeu
        scoreElement.textContent = `Score: ${score}`; // Réinitialiser le score affiché
        playerPosition = { x: platformGame.offsetWidth / 2 - player.offsetWidth / 2, y: platformGame.offsetHeight / 2 - player.offsetHeight / 2 };
        player.style.left = `${playerPosition.x}px`;
        player.style.top = `${playerPosition.y}px`;
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
        createObstacles(); // Régénérer les obstacles
        requestAnimationFrame(updatePlayer);
        requestAnimationFrame(updateObstacles);
    }

    function updateTimer() {
        if (!isPaused) {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            timerElement.textContent = `Temps: ${elapsedTime}s`;
        }
    }

    function movePlayer(event) {
        if (event.touches) {
            mousePosition.x = event.touches[0].clientX;
            mousePosition.y = event.touches[0].clientY;
        } else {
            mousePosition.x = event.clientX;
            mousePosition.y = event.clientY;
        }
    }

    function checkCollisions() {
        const playerRect = player.getBoundingClientRect();
        const obstacles = document.querySelectorAll('.obstacle, .red-obstacle, .yellow-obstacle');

        obstacles.forEach(obstacle => {
            const obstacleRect = obstacle.getBoundingClientRect();
            if (
                playerRect.top < obstacleRect.bottom &&
                playerRect.bottom > obstacleRect.top &&
                playerRect.left < obstacleRect.right &&
                playerRect.right > obstacleRect.left
            ) {
                gameOver = true;
                gameOverModal.style.display = 'flex';
                clearInterval(timerInterval);
                // Mettre à jour le record si le score actuel est supérieur
                if (score > record) {
                    record = score;
                    localStorage.setItem('record', record);
                    recordElement.textContent = `Record: ${record}`;
                }
            }
        });
    }

    function updatePlayer() {
        if (!isPaused && !gameOver) {
            const dx = mousePosition.x - (playerPosition.x + player.offsetWidth / 2);
            const dy = mousePosition.y - (playerPosition.y + player.offsetHeight / 2);
            playerPosition.x += dx * 0.35; // Ajuster la vitesse de suivi
            playerPosition.y += dy * 0.35; // Ajuster la vitesse de suivi

            // Vérifier que le rond reste dans la zone visible
            if (playerPosition.x < 0) playerPosition.x = 0;
            if (playerPosition.y < 0) playerPosition.y = 0;
            if (playerPosition.x + player.offsetWidth > platformGame.offsetWidth) playerPosition.x = platformGame.offsetWidth - player.offsetWidth;
            if (playerPosition.y + player.offsetHeight > platformGame.offsetHeight) playerPosition.y = platformGame.offsetHeight - player.offsetHeight;

            player.style.left = `${playerPosition.x}px`;
            player.style.top = `${playerPosition.y}px`;

            // Vérifier la collision avec le header
            const headerRect = gameHeader.getBoundingClientRect();
            const playerRect = player.getBoundingClientRect();
            if (
                playerRect.top < headerRect.bottom &&
                playerRect.bottom > headerRect.top &&
                playerRect.left < headerRect.right &&
                playerRect.right > headerRect.left
            ) {
                playerPosition.y = headerRect.bottom;
            }

            // Vérifier les collisions avec les obstacles
            checkCollisions();

            requestAnimationFrame(updatePlayer);
        }
    }

    function togglePause() {
        if (gameModal.style.display === 'flex' || gameOverModal.style.display === 'flex') {
            return; // Ne pas permettre la pause si le jeu est dans le menu de présentation ou de Game Over
        }
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(timerInterval);
            pauseScoreElement.textContent = `Score: ${score}`;
            pauseModal.style.display = 'flex';
        } else {
            startTime = Date.now() - (parseInt(timerElement.textContent.split(' ')[1]) * 1000);
            timerInterval = setInterval(updateTimer, 1000);
            pauseModal.style.display = 'none';
            requestAnimationFrame(updatePlayer);
            requestAnimationFrame(updateObstacles); // Ajouter cette ligne pour reprendre le mouvement des obstacles
        }
    }

    function toggleEmptyPause() {
        if (gameModal.style.display === 'flex' || gameOverModal.style.display === 'flex') {
            return; // Ne pas permettre la pause si le jeu est dans le menu de présentation ou de Game Over
        }
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(timerInterval);
            emptyModal.style.display = 'flex';
        } else {
            startTime = Date.now() - (parseInt(timerElement.textContent.split(' ')[1]) * 1000);
            timerInterval = setInterval(updateTimer, 1000);
            emptyModal.style.display = 'none';
            requestAnimationFrame(updatePlayer);
            requestAnimationFrame(updateObstacles); // Ajouter cette ligne pour reprendre le mouvement des obstacles
        }
    }

    continueGameBtn.addEventListener('click', togglePause);

    quitGameBtn.addEventListener('click', () => {
        score = 0;
        scoreElement.textContent = `Score: ${score}`; // Réinitialiser le score affiché
        timerElement.textContent = `Temps: 0s`; // Réinitialiser le temps affiché
        clearInterval(timerInterval); // Arrêter le timer
        const obstaclesContainer = document.getElementById('obstacles-container');
        obstaclesContainer.innerHTML = ''; // Vider les obstacles
        window.close(); // Fermer la page
    });

    startGameBtn.addEventListener('click', startGame);
    restartGameBtn.addEventListener('click', () => {
        gameOverModal.style.display = 'none';
        startGame();
    });
    closeGameOverBtn.addEventListener('click', () => {
        gameOverModal.style.display = 'none';
        gameModal.style.display = 'flex';
    });

    platformGame.addEventListener('mousemove', movePlayer);
    platformGame.addEventListener('touchmove', movePlayer);

    // Désactiver les fonctionnalités de copier-coller et de sélection de texte
    document.addEventListener('copy', (event) => event.preventDefault());
    document.addEventListener('cut', (event) => event.preventDefault());
    document.addEventListener('paste', (event) => event.preventDefault());
    document.addEventListener('contextmenu', (event) => event.preventDefault());

    // Masquer la fenêtre de Game Over et Pause au chargement de la page
    gameOverModal.style.display = 'none';
    pauseModal.style.display = 'none';

    // Afficher la fenêtre modale au chargement de la page
    gameModal.style.display = 'flex';

    // Ajouter un écouteur pour la barre d'espace pour faire pause
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.key === 'Escape') {
            togglePause();
        } else if (event.ctrlKey) {
            toggleEmptyPause();
        }
    });

    // Ajouter un écouteur pour le mouvement de la souris
    document.addEventListener('mousemove', movePlayer);

    // Ajouter un écouteur pour d��tecter lorsque l'utilisateur quitte la page
    window.addEventListener('blur', () => {
        if (!isPaused && !gameOver) {
            togglePause();
        }
    });

    // Positionner la boule au centre de l'écran au chargement de la page
    playerPosition = { x: platformGame.offsetWidth / 2 - player.offsetWidth / 2, y: platformGame.offsetHeight / 2 - player.offsetHeight / 2 };
    player.style.left = `${playerPosition.x}px`;
    player.style.top = `${playerPosition.y}px`;

    function createObstacle() {
        const obstaclesContainer = document.getElementById('obstacles-container');
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        const info = getRandomInfo('basique');
        obstacle.textContent = `${info.nom_info} ${info.info}`;

        // Générer une position aléatoire en évitant le header
        const obstacleWidth = window.innerWidth < 768 ? 50 : 100; // Largeur des rectangles
        const obstacleHeight = window.innerWidth < 768 ? 25 : 50; // Hauteur des rectangles
        const leftPosition = Math.random() * (window.innerWidth - obstacleWidth);
        const topPosition = Math.random() * (gameHeader.offsetHeight - obstacleHeight);

        obstacle.style.left = `${leftPosition}px`;
        obstacle.style.top = `${topPosition}px`;
        obstacle.style.width = `${obstacleWidth}px`;
        obstacle.style.height = `${obstacleHeight}px`;

        obstaclesContainer.appendChild(obstacle);
    }

    function createYellowObstacle() {
        const obstaclesContainer = document.getElementById('obstacles-container');
        const yellowObstacle = document.createElement('div');
        yellowObstacle.classList.add('yellow-obstacle');
        const info = getRandomInfo('cool');
        yellowObstacle.textContent = `${info.nom_info} ${info.info}`;
        const side = Math.random() < 0.5 ? 'left' : 'right';
        yellowObstacle.style[side] = '0px';
        yellowObstacle.style.top = `${Math.random() * (window.innerHeight - (window.innerWidth < 768 ? 37.5 : 75))}px`; // Ajuster pour la nouvelle hauteur
        obstaclesContainer.appendChild(yellowObstacle);
    }

    function createRedObstacle() {
        const obstaclesContainer = document.getElementById('obstacles-container');
        const redObstacle = document.createElement('div');
        redObstacle.classList.add('red-obstacle');
        const info = getRandomInfo('importante');
        redObstacle.textContent = `${info.nom_info} ${info.info}`;
        redObstacle.style.left = `${Math.random() * (window.innerWidth - (window.innerWidth < 768 ? 100 : 200))}px`; // Ajuster pour la nouvelle largeur
        redObstacle.style.top = `0px`; // Commencer en haut
        obstaclesContainer.appendChild(redObstacle);
    }

    function createObstacles() {
        const obstaclesContainer = document.getElementById('obstacles-container');
        obstaclesContainer.innerHTML = ''; // Vider les obstacles existants

        // Générer le premier obstacle bleu
        createObstacle();
    }

    function accelerateBlueObstacles() {
        blueSpeed += 0.5;
    }

    function accelerateRedObstacles() {
        redSpeed += 0.2;
    }

    function accelerateYellowObstacles() {
        yellowSpeed += 0.3;
    }

    function moveYellowObstacles() {
        const yellowObstacles = document.querySelectorAll('.yellow-obstacle');
        yellowObstacles.forEach(obstacle => {
            let left = parseFloat(obstacle.style.left) || 0;
            let right = parseFloat(obstacle.style.right) || 0;
            if (obstacle.style.left !== '') {
                left += yellowSpeed; // Utiliser la vitesse des obstacles jaunes
                if (left > window.innerWidth) {
                    left = -100; // Réinitialiser à gauche
                    accelerateYellowObstacles(); // Augmenter la vitesse des obstacles jaunes
                    if (yellowObstacleThreshold > 3) {
                        yellowObstacleThreshold--; // Réduire le seuil jusqu'à 3
                    }
                }
                obstacle.style.left = `${left}px`;
            } else {
                right += yellowSpeed; // Utiliser la vitesse des obstacles jaunes
                if (right > window.innerWidth) {
                    right = -100; // Réinitialiser à droite
                    accelerateYellowObstacles(); // Augmenter la vitesse des obstacles jaunes
                    if (yellowObstacleThreshold > 3) {
                        yellowObstacleThreshold--; // Réduire le seuil jusqu'à 3
                    }
                }
                obstacle.style.right = `${right}px`;
            }
        });
    }

    function moveRedObstacles() {
        const redObstacles = document.querySelectorAll('.red-obstacle');
        redObstacles.forEach(obstacle => {
            let top = parseFloat(obstacle.style.top);
            top += redSpeed; // Utiliser la vitesse des obstacles rouges
            if (top > window.innerHeight) {
                obstacle.remove(); // Supprimer l'obstacle lorsqu'il sort de l'écran
            } else {
                obstacle.style.top = `${top}px`;
            }
        });
    }

    function moveObstacles() {
        const obstacles = document.querySelectorAll('.obstacle');
        obstacles.forEach(obstacle => {
            let top = parseFloat(obstacle.style.top);
            top += blueSpeed; // Utiliser la vitesse des obstacles bleus
            if (top > window.innerHeight) {
                top = -50; // Régénérer en haut
                obstacle.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
                score++;
                scoreElement.textContent = `Score: ${score}`;
                if (score % 10 === 0 && blueSpeed < 10 && score <= 1000) {
                    blueSpeed += 0.5; // Augmenter la vitesse tous les 10 points, jusqu'à un maximum de 10
                }
                // Générer un nouvel obstacle bleu si moins de 7 sur l'écran
                if (document.querySelectorAll('.obstacle').length < 7) {
                    createObstacle();
                }
                // Générer un nouvel obstacle jaune si moins de 2 sur l'écran et tous les 20 points
                if (score % yellowObstacleThreshold === 0 && document.querySelectorAll('.yellow-obstacle').length < 3) {
                    createYellowObstacle();
                }
                // Générer un nouvel obstacle rouge si tous les 30 points et moins de 1 sur l'écran
                if (score >= 30 && score % 30 === 0 && document.querySelectorAll('.red-obstacle').length < 2) {
                    createRedObstacle();
                }
            }
            obstacle.style.top = `${top}px`;
        });
        moveYellowObstacles(); // Déplacer les obstacles jaunes
        moveRedObstacles(); // Déplacer les obstacles rouges
    }

    function updateObstacles() {
        if (!isPaused && !gameOver) {
            moveObstacles();
            requestAnimationFrame(updateObstacles);
        }
    }

    const emptyModal = document.createElement('div');
    emptyModal.classList.add('modal');
    emptyModal.style.display = 'none';
    emptyModal.innerHTML = `
        <div class="modal-content">
            <h2>Pause</h2>
        </div>
    `;
    document.body.appendChild(emptyModal);
});
