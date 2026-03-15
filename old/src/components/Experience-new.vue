<template>
  <section id="experience" class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-dark-light">
    <div class="container mx-auto">
      <h2 class="section-title">
        <i class="fa-solid fa-briefcase"></i>
        <span class="text-primary">Expériences</span>
      </h2>

      <!-- Timeline Style Selector -->
      <div class="flex justify-center space-x-4 mt-8 mb-12 flex-wrap gap-4">
        <button 
          v-for="style in timelineStyles" 
          :key="style.id"
          @click="currentStyle = style.id"
          class="font-semibold transition-all duration-300"
          :class="currentStyle === style.id 
            ? 'bg-primary text-primary-content shadow-lg' 
            : 'bg-dark text-primary-content-400 hover:bg-dark-light hover:text-primary-content'"
          :style="{
            borderRadius: 'var(--radius-selector)',
            padding: '0.5rem 1.5rem'
          }"
        >
          {{ style.name }}
        </button>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- Style 1: Classic Timeline (Vertical with dots) -->
        <div v-if="currentStyle === 'classic'" class="timeline-classic">
          <div 
            v-for="(exp, index) in experiences" 
            :key="index"
            class="timeline-item-classic"
          >
            <div class="timeline-dot-classic"></div>
            <div class="timeline-content-classic">
              <span class="timeline-year">{{ exp.year }}</span>
              <h4 class="text-xl font-bold text-primary-content mb-2">{{ exp.title }}</h4>
              <p class="text-primary-content-300">{{ exp.description }}</p>
            </div>
          </div>
        </div>

        <!-- Style 2: Cards Timeline (Cards with hover effects) -->
        <div v-if="currentStyle === 'cards'" class="space-y-6">
          <div 
            v-for="(exp, index) in experiences" 
            :key="index"
            class="timeline-card group"
          >
            <div class="flex items-start space-x-4">
              <div class="timeline-icon">
                <i class="fa-solid fa-calendar-check"></i>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-xl font-bold text-primary-content group-hover:text-primary transition-colors">
                    {{ exp.title }}
                  </h4>
                  <span class="timeline-badge">{{ exp.year }}</span>
                </div>
                <p class="text-primary-content-300">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Style 3: Alternating Timeline (Zigzag) -->
        <div v-if="currentStyle === 'alternating'" class="timeline-alternating">
          <div 
            v-for="(exp, index) in experiences" 
            :key="index"
            class="timeline-item-alt"
            :class="index % 2 === 0 ? 'timeline-left' : 'timeline-right'"
          >
            <div class="timeline-content-alt">
              <span class="timeline-year-alt">{{ exp.year }}</span>
              <h4 class="text-xl font-bold text-primary-content mb-2">{{ exp.title }}</h4>
              <p class="text-primary-content-300">{{ exp.description }}</p>
            </div>
            <div class="timeline-dot-alt"></div>
          </div>
        </div>

        <!-- Style 4: Horizontal Timeline (Desktop) -->
        <div v-if="currentStyle === 'horizontal'" class="timeline-horizontal">
          <div class="timeline-line-horizontal"></div>
          <div class="timeline-items-horizontal">
            <div 
              v-for="(exp, index) in experiences" 
              :key="index"
              class="timeline-item-horizontal"
            >
              <div class="timeline-dot-horizontal"></div>
              <div class="timeline-content-horizontal">
                <span class="timeline-year-horizontal">{{ exp.year }}</span>
                <h4 class="font-bold text-primary-content text-sm mb-1">{{ exp.title }}</h4>
                <p class="text-primary-content-400 text-xs">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Style 5: Minimal List -->
        <div v-if="currentStyle === 'minimal'" class="space-y-4">
          <div 
            v-for="(exp, index) in experiences" 
            :key="index"
            class="timeline-minimal group"
          >
            <div class="flex items-center space-x-4">
              <span class="timeline-year-minimal">{{ exp.year }}</span>
              <div class="flex-1 border-l-4 border-primary pl-6 py-2">
                <h4 class="text-lg font-bold text-primary-content group-hover:text-primary transition-colors">
                  {{ exp.title }}
                </h4>
                <p class="text-primary-content-300 text-sm">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const currentStyle = ref('classic')

const timelineStyles = [
  { id: 'classic', name: '📍 Classique' },
  { id: 'cards', name: '🎴 Cartes' },
  { id: 'alternating', name: '⚡ Zigzag' },
  { id: 'horizontal', name: '➡️ Horizontal' },
  { id: 'minimal', name: '✨ Minimal' }
]

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
</script>

