<template>
  <div class="min-h-screen bg-base-100">
    <Header />
    
    <main class="pt-20">
      <section class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div class="container mx-auto">
          <!-- Page Header -->
          <div class="text-center mb-12">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Compétences & <span class="text-primary">Outils</span>
            </h1>
            <p class="text-lg opacity-70 max-w-3xl mx-auto">
              Découvrez l'ensemble de mes compétences techniques et outils maîtrisés
            </p>
          </div>

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
            class="grid gap-4 sm:gap-5 mt-8 justify-items-center grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
          >
            <SkillCardSkeleton v-for="i in 25" :key="i" />
          </div>

          <!-- Skills Grid -->
          <div 
            v-else-if="paginatedSkills.length > 0" 
            class="grid gap-4 sm:gap-5 mt-8 justify-items-center grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
          >
            <SkillCard 
              v-for="skill in paginatedSkills" 
              :key="skill.name"
              :skill="skill"
            />
          </div>

          <!-- No results message -->
          <div v-else class="text-center py-12">
            <i class="fa-solid fa-search text-5xl text-base-300 mb-4"></i>
            <p class="text-xl opacity-70">Aucune compétence ne correspond à vos critères</p>
          </div>

          <!-- Pagination & Items Per Page Controls -->
          <div v-if="filteredSkills.length > 25" class="flex justify-center items-center gap-4 mt-8 flex-wrap">
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

            <!-- Pagination buttons -->
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
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import SkillsFilter from '../components/SkillsFilter.vue'
import SkillCard from '../components/SkillCard.vue'
import SkillCardSkeleton from '../components/SkillCardSkeleton.vue'

const skills = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategories = ref([])
const showFeaturedOnly = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(25)
const availablePageSizes = [25, 50, 100]

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
  searchQuery.value = query
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

const filteredSkills = computed(() => {
  let result = skills.value

  if (showFeaturedOnly.value) {
    result = result.filter(skill => skill.featured)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(skill =>
      skill.name.toLowerCase().includes(query)
    )
  }

  if (selectedCategories.value.length > 0) {
    result = result.filter(skill =>
      skill.categories.some(cat => selectedCategories.value.includes(cat))
    )
  }

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
    if (current <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 2) {
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

const changePage = (delta) => {
  const newPage = currentPage.value + delta
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

watch(itemsPerPage, () => {
  currentPage.value = 1
})
</script>
