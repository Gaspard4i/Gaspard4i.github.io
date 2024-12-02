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

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline article');
    const spotifyPlayer = document.getElementById('spotify-player');

    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
            checkAllSelected();
        });
    });

    function checkAllSelected() {
        const allSelected = Array.from(timelineItems).every(item => item.classList.contains('selected'));
        if (allSelected) {
            spotifyPlayer.classList.remove('hidden');
        } else {
            spotifyPlayer.classList.add('hidden');
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
    $('[data-bs-toggle="tooltip"]').tooltip();
});

document.addEventListener('DOMContentLoaded', () => {
    $('[data-bs-toggle="popover"]').popover();
    $('.carousel').carousel({
        interval: 2000
    });
});

$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    if (window.scrollY > 60) {
      document.querySelector("#scroll-top").classList.add("active");
    } else {
      document.querySelector("#scroll-top").classList.remove("active");
    }

    $("section").each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr("id");

      if (top > offset && top < offset + height) {
        $(".navbar ul li a").removeClass("active");
        $(".navbar").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  // smooth scrolling
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      500,
      "linear"
    );
  });
});

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
  strings: ["Etudiant", "Consultant Bullshit", "Chat-gpt User", "Joueur de Minecraft"/*, "Stop, ne regarde pas mon écran stp", "OH", "STOP!" */],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
  let response;
  type === "skills"
    ? (response = await fetch("skills.json"))
    : (response = await fetch("./projects/projects.json"));
  const data = await response.json();
  return data;
}

function showSkills(skills) {
  let skillsContainer = document.getElementById("skillsContainer");
  let skillHTML = "";
  skills.forEach((skill) => {
    skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`;
  });
  skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";
  projects
    .slice(0, 10)
    .filter((project) => project.category != "android")
    .forEach((project) => {
      projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`;
    });
  projectsContainer.innerHTML = projectHTML;

  // <!-- tilt js effect starts -->
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
  });
  // <!-- tilt js effect ends -->

  /* SCROLL REVEAL ANIMATION  */
  const srtop = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 1000,
    reset: true,
  });

  /* SCROLL PROJECTS */
  srtop.reveal(".work .box", { interval: 200 });
}

async function submitForm(event) {
  event.preventDefault();
  const form = document.getElementById("contact-form");
  const formData = new FormData(form);
  const statusMessage = document.getElementById("status-message");

  try {
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.ok) {
      statusMessage.textContent = "Message sent successfully!";
      statusMessage.style.color = "green";
      form.reset();
    } else {
      statusMessage.textContent = `Error: ${result.error}`;
      statusMessage.style.color = "red";
    }
  } catch (error) {
    statusMessage.textContent = `Error: ${error.message}`;
    statusMessage.style.color = "red";
  }
}

document
  .getElementById("contact-form")
  .addEventListener("submit", (event) => submitForm(event));

fetchData().then((data) => {
  showSkills(data);
});

fetchData("projects").then((data) => {
  showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
});

document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 1000,
  reset: true,
});

/* SCROLL HOME */
srtop.reveal(".home .content h3", { delay: 200 });
srtop.reveal(".home .content p", { delay: 200 });
srtop.reveal(".home .content .btn", { delay: 200 });

srtop.reveal(".home .image", { delay: 400 });
srtop.reveal(".home .linkedin", { interval: 600 });
srtop.reveal(".home .github", { interval: 800 });
srtop.reveal(".home .twitter", { interval: 1000 });
srtop.reveal(".home .telegram", { interval: 600 });
srtop.reveal(".home .instagram", { interval: 600 });
srtop.reveal(".home .dev", { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal(".about .content h3", { delay: 200 });
srtop.reveal(".about .content .tag", { delay: 200 });
srtop.reveal(".about .content p", { delay: 200 });
srtop.reveal(".about .content .box-container", { delay: 200 });
srtop.reveal(".about .content .resumebtn", { delay: 200 });

/* COMPÉTENCES DE DÉFILEMENT */
srtop.reveal(".skills .container", { interval: 200 });
srtop.reveal(".skills .container .bar", { delay: 400 });

/* ÉDUCATION PAR DÉFILEMENT */
srtop.reveal(".education .box", { interval: 200 });

/* SCROLL LES PROJETS */
srtop.reveal(".work .box", { interval: 200 });

/* EXPÉRIENCE DE DÉFILEMENT */
srtop.reveal(".experience .timeline", { delay: 400 });
srtop.reveal(".experience .timeline .container", { interval: 400 });

/* SCROLL LE CONTACT */
srtop.reveal(".contact .container", { delay: 400 });
srtop.reveal(".contact .container .form-group", { delay: 400 });


/* ANIMATION TIMELINE */
const timelineItems = document.querySelectorAll('.timeline article');
timelineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        item.classList.add('visible');
    } else {
        item.classList.remove('visible');
    }
});
