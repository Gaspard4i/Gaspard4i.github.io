<template>
  <section id="education" class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-base-200">
    <div class="container mx-auto">
      <SectionHeading icon="fa-solid fa-graduation-cap">
        <span>Parcours</span>
      </SectionHeading>

      <!-- Loading Skeletons -->
      <div v-if="loading" class="grid md:grid-cols-2 gap-8 mt-12">
        <EducationCardSkeleton v-for="i in 2" :key="i" />
      </div>

      <!-- Education Cards -->
      <div v-else class="grid md:grid-cols-2 gap-8 mt-12">
        <!-- IUT Lille -->
        <a 
          href="https://iut.univ-lille.fr/" 
          target="_blank"
          class="education-card group"
        >
          <div class="overflow-hidden rounded-t-xl">
            <img 
              src="https://www.iuta-geii.univ-lille.fr/jpo/images/animation/9.jpg" 
              alt="IUT de Lille" 
              class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div class="p-6 space-y-3">
            <h3 class="text-2xl font-bold text-primary-content group-hover:text-primary transition-colors">
              2ème année de BUT Informatique
            </h3>
            <p class="text-primary-content-300 font-semibold">IUT de Lille</p>
            <p class="text-sm text-primary-content-400 flex items-center space-x-2">
              <i class="fa-solid fa-calendar"></i>
              <span>Obtention du Bachelor prévu en 2026</span>
            </p>
          </div>
        </a>

        <!-- Lycée Saint Paul -->
        <a 
          href="https://lyceestpaul-lens.fr/" 
          target="_blank"
          class="education-card group"
        >
          <div class="overflow-hidden rounded-t-xl bg-blue-900 flex items-center justify-center h-48">
            <img 
              src="https://lyceestpaul-lens.fr/wp-content/themes/lycee_stpaullens/static/media/logo.svg" 
              alt="Lycée Saint Paul Lens" 
              class="w-48 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div class="p-6 space-y-3">
            <h3 class="text-2xl font-bold text-primary-content group-hover:text-primary transition-colors">
              Spécialité Mathématiques NSI
            </h3>
            <p class="text-primary-content-300 font-semibold">Lycée Saint Paul Lens</p>
            <p class="text-sm text-primary-content-400">Option maths experte et first</p>
            <p class="text-sm text-primary-content-400 flex items-center space-x-2">
              <i class="fa-solid fa-calendar"></i>
              <span>Bachelor Obtenu en 2023</span>
            </p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SectionHeading from './atoms/SectionHeading.vue'
import EducationCardSkeleton from './EducationCardSkeleton.vue'

const loading = ref(true)

onMounted(() => {
  // Simulate loading delay for consistency
  setTimeout(() => {
    loading.value = false
  }, 300)
})
</script>

<style scoped>

.education-card {
  @apply bg-base-300 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-base-200 hover:border-primary;
  border-radius: var(--radius-box);
}
</style>