<style scoped>
.section-title {
  @apply text-4xl font-bold text-center;
}

/* Classic Timeline */
.timeline-classic {
  @apply relative border-l-2 border-primary pl-8 space-y-8;
}

.timeline-item-classic {
  @apply relative;
}

.timeline-dot-classic {
  position: absolute;
  left: -2.4rem;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  @apply bg-primary border-4 border-dark-light;
}

@media (min-width: 640px) {
  .timeline-dot-classic {
    width: 2.5rem;
    height: 2.5rem;
  }
}

.timeline-content-classic {
  border-radius: var(--radius-box);
  padding: 1.5rem;
  @apply bg-dark shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-x-2;
}

.timeline-year {
  display: inline-block;
  border-radius: var(--radius-selector);
  padding: 0.25rem 0.75rem;
  @apply bg-primary text-primary-content text-sm font-bold mb-2;
}

/* Cards Timeline */
.timeline-card {
  border-radius: var(--radius-box);
  padding: 1.5rem;
  @apply bg-dark shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-primary;
}

.timeline-icon {
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-selector);
  @apply bg-primary flex items-center justify-center text-primary-content text-xl flex-shrink-0;
}

@media (min-width: 640px) {
  .timeline-icon {
    width: 3.5rem;
    height: 3.5rem;
  }
}

.timeline-badge {
  border-radius: var(--radius-selector);
  padding: 0.25rem 1rem;
  @apply bg-secondary text-primary-content text-sm font-bold;
}

/* Alternating Timeline */
.timeline-alternating {
  @apply relative;
}

.timeline-alternating::before {
  content: '';
  @apply absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary transform -translate-x-1/2;
}

.timeline-item-alt {
  @apply relative mb-12 flex items-center;
}

.timeline-left {
  @apply justify-end pr-8;
}

.timeline-right {
  @apply justify-start pl-8;
}

.timeline-left .timeline-content-alt {
  @apply mr-8 text-right;
}

.timeline-right .timeline-content-alt {
  @apply ml-8 text-left;
}

.timeline-content-alt {
  @apply bg-dark p-6 rounded-lg shadow-lg max-w-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105;
}

.timeline-dot-alt {
  @apply absolute left-1/2 w-6 h-6 bg-primary rounded-full border-4 border-dark-light transform -translate-x-1/2;
}

.timeline-year-alt {
  display: inline-block;
  border-radius: var(--radius-selector);
  padding: 0.25rem 0.75rem;
  @apply bg-gradient-to-r from-primary to-secondary text-primary-content text-sm font-bold mb-2;
}

/* Horizontal Timeline */
.timeline-horizontal {
  @apply relative overflow-x-auto pb-8;
}

.timeline-line-horizontal {
  @apply absolute top-8 left-0 right-0 h-0.5 bg-primary;
}

.timeline-items-horizontal {
  @apply flex space-x-8 min-w-max;
}

.timeline-item-horizontal {
  @apply relative flex flex-col items-center min-w-[200px];
}

.timeline-dot-horizontal {
  @apply w-6 h-6 bg-primary rounded-full border-4 border-dark-light mb-4;
}

.timeline-content-horizontal {
  border-radius: var(--radius-box);
  padding: 1rem;
  @apply bg-dark shadow-lg text-center hover:shadow-2xl transition-all duration-300;
}

.timeline-year-horizontal {
  display: inline-block;
  border-radius: var(--radius-selector);
  padding: 0.25rem 0.5rem;
  @apply bg-secondary text-primary-content text-xs font-bold mb-2;
}

/* Minimal Timeline */
.timeline-minimal {
  @apply transition-all duration-300 hover:bg-dark/50 rounded-lg p-4;
}

.timeline-year-minimal {
  @apply text-4xl font-bold text-primary w-20 text-center flex-shrink-0;
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-alternating::before {
    @apply left-4;
  }
  
  .timeline-item-alt {
    @apply justify-start pl-12;
  }
  
  .timeline-left,
  .timeline-right {
    @apply justify-start pl-12 pr-0;
  }
  
  .timeline-left .timeline-content-alt,
  .timeline-right .timeline-content-alt {
    @apply m-0 text-left;
  }
  
  .timeline-dot-alt {
    @apply left-4 transform-none;
  }
}
</style>
