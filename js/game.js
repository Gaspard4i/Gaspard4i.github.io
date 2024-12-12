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
    let isAdminMode = false;
    let isPasswordEntered = false;
    const yellowSpeedLimit = 5;

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
            informations = null;
        });

    function getRandomInfo(type) {
        if (!informations || !informations[type] || informations[type].length === 0) {
            return { nom_info: "", info: "Information" };
        }
        const infoList = informations[type];
        return infoList[Math.floor(Math.random() * infoList.length)];
    }

    recordElement.textContent = `Record: ${record}`;

    // Reset game variables
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

    // Start the game
    function startGame() {
        gameModal.style.display = 'none';
        gameOverModal.style.display = 'none';
        pauseModal.style.display = 'none';
        emptyModal.style.display = 'none';
        resetGameVariables();
        scoreElement.textContent = `Score: ${score}`;
        playerPosition = { x: platformGame.offsetWidth / 2 - player.offsetWidth / 2, y: platformGame.offsetHeight / 2 - player.offsetHeight / 2 };
        player.style.left = `${playerPosition.x}px`;
        player.style.top = `${playerPosition.y}px`;
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
        createObstacles();
        requestAnimationFrame(updatePlayer);
        requestAnimationFrame(updateObstacles);
    }

    // Update the timer
    function updateTimer() {
        if (!isPaused) {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            timerElement.textContent = `Temps: ${elapsedTime}s`;
        }
    }

    // Move the player
    function movePlayer(event) {
        if (event.touches) {
            mousePosition.x = event.touches[0].clientX;
            mousePosition.y = event.touches[0].clientY;
        } else {
            mousePosition.x = event.clientX;
            mousePosition.y = event.clientY;
        }
    }

    // Check for collisions
    function checkCollisions() {
        if (isAdminMode) return;
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
                if (score > record) {
                    record = score;
                    localStorage.setItem('record', record);
                    recordElement.textContent = `Record: ${record}`;
                }
            }
        });
    }

    // Update the player's position
    function updatePlayer() {
        if (!isPaused && !gameOver) {
            const dx = mousePosition.x - (playerPosition.x + player.offsetWidth / 2);
            const dy = mousePosition.y - (playerPosition.y + player.offsetHeight / 2);
            playerPosition.x += dx * 0.35;
            playerPosition.y += dy * 0.35;

            if (playerPosition.x < 0) playerPosition.x = 0;
            if (playerPosition.y < 0) playerPosition.y = 0;
            if (playerPosition.x + player.offsetWidth > platformGame.offsetWidth) playerPosition.x = platformGame.offsetWidth - player.offsetWidth;
            if (playerPosition.y + player.offsetHeight > platformGame.offsetHeight) playerPosition.y = platformGame.offsetHeight - player.offsetHeight;

            player.style.left = `${playerPosition.x}px`;
            player.style.top = `${playerPosition.y}px`;

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

            checkCollisions();

            requestAnimationFrame(updatePlayer);
        }
    }

    // Toggle pause state
    function togglePause() {
        if (gameModal.style.display === 'flex' || gameOverModal.style.display === 'flex') {
            return;
        }
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(timerInterval);
            pauseScoreElement.textContent = `Score: ${score}`;
            pauseModal.style.display = 'flex';
            closePauseBtn.style.display = 'block';
        } else {
            startTime = Date.now() - (parseInt(timerElement.textContent.split(' ')[1]) * 1000);
            timerInterval = setInterval(updateTimer, 1000);
            pauseModal.style.display = 'none';
            closePauseBtn.style.display = 'none';
            passwordModal.style.display = 'none';
            requestAnimationFrame(updatePlayer);
            requestAnimationFrame(updateObstacles);
        }
    }

    continueGameBtn.addEventListener('click', togglePause);

    quitGameBtn.addEventListener('click', () => {
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        timerElement.textContent = `Temps: 0s`;
        clearInterval(timerInterval);
        const obstaclesContainer = document.getElementById('obstacles-container');
        obstaclesContainer.innerHTML = '';
        window.close();
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

    document.addEventListener('copy', (event) => event.preventDefault());
    document.addEventListener('cut', (event) => event.preventDefault());
    document.addEventListener('paste', (event) => event.preventDefault());
    document.addEventListener('contextmenu', (event) => event.preventDefault());

    gameOverModal.style.display = 'none';
    pauseModal.style.display = 'none';
    gameModal.style.display = 'flex';

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.key === 'Escape') {
            togglePause();
        } else if (event.key === '²' && isAdminMode) {
            gameOver = true;
            gameOverModal.style.display = 'flex';
            clearInterval(timerInterval);
        } else if (event.key === '*') {
            if (isAdminMode) {
                isAdminMode = false;
                player.classList.remove('admin');
            } else if (isPasswordEntered) {
                isAdminMode = true;
                player.classList.add('admin');
            } else {
                togglePause();
                passwordModal.style.display = 'flex';
                const passwordInput = document.getElementById('password-input');
                passwordInput.focus();
            }
        } else if (event.key === 'Enter' && gameModal.style.display === 'flex') {
            document.getElementById('start-game-btn').click();
        }
    });

    document.addEventListener('mousemove', movePlayer);

    window.addEventListener('blur', () => {
        if (!isPaused && !gameOver) {
            togglePause();
        }
    });

    playerPosition = { x: platformGame.offsetWidth / 2 - player.offsetWidth / 2, y: platformGame.offsetHeight / 2 - player.offsetHeight / 2 };
    player.style.left = `${playerPosition.x}px`;
    player.style.top = `${playerPosition.y}px`;

    // Create a blue obstacle
    function createObstacle() {
        const obstaclesContainer = document.getElementById('obstacles-container');
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        const info = getRandomInfo('basique');
        obstacle.textContent = `${info.nom_info} ${info.info}`;

        // Adjust the size of the obstacle to fit the text
        obstacle.style.width = 'auto';
        obstacle.style.height = 'auto';
        obstacle.style.padding = '10px';
        obstacle.style.whiteSpace = 'nowrap';

        const leftPosition = Math.random() * (window.innerWidth - obstacle.offsetWidth);
        const topPosition = Math.random() * (gameHeader.offsetHeight - obstacle.offsetHeight);

        obstacle.style.left = `${leftPosition}px`;
        obstacle.style.top = `${topPosition}px`;

        obstaclesContainer.appendChild(obstacle);
    }

    // Create a yellow obstacle
    function createYellowObstacle() {
        const obstaclesContainer = document.getElementById('obstacles-container');
        const yellowObstacle = document.createElement('div');
        yellowObstacle.classList.add('yellow-obstacle');
        const info = getRandomInfo('cool');
        yellowObstacle.textContent = `${info.nom_info} ${info.info}`;

        // Adjust the size of the obstacle to fit the text
        yellowObstacle.style.width = 'auto';
        yellowObstacle.style.height = 'auto';
        yellowObstacle.style.padding = '10px';
        yellowObstacle.style.whiteSpace = 'nowrap';

        const side = Math.random() < 0.5 ? 'left' : 'right';
        yellowObstacle.style[side] = '0px';
        yellowObstacle.style.top = `${Math.random() * (window.innerHeight - yellowObstacle.offsetHeight)}px`;
        obstaclesContainer.appendChild(yellowObstacle);
    }

    // Create a red obstacle
    function createRedObstacle() {
        const obstaclesContainer = document.getElementById('obstacles-container');
        const redObstacle = document.createElement('div');
        redObstacle.classList.add('red-obstacle');
        const info = getRandomInfo('importante');
        redObstacle.textContent = `${info.nom_info} ${info.info}`;

        // Adjust the size of the obstacle to fit the text
        redObstacle.style.width = 'auto';
        redObstacle.style.height = 'auto';
        redObstacle.style.padding = '10px';
        redObstacle.style.whiteSpace = 'nowrap';

        redObstacle.style.left = `${Math.random() * (window.innerWidth - redObstacle.offsetWidth)}px`;
        redObstacle.style.top = `0px`;
        obstaclesContainer.appendChild(redObstacle);
    }

    // Create obstacles
    function createObstacles() {
        const obstaclesContainer = document.getElementById('obstacles-container');
        obstaclesContainer.innerHTML = '';
        createObstacle();
    }

    // Accelerate blue obstacles
    function accelerateBlueObstacles() {
        blueSpeed += 0.5;
    }

    // Accelerate red obstacles
    function accelerateRedObstacles() {
        redSpeed += 0.2;
    }

    // Accelerate yellow obstacles
    function accelerateYellowObstacles() {
        if (yellowSpeed < yellowSpeedLimit) {
            yellowSpeed += 0.3;
        }
    }

    // Move yellow obstacles
    function moveYellowObstacles() {
        const yellowObstacles = document.querySelectorAll('.yellow-obstacle');
        yellowObstacles.forEach(obstacle => {
            let left = parseFloat(obstacle.style.left) || 0;
            let right = parseFloat(obstacle.style.right) || 0;
            if (obstacle.style.left !== '') {
                left += yellowSpeed;
                if (left > window.innerWidth) {
                    left = -100;
                    const info = getRandomInfo('cool');
                    obstacle.textContent = `${info.nom_info} ${info.info}`;
                    accelerateYellowObstacles();
                    if (yellowObstacleThreshold > 3) {
                        yellowObstacleThreshold--;
                    }
                }
                obstacle.style.left = `${left}px`;
            } else {
                right += yellowSpeed;
                if (right > window.innerWidth) {
                    right = -100;
                    const info = getRandomInfo('cool');
                    obstacle.textContent = `${info.nom_info} ${info.info}`;
                    accelerateYellowObstacles();
                    if (yellowObstacleThreshold > 3) {
                        yellowObstacleThreshold--;
                    }
                }
                obstacle.style.right = `${right}px`;
            }
        });
    }

    // Move red obstacles
    function moveRedObstacles() {
        const redObstacles = document.querySelectorAll('.red-obstacle');
        redObstacles.forEach(obstacle => {
            let top = parseFloat(obstacle.style.top);
            top += redSpeed;
            if (top > window.innerHeight) {
                obstacle.remove();
                const info = getRandomInfo('importante');
                obstacle.textContent = `${info.nom_info} ${info.info}`;
            } else {
                obstacle.style.top = `${top}px`;
            }
        });
    }

    // Move obstacles
    function moveObstacles() {
        const obstacles = document.querySelectorAll('.obstacle');
        obstacles.forEach(obstacle => {
            let top = parseFloat(obstacle.style.top);
            top += blueSpeed;
            if (top > window.innerHeight) {
                top = -50;
                obstacle.style.left = `${Math.random() * (window.innerWidth - obstacle.offsetWidth)}px`;
                const info = getRandomInfo('basique');
                obstacle.textContent = `${info.nom_info} ${info.info}`;
                score++;
                scoreElement.textContent = `Score: ${score}`;
                if (score % 10 === 0 && blueSpeed < 10 && score <= 1000) {
                    blueSpeed += 0.5;
                }
                if (document.querySelectorAll('.obstacle').length < 6) {
                    createObstacle();
                }
                if (score % yellowObstacleThreshold === 0 && document.querySelectorAll('.yellow-obstacle').length < 3) {
                    createYellowObstacle();
                }
                if (score >= 30 && score % 30 === 0 && document.querySelectorAll('.red-obstacle').length < 2) {
                    createRedObstacle();
                }
            }
            obstacle.style.top = `${top}px`;
        });
        moveYellowObstacles();
        moveRedObstacles();
    }

    // Update obstacles
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

    const closePauseBtn = document.createElement('button');
    closePauseBtn.classList.add('close-btn');
    closePauseBtn.style.display = 'none';
    document.body.appendChild(closePauseBtn);

    const passwordModal = document.createElement('div');
    passwordModal.classList.add('modal');
    passwordModal.style.display = 'none';
    passwordModal.innerHTML = `
        <div class="modal-content">
            <h2>Entrez le mot de passe</h2>
            <input type="password" id="password-input" class="password-input" placeholder="Mot de passe">
            <button id="submit-password-btn" class="btn">Valider</button>
        </div>
    `;
    document.body.appendChild(passwordModal);

    closePauseBtn.addEventListener('click', () => {
        passwordModal.style.display = 'flex';
        const passwordInput = document.getElementById('password-input');
        passwordInput.value = '';
        passwordInput.focus();
    });

    document.getElementById('submit-password-btn').addEventListener('click', () => {
        const passwordInput = document.getElementById('password-input').value;
        if (passwordInput === 'godmod') {
            passwordModal.style.display = 'none';
            isAdminMode = true;
            isPasswordEntered = true;
            player.classList.add('admin');
        } else {
            alert('Mot de passe incorrect');
        }
    });

    document.getElementById('password-input').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            document.getElementById('submit-password-btn').click();
        }
    });

    const closePauseBtnInModal = document.createElement('button');
    closePauseBtnInModal.classList.add('close-btn');
    pauseModal.querySelector('.modal-content').appendChild(closePauseBtnInModal);

    closePauseBtnInModal.addEventListener('click', togglePause);
});
