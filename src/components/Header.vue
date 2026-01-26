<template>
  <header class="fixed top-0 left-0 w-full bg-base-200/95 backdrop-blur-sm shadow-lg z-50">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-3 hover:opacity-80 transition">
          <img src="@/assets/images/finnstay.gif" alt="Logo" class="w-8 h-8" />
          <span class="text-xl font-bold text-base-content">Gaspard Catry</span>
        </a>

        <!-- Desktop: Theme Switcher + Menu burger -->
        <div class="flex items-center space-x-4">
          <ThemeSwitcher />
          
          <button 
            @click="toggleMenu" 
            class="lg:hidden text-base-content text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            <i :class="isMenuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'"></i>
          </button>
        </div>

        <!-- Navigation -->
        <ul 
          class="nav-links"
          :class="{'active': isMenuOpen}"
        >
          <li v-for="item in navItems" :key="item.id">
            <a 
              :href="item.href" 
              @click="closeMenu"
              class="nav-link"
              :class="{'active-link': activeSection === item.id}"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeSwitcher from './molecules/ThemeSwitcher.vue'

const isMenuOpen = ref(false)
const activeSection = ref('home')

const navItems = [
  { id: 'home', label: 'Accueil', href: '#home' },
  { id: 'about', label: 'À propos', href: '#about' },
  { id: 'skills', label: 'Compétences', href: '#skills' },
  { id: 'education', label: 'Parcours', href: '#education' },
  { id: 'work', label: 'Projets', href: '#work' },
  { id: 'experience', label: 'Expérience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  const sections = navItems.map(item => document.querySelector(item.href))
  const scrollPosition = window.scrollY + 100

  sections.forEach((section, index) => {
    if (section && section.offsetTop <= scrollPosition && 
        section.offsetTop + section.offsetHeight > scrollPosition) {
      activeSection.value = navItems[index].id
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.nav-links {
  @apply hidden lg:flex space-x-8;
}

.nav-links.active {
  @apply flex flex-col absolute top-full left-0 w-full bg-base-200 shadow-lg py-4 space-x-0 space-y-2;
}

.nav-link {
  @apply transition-colors duration-300 font-medium;
  color: color-mix(in oklch, var(--color-base-content) 70%, transparent);
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-links.active .nav-link {
  padding: 0.5rem 1.5rem;
}

.active-link {
  @apply text-primary;
}
</style>
