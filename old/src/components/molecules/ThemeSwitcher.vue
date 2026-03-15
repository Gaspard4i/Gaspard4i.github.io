<template>
  <div class="theme-switcher">
    <button 
      @click="toggleDropdown"
      class="theme-button"
      aria-label="Changer de thème"
    >
      <span class="text-sm font-medium">Theme</span>
      <i class="fa-solid fa-chevron-down ml-2 transition-transform text-sm" :class="{ 'rotate-180': isOpen }"></i>
    </button>

    <transition name="dropdown">
      <div v-if="isOpen" class="theme-dropdown">
        <button
          v-for="theme in themesList"
          :key="theme.id"
          @click="selectTheme(theme.id)"
          class="theme-option"
          :class="{ 'active': currentTheme === theme.id }"
          :style="getThemeBackgroundStyle(theme.id)"
        >
          <span class="theme-label">{{ theme.name }}</span>
          <div class="theme-swatches">
            <div 
              v-for="(color, index) in getThemeColors(theme.id)"
              :key="index"
              class="color-swatch"
              :style="{ backgroundColor: color }"
            />
          </div>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../../composables/useTheme'

const { currentTheme, setTheme, getThemesList, themes } = useTheme()
const isOpen = ref(false)

const themesList = getThemesList()

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectTheme = (themeId) => {
  setTheme(themeId)
  isOpen.value = false
}

// Obtenir 4 couleurs représentatives pour la palette visuelle
const getThemeColors = (themeId) => {
  const theme = themes[themeId]
  if (!theme) return []
  
  return [
    theme.colors.primary,
    theme.colors.secondary,
    theme.colors.accent,
    theme.colors['base-content']
  ]
}

// Obtenir le style de background pour chaque option
const getThemeBackgroundStyle = (themeId) => {
  const theme = themes[themeId]
  if (!theme) return {}
  
  return {
    backgroundColor: theme.colors['base-100'],
    color: theme.colors['base-content']
  }
}

// Fermer le dropdown si on clique ailleurs
const handleClickOutside = (event) => {
  const themeSwitcher = document.querySelector('.theme-switcher')
  if (themeSwitcher && !themeSwitcher.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.theme-switcher {
  @apply relative;
}

.theme-button {
  border-radius: var(--radius-selector);
  padding: 0.5rem 1rem;
  @apply flex items-center space-x-2 transition-all duration-300 border;
  background-color: var(--color-base-200);
  color: var(--color-base-content);
  border-color: var(--color-neutral);
}

.theme-button:hover {
  border-color: var(--color-primary);
}

.theme-dropdown {
  border-radius: var(--radius-selector);
  @apply absolute top-full right-0 mt-2 shadow-2xl overflow-hidden z-50 min-w-[280px] max-h-[400px] overflow-y-auto;
  background-color: var(--color-base-200);
  border: 1px solid var(--color-neutral);
}

.theme-option {
  @apply w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200;
  border-bottom: 1px solid var(--color-neutral);
  opacity: 0.7;
}

.theme-option:last-child {
  border-bottom: none;
}

.theme-option:hover {
  opacity: 1;
  filter: brightness(1.05);
}

.theme-option.active {
  opacity: 1;
  border: 2px solid var(--color-primary);
  margin: -1px;
}

.theme-label {
  @apply text-sm font-medium;
}

.theme-swatches {
  @apply flex gap-1;
}

.color-swatch {
  @apply w-6 h-6 rounded;
  border: 1px solid var(--color-neutral);
}

.dropdown-enter-active,
.dropdown-leave-active {
  @apply transition-all duration-200;
}

.dropdown-enter-from,
.dropdown-leave-to {
  @apply opacity-0 transform scale-95;
}
</style>
