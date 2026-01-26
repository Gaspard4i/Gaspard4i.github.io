<template>
  <section id="work" class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <SectionHeading icon="fa-solid fa-laptop-code">
        <span>Projets</span>
      </SectionHeading>

      <!-- Loading Skeletons -->
      <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <ProjectCardSkeleton v-for="i in 6" :key="i" />
      </div>

      <!-- Projects Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <ProjectCard 
          v-for="project in projects" 
          :key="project.title"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SectionHeading from './atoms/SectionHeading.vue'
import ProjectCard from './ProjectCard.vue'
import ProjectCardSkeleton from './ProjectCardSkeleton.vue'

const projects = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/data/projects.json')
    projects.value = await response.json()
  } catch (error) {
    console.error('Erreur lors du chargement des projets:', error)
  } finally {
    loading.value = false
  }
})
</script>
