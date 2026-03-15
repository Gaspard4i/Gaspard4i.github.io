<template>
  <section id="experience" class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-base-200">
    <div class="container mx-auto">
      <h2 class="section-title">
        <i class="fa-solid fa-briefcase"></i>
        <span class="text-primary">Expériences</span>
      </h2>

      <div class="max-w-4xl mx-auto mt-12">
        <!-- Loading Skeletons -->
        <div v-if="loading" class="space-y-0">
          <ExperienceItemSkeleton v-for="i in 4" :key="i" />
        </div>

        <!-- Timeline -->
        <div v-else class="timeline">
          <div 
            v-for="(exp, index) in experiences" 
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h4 class="text-xl font-bold text-base-content mb-2">{{ exp.title }}</h4>
              <p class="text-base-content/70">{{ exp.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ExperienceItemSkeleton from './ExperienceItemSkeleton.vue'

const loading = ref(true)
const experiences = ref([
  {
    title: '2ème année de BUT Informatique',
    description: 'Poursuite de mes études en 2ème année de BUT Informatique.',
    year: '2024'
  },
  {
    title: 'Animateur en centre aéré',
    description: '2 mois à Billy-Montigny et Dourges.',
    year: '2024'
  },
  {
    title: '1ère année de BUT Informatique',
    description: 'Début de mon parcours en informatique à l\'IUT, avec des bases en programmation, algorithmes et structures de données.',
    year: '2023'
  },
  {
    title: 'Animateur en séjour pour les 1000 et 1 loisirs',
    description: 'Encadrement d\'enfants durant les vacances, organisation d\'activités éducatives et ludiques.',
    year: '2023'
  },
  {
    title: 'Bac Spécialité, Maths et NSI',
    description: 'Bac Spécialité, Maths et NSI',
    year: '2023'
  }
])

onMounted(() => {
  // Simulate loading delay for consistency
  setTimeout(() => {
    loading.value = false
  }, 300)
})
</script>

<style scoped>
.section-title {
  @apply text-4xl font-bold text-center;
}

.timeline {
  @apply relative border-l-2 border-primary pl-8 space-y-8;
}

.timeline-item {
  @apply relative;
}

.timeline-dot {
  position: absolute;
  left: -2.4rem;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  @apply bg-primary border-4 border-base-100;
}

@media (min-width: 640px) {
  .timeline-dot {
    width: 2.5rem;
    height: 2.5rem;
  }
}

.timeline-content {
  @apply bg-base-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-x-2;
  border-radius: var(--radius-box);
  padding: 1.5rem;
}
</style>
