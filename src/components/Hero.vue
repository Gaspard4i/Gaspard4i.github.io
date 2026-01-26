<template>
  <section
    id="home"
    class="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8"
  >
    <div class="container mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Image -->
        <div class="flex justify-center lg:order-2">
          <div class="relative">
            <img
              :src="avatarUrl"
              alt="Photo de Gaspard Catry"
              class="rounded-full w-64 h-64 lg:w-96 lg:h-96 object-cover shadow-2xl border-4 border-primary"
            />
            <div
              class="absolute inset-0 rounded-full"
            ></div>
          </div>
        </div>

        <!-- Content -->
        <div class="text-center lg:text-left lg:order-1">
          <h2 class="text-4xl lg:text-6xl font-bold mb-4">
            Bonjour, je m'appelle <span class="text-primary">Gaspard</span>
          </h2>
          <p class="text-xl lg:text-2xl text-base-content/70 mb-8">
            Je suis un
            <span class="text-secondary font-semibold">{{ currentRole }}</span>
          </p>

          <a
            href="/#about"
            class="inline-flex items-center space-x-3 bg-primary hover:bg-secondary text-primary-content transition-all duration-300 transform hover:scale-105 shadow-lg"
            style="border-radius: var(--radius-selector); padding: 1rem 2rem"
          >
            <span class="font-semibold">À propos de moi</span>
            <i class="fa-solid fa-arrow-down"></i>
          </a>

          <!-- Social Links -->
          <div class="flex justify-center lg:justify-start space-x-6 mt-8">
            <SocialLink
              href="https://www.linkedin.com/in/gaspard-catry-070b70289/"
              icon="fa-brands fa-linkedin"
              variant="linkedin"
              aria-label="LinkedIn"
            />
            <SocialLink
              href="https://github.com/Gaspard4i"
              icon="fa-brands fa-github"
              variant="github"
              aria-label="GitHub"
            />
            <SocialLink
              href="https://gitlab.univ-lille.fr/gaspard.catry.etu"
              icon="fa-brands fa-gitlab"
              variant="gitlab"
              aria-label="GitLab"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import SocialLink from "./atoms/SocialLink.vue";

const roles = ref([]);
const currentRole = ref("");
let roleIndex = 0;
let intervalId = null;

// Your Gravatar email hash (SHA256)
// You can generate it at https://gravatar.com/site/check/
const gravatarHash =
  "ea7dd79c8a54c68d3149de07d613daa105ab40f29c64da6cbbe540d6f362f93c"; // Replace with your actual SHA256 hash

// Gravatar avatar URL with size parameter
const avatarUrl = computed(() => {
  const size = 400; // Size in pixels (supports up to 2048)
  return `https://www.gravatar.com/avatar/${gravatarHash}?s=${size}&d=identicon`;
});

onMounted(async () => {
  try {
    const response = await fetch("/data/roles.json");
    roles.value = await response.json();
    currentRole.value = roles.value[0];

    intervalId = setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.value.length;
      currentRole.value = roles.value[roleIndex];
    }, 3000);
  } catch (error) {
    console.error("Erreur lors du chargement des rôles:", error);
    currentRole.value = "développeur";
  }
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.social-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  @apply flex items-center justify-center text-primary-content text-xl transition-all duration-300 transform hover:scale-110 shadow-lg;
}

@media (min-width: 640px) {
  .social-icon {
    width: 3.5rem;
    height: 3.5rem;
  }
}
</style>
