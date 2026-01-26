<template>
  <footer class="bg-base-200 py-12 px-6">
    <div class="container mx-auto">
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Liens rapides -->
        <div>
          <h3 class="text-xl font-bold mb-4 text-primary">Liens rapides</h3>
          <ul class="space-y-2">
            <li v-for="item in navItems" :key="item.id">
              <a :href="item.href" class="footer-link">
                <i class="fa-solid fa-chevron-right text-primary"></i>
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- About -->
        <div>
          <h3 class="text-xl font-bold mb-4 text-primary">Portfolio de Gaspard Catry</h3>
          <p class="text-base-content/70">
            Merci d'avoir visité mon site portfolio personnel. N'hésitez pas à me contacter.
          </p>
        </div>

        <!-- Social Links -->
        <div>
          <h3 class="text-xl font-bold mb-4 text-primary">Réseaux sociaux</h3>
          <div class="flex space-x-4 mt-6">
            <a 
              href="https://www.linkedin.com/in/gaspard-catry-070b70289/" 
              target="_blank"
              class="social-icon"
              aria-label="LinkedIn"
            >
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a 
              href="https://github.com/Gaspard4i" 
              target="_blank"
              class="social-icon"
              aria-label="GitHub"
            >
              <i class="fa-brands fa-github"></i>
            </a>
            <a 
              href="https://gitlab.univ-lille.fr/gaspard.catry.etu" 
              target="_blank"
              class="social-icon"
              aria-label="GitLab"
            >
              <i class="fa-brands fa-gitlab"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Credits -->
      <div class="border-t border-neutral/30 mt-8 pt-6">
        <p class="text-center text-xs opacity-50 mb-3">Icônes fournies par :</p>
        <div class="flex justify-center items-center gap-8 mb-6">
          <a
            href="https://fontawesome.com"
            target="_blank"
            class="flex items-center gap-2 text-xs opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            <i class="fa-brands fa-font-awesome"></i>
            <span>Font Awesome</span>
          </a>
          <a
            href="https://iconify.design"
            target="_blank"
            class="flex items-center gap-2 text-xs opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            <i class="fa-solid fa-icons"></i>
            <span>Iconify</span>
          </a>
        </div>
      </div>

      <div class="text-center text-base-content/50 pt-4">
        <p>&copy; 2026 Gaspard Catry. Tous droits réservés.</p>
      </div>
    </div>

    <!-- Scroll to top button -->
    <a 
      href="#home" 
      class="scroll-top"
      aria-label="Retour en haut"
    >
      <i class="fa-solid fa-arrow-up"></i>
    </a>
  </footer>
</template>

<script setup>
const navItems = [
  { id: 'home', label: 'Accueil', href: '#home' },
  { id: 'about', label: 'À propos', href: '#about' },
  { id: 'skills', label: 'Compétences', href: '#skills' },
  { id: 'education', label: 'Parcours', href: '#education' },
  { id: 'work', label: 'Projets', href: '#work' },
  { id: 'experience', label: 'Expérience', href: '#experience' },
]
</script>

<style scoped>
.footer-link {
  @apply flex items-center space-x-2 transition-colors duration-300;
  color: color-mix(in oklch, var(--color-base-content) 70%, transparent);
}

.footer-link:hover {
  color: var(--color-primary);
}

.social-icon {
  @apply w-10 h-10 bg-primary hover:bg-secondary rounded-full flex items-center justify-center text-primary-content transition-all duration-300 transform hover:scale-110;
}

.scroll-top {
  @apply fixed bottom-8 right-8 w-12 h-12 bg-primary hover:bg-secondary rounded-full flex items-center justify-center text-primary-content text-xl shadow-lg transition-all duration-300 transform hover:scale-110;
}
</style>
