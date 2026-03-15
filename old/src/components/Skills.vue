<template>
  <section id="skills" class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <SectionHeading icon="fa-solid fa-laptop-code">
        Compétences & <span>Outils</span>
      </SectionHeading>

      <!-- Filter Component -->
      <SkillsFilter 
        :show-featured-only="showFeaturedOnly"
        @update:search="handleSearchUpdate"
        @update:categories="handleCategoriesUpdate"
        @toggle-featured="toggleFeatured"
        class="mt-8"
      />

      <!-- Loading Skeletons -->
      <div 
        v-if="loading" 
        class="grid gap-4 sm:gap-5 mt-8 justify-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      >
        <SkillCardSkeleton v-for="i in 10" :key="i" />
      </div>

      <!-- Skills Grid -->
      <div 
        v-else-if="paginatedSkills.length > 0" 
        class="grid gap-4 sm:gap-5 mt-8 justify-items-center"
        :class="gridColsClass"
      >
        <SkillCard 
          v-for="skill in paginatedSkills" 
          :key="skill.name"
          :skill="skill"
        />
      </div>

      <!-- Pagination & Items Per Page Controls -->
      <div v-if="filteredSkills.length > 5" class="flex justify-center items-center gap-4 mt-8 flex-wrap">
        <!-- Items per page selector -->
        <div class="flex items-center gap-2">
          <label for="items-per-page" class="text-sm font-semibold text-base-content">Afficher :</label>
          <select
            id="items-per-page"
            v-model.number="itemsPerPage"
            class="px-3 py-2 bg-base-200 text-base-content border border-neutral font-semibold transition-all duration-300 hover:border-primary focus:outline-none focus:border-primary"
            :style="{ borderRadius: 'var(--radius-selector)' }"
          >
            <option v-for="option in availablePageSizes" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <!-- Pagination buttons (only show if needed) -->
        <template v-if="totalPages > 1">
          <button
            @click="changePage(-1)"
            :disabled="currentPage === 1"
            class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-content font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary hover:-translate-y-0.5"
            :style="{ borderRadius: 'var(--radius-selector)' }"
          >
            <i class="fa-solid fa-chevron-left"></i>
            Précédent
          </button>

          <div class="flex items-center gap-2">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="typeof page === 'number' ? currentPage = page : null"
              :disabled="typeof page !== 'number'"
              class="w-10 h-10 flex items-center justify-center bg-base-200 text-base-content border border-neutral font-semibold transition-all duration-300"
              :class="currentPage === page ? 'bg-primary text-primary-content border-primary shadow-lg' : 'hover:bg-primary hover:text-primary-content hover:border-primary'"
              :style="{ borderRadius: 'var(--radius-selector)', cursor: typeof page !== 'number' ? 'default' : 'pointer' }"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="changePage(1)"
            :disabled="currentPage === totalPages"
            class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-content font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary hover:-translate-y-0.5"
            :style="{ borderRadius: 'var(--radius-selector)' }"
          >
            Suivant
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </template>
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-12">
        <i class="fa-solid fa-search text-5xl opacity-20 mb-4"></i>
        <p class="text-xl opacity-70">Aucune compétence trouvée</p>
        <p class="text-sm opacity-50 mt-2">Essayez d'ajuster vos filtres</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import SectionHeading from './atoms/SectionHeading.vue'
import SkillCard from './SkillCard.vue'
import SkillCardSkeleton from './SkillCardSkeleton.vue'
import SkillsFilter from './SkillsFilter.vue'

const skills = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategories = ref([])
const showFeaturedOnly = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(5)

// Watch for changes in itemsPerPage to reset to page 1
watch(itemsPerPage, () => {
  currentPage.value = 1
})

onMounted(async () => {
  try {
    const response = await fetch('/data/skills.json')
    skills.value = await response.json()
  } catch (error) {
    console.error('Erreur lors du chargement des compétences:', error)
  } finally {
    loading.value = false
  }
})

const handleSearchUpdate = (query) => {
  searchQuery.value = query.toLowerCase()
  currentPage.value = 1
}

const handleCategoriesUpdate = (categories) => {
  selectedCategories.value = categories
  currentPage.value = 1
}

const toggleFeatured = () => {
  showFeaturedOnly.value = !showFeaturedOnly.value
  currentPage.value = 1
}

const changePage = (direction) => {
  const newPage = currentPage.value + direction
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage
  }
}

// Available page sizes based on filtered results
const availablePageSizes = computed(() => {
  const sizes = [5, 10, 25, 50, 100]
  const totalSkills = filteredSkills.value.length
  return sizes.filter(size => size <= totalSkills)
})

// Grid columns class based on items per page and screen size
const gridColsClass = computed(() => {
  const count = paginatedSkills.value.length
  
  if (itemsPerPage.value <= 5) {
    // Small grid: 2 cols on mobile, 3 on tablet, 5 on desktop
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
  } else if (itemsPerPage.value <= 10) {
    // Medium grid: 2 cols on mobile, 4 on tablet, 5 on desktop
    return 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
  } else {
    // Large grid: 2 cols on mobile, 4 on tablet, 6 on desktop
    return 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6'
  }
})

const filteredSkills = computed(() => {
  let result = [...skills.value]

  // 1. Filter by featured
  if (showFeaturedOnly.value) {
    result = result.filter(skill => skill.featured)
  }

  // 2. Filter by search query
  if (searchQuery.value) {
    result = result.filter(skill => 
      skill.name.toLowerCase().includes(searchQuery.value)
    )
  }

  // 3. Filter by categories (UNION - OR logic)
  if (selectedCategories.value.length > 0) {
    result = result.filter(skill =>
      skill.categories.some(cat => selectedCategories.value.includes(cat))
    )
  }

  // 4. Sort: Featured first, then alphabetical
  result.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.name.localeCompare(b.name)
  })

  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredSkills.value.length / itemsPerPage.value)
})

const paginatedSkills = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredSkills.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})
</script>
