<template>
  <div class="skills-filter">
    <!-- Search & Category Selector -->
    <div class="filter-input-wrapper">
      <div class="search-wrapper">
        <i class="fa-solid fa-search search-icon"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher une technologie..."
          class="search-input"
        />
        
        <!-- Category Dropdown -->
        <div ref="categoryDropdownRef" class="category-dropdown-wrapper">
          <button 
            @click="toggleCategoryDropdown"
            class="category-toggle-btn"
            :style="{
              borderRadius: 'var(--radius-selector)',
              padding: '0.5rem 1rem'
            }"
          >
            <i class="fa-solid fa-filter"></i>
            <span>Catégories</span>
            <i class="fa-solid fa-chevron-down" :class="{ 'rotate-180': showCategoryDropdown }"></i>
          </button>
          
          <!-- Dropdown -->
          <div v-if="showCategoryDropdown" class="category-dropdown">
            <button
              v-for="category in availableCategories"
              :key="category.id"
              @click="toggleCategory(category.id)"
              class="category-option"
              :class="{ active: selectedCategories.includes(category.id) }"
            >
              <i :class="category.icon"></i>
              <span>{{ category.label }}</span>
              <i v-if="selectedCategories.includes(category.id)" class="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Filters (Pills) -->
    <div class="active-filters">
      <span class="filter-label">Filtres :</span>
      
      <!-- Featured Toggle -->
      <button
        @click="$emit('toggle-featured')"
        class="filter-chip featured-chip"
        :class="{ active: showFeaturedOnly }"
        :style="{ borderRadius: 'var(--radius-selector)' }"
      >
        <i class="fa-solid fa-star"></i>
        <span>Favoris</span>
      </button>
      
      <!-- Search Query -->
      <div 
        v-if="searchQuery" 
        class="filter-chip"
        :style="{ borderRadius: 'var(--radius-selector)' }"
      >
        <i class="fa-solid fa-search"></i>
        <span>{{ searchQuery }}</span>
        <button @click="searchQuery = ''" class="remove-chip">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <!-- Category Chips -->
      <div
        v-for="categoryId in selectedCategories"
        :key="categoryId"
        class="filter-chip"
        :style="{ borderRadius: 'var(--radius-selector)' }"
      >
        <i :class="getCategoryIcon(categoryId)"></i>
        <span>{{ getCategoryLabel(categoryId) }}</span>
        <button @click="removeCategory(categoryId)" class="remove-chip">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <button 
        @click="clearAllFilters"
        v-if="selectedCategories.length > 0 || searchQuery || showFeaturedOnly"
        class="clear-all-btn"
        :style="{ borderRadius: 'var(--radius-selector)' }"
      >
        Tout effacer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  showFeaturedOnly: Boolean
})

const emit = defineEmits(['update:search', 'update:categories', 'toggle-featured'])

const searchQuery = ref('')
const selectedCategories = ref([])
const showCategoryDropdown = ref(false)
const categoryDropdownRef = ref(null)

const availableCategories = [
  { id: 'frontend', label: 'Frontend', icon: 'fa-solid fa-window-maximize' },
  { id: 'backend', label: 'Backend', icon: 'fa-solid fa-server' },
  { id: 'fullstack', label: 'Full Stack', icon: 'fa-solid fa-layer-group' },
  { id: 'database', label: 'Bases de données', icon: 'fa-solid fa-database' },
  { id: 'devops', label: 'DevOps', icon: 'fa-solid fa-gears' },
  { id: 'data-science', label: 'Data Science', icon: 'fa-solid fa-chart-line' },
  { id: 'system', label: 'Système', icon: 'fa-solid fa-desktop' },
  { id: 'tools', label: 'Outils', icon: 'fa-solid fa-wrench' },
  { id: 'language', label: 'Langues', icon: 'fa-solid fa-language' }
]

const toggleCategoryDropdown = () => {
  showCategoryDropdown.value = !showCategoryDropdown.value
}

const toggleCategory = (categoryId) => {
  const index = selectedCategories.value.indexOf(categoryId)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categoryId)
  }
}

const removeCategory = (categoryId) => {
  selectedCategories.value = selectedCategories.value.filter(id => id !== categoryId)
}

const getCategoryLabel = (categoryId) => {
  return availableCategories.find(cat => cat.id === categoryId)?.label || categoryId
}

const getCategoryIcon = (categoryId) => {
  return availableCategories.find(cat => cat.id === categoryId)?.icon || 'fa-solid fa-tag'
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  emit('toggle-featured', false)
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (categoryDropdownRef.value && !categoryDropdownRef.value.contains(event.target)) {
    showCategoryDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 
// Emit changes to parent
watch(searchQuery, (newVal) => {
  emit('update:search', newVal)
})

watch(selectedCategories, (newVal) => {
  emit('update:categories', newVal)
}, { deep: true })
</script>

<style scoped>
.skills-filter {
  margin-bottom: 2rem;
}

.filter-input-wrapper {
  margin-bottom: 1rem;
}

.search-wrapper {
  position: relative;
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: var(--color-base-content);
  opacity: 0.5;
  pointer-events: none;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border-radius: var(--radius-field);
  border: 1px solid var(--color-neutral);
  background-color: var(--color-base-200);
  color: var(--color-base-content);
  font-size: 1rem;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--color-primary) 20%, transparent);
}

.category-dropdown-wrapper {
  position: relative;
}

.category-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-primary);
  color: var(--color-primary-content);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.category-toggle-btn:hover {
  background-color: var(--color-secondary);
}

.category-toggle-btn i:last-child {
  transition: transform 0.3s;
}

.category-toggle-btn i.rotate-180 {
  transform: rotate(180deg);
}

.category-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: var(--color-base-200);
  border: 1px solid var(--color-neutral);
  border-radius: var(--radius-selector);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 50;
  min-width: 220px;
  max-height: 400px;
  overflow-y: auto;
}

.category-option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-neutral);
  color: var(--color-base-content);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.category-option:last-child {
  border-bottom: none;
}

.category-option:hover {
  background-color: var(--color-base-300);
}

.category-option.active {
  background-color: color-mix(in oklch, var(--color-primary) 20%, transparent);
  color: var(--color-primary);
}

.category-option i:last-child {
  margin-left: auto;
  color: var(--color-primary);
}

.active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.filter-label {
  font-size: 0.875rem;
  color: var(--color-base-content);
  opacity: 0.7;
  font-weight: 600;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: var(--color-base-300);
  border: 1px solid var(--color-neutral);
  color: var(--color-base-content);
  font-size: 0.875rem;
  transition: all 0.3s;
}

.filter-chip.featured-chip {
  background-color: transparent;
  border: 2px solid var(--color-accent);
  color: var(--color-accent);
  cursor: pointer;
}

.filter-chip.featured-chip.active {
  background-color: var(--color-accent);
  color: white;
}

.filter-chip.featured-chip:hover {
  background-color: var(--color-accent);
  color: white;
}

.remove-chip {
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.remove-chip:hover {
  opacity: 1;
}

.clear-all-btn {
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid var(--color-neutral);
  color: var(--color-base-content);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s;
}

.clear-all-btn:hover {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-primary-content);
}

@media (max-width: 640px) {
  .search-wrapper {
    flex-direction: column;
  }
  
  .category-toggle-btn {
    width: 100%;
    justify-content: center;
  }
  
  .category-dropdown {
    left: 0;
    right: 0;
  }
}
</style>
