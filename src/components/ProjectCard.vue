<template>
  <div class="project-card group">
    <div class="relative overflow-hidden rounded-t-xl">
      <img 
        :src="project.image" 
        :alt="project.title" 
        class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <!-- Overlay on hover -->
      <div class="project-overlay">
        <h3 class="text-xl font-bold mb-4">
          {{ project.links.length > 0 ? 'Lien' + (project.links.length > 1 ? 's' : '') + ' du projet' : 'Pas de source pour ce projet' }}
        </h3>
        <div class="flex space-x-4">
          <a 
            v-for="(link, index) in project.links" 
            :key="index"
            :href="link.url" 
            target="_blank"
            class="project-icon"
            :aria-label="link.type"
          >
            <i :class="link.icon"></i>
          </a>
          <i v-if="project.links.length === 0" class="fa-solid fa-exclamation-circle text-3xl text-yellow-500"></i>
        </div>
      </div>
    </div>

    <div class="p-6 space-y-2">
      <h4 class="text-xl font-bold text-base-content group-hover:text-primary transition-colors">
        {{ project.title }} / {{ project.year }}
      </h4>
      <p class="text-base-content/60 text-sm">{{ project.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.project-card {
  @apply bg-base-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-base-300 hover:border-primary;
  border-radius: var(--radius-box);
}

.project-overlay {
  @apply absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300;
  background-color: rgba(10, 14, 39, 0.95);
}

.project-icon {
  @apply w-12 h-12 bg-primary hover:bg-secondary rounded-full flex items-center justify-center text-primary-content text-xl transition-all duration-300 transform hover:scale-110;
}
</style>
