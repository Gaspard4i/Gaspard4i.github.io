<template>
  <div class="min-h-screen bg-base-100">
    <Header />
    
    <main class="pt-20">
      <!-- Loading State -->
      <div v-if="loading" class="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="flex justify-center items-center">
          <i class="fa-solid fa-spinner fa-spin text-4xl text-primary"></i>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <i class="fa-solid fa-exclamation-triangle text-5xl text-error mb-4"></i>
          <h1 class="text-3xl font-bold mb-4">Compétence non trouvée</h1>
          <p class="text-lg opacity-70 mb-8">{{ error }}</p>
          <router-link
            to="/"
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-content font-semibold transition-all duration-300 hover:bg-secondary hover:-translate-y-0.5"
            :style="{ borderRadius: 'var(--radius-selector)' }"
          >
            <i class="fa-solid fa-arrow-left"></i>
            Retour à l'accueil
          </router-link>
        </div>
      </div>

      <!-- Skill Detail Content -->
      <div v-else-if="skillDetail" class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Back Button -->
        <router-link
          to="#skills"
          class="inline-flex items-center gap-2 mb-8 text-primary hover:text-secondary transition-colors duration-300"
        >
          <i class="fa-solid fa-arrow-left"></i>
          <span class="font-semibold">Retour aux compétences</span>
        </router-link>

        <!-- Header Section -->
        <div class="grid lg:grid-cols-3 gap-8 mb-12">
          <!-- Skill Card -->
          <div class="lg:col-span-1">
            <div 
              class="bg-base-200 p-8 shadow-xl sticky top-24"
              :style="{ borderRadius: 'var(--radius-box)' }"
            >
              <div 
                class="bg-base-300 w-24 h-24 mx-auto flex items-center justify-center mb-6"
                :style="{ borderRadius: 'var(--radius-field)' }"
              >
                <img 
                  :src="skillDetail.icon" 
                  :alt="skillDetail.name" 
                  class="w-16 h-16"
                />
              </div>
              <h1 class="text-3xl font-bold text-center mb-4">{{ skillDetail.name }}</h1>
              <p class="text-center opacity-80 mb-6">{{ skillDetail.description }}</p>
              
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="opacity-70">Expérience :</span>
                  <span class="font-semibold">{{ skillDetail.yearsOfExperience }} ans</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="opacity-70">Niveau :</span>
                  <span 
                    class="px-3 py-1 font-semibold text-sm"
                    :class="getProficiencyColor(skillDetail.proficiencyLevel)"
                    :style="{ borderRadius: 'var(--radius-selector)' }"
                  >
                    {{ skillDetail.proficiencyLevel }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Learning Path -->
            <section v-if="skillDetail.learningPath && skillDetail.learningPath.length > 0">
              <h2 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <i class="fa-solid fa-graduation-cap text-primary"></i>
                Parcours d'apprentissage
              </h2>
              <div class="space-y-4">
                <div 
                  v-for="(path, index) in skillDetail.learningPath" 
                  :key="index"
                  class="bg-base-200 p-6"
                  :style="{ borderRadius: 'var(--radius-box)' }"
                >
                  <div class="flex justify-between items-start mb-3">
                    <h3 class="text-xl font-bold">{{ path.period }}</h3>
                    <span 
                      class="px-3 py-1 bg-primary text-primary-content text-sm font-semibold"
                      :style="{ borderRadius: 'var(--radius-selector)' }"
                    >
                      {{ path.duration }}
                    </span>
                  </div>
                  <p class="opacity-80 mb-4">{{ path.description }}</p>
                  <ul class="space-y-2">
                    <li 
                      v-for="(topic, i) in path.topics" 
                      :key="i"
                      class="flex items-start gap-2"
                    >
                      <i class="fa-solid fa-check text-primary mt-1"></i>
                      <span>{{ topic }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- What I Like / Dislike
            <section>
              <div class="grid md:grid-cols-2 gap-6">
                
                <div 
                  class="bg-base-200 p-6"
                  :style="{ borderRadius: 'var(--radius-box)' }"
                >
                  <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-heart text-success"></i>
                    Ce que j'aime
                  </h3>
                  <ul class="space-y-2">
                    <li 
                      v-for="(item, index) in skillDetail.whatILike" 
                      :key="index"
                      class="flex items-start gap-2"
                    >
                      <i class="fa-solid fa-plus text-success mt-1"></i>
                      <span class="opacity-80">{{ item }}</span>
                    </li>
                  </ul>
                </div>

                <div 
                  class="bg-base-200 p-6"
                  :style="{ borderRadius: 'var(--radius-box)' }"
                >
                  <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-heart-crack text-warning"></i>
                    Points d'amélioration
                  </h3>
                  <ul class="space-y-2">
                    <li 
                      v-for="(item, index) in skillDetail.whatIDislike" 
                      :key="index"
                      class="flex items-start gap-2"
                    >
                      <i class="fa-solid fa-minus text-warning mt-1"></i>
                      <span class="opacity-80">{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section> -->

            <!-- Projects -->
            <section v-if="skillDetail.usedInProjects && skillDetail.usedInProjects.length > 0">
              <h2 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <i class="fa-solid fa-folder-open text-primary"></i>
                Projets réalisés
              </h2>
              <div class="space-y-4">
                <div 
                  v-for="(project, index) in skillDetail.usedInProjects" 
                  :key="index"
                  class="bg-base-200 p-6"
                  :style="{ borderRadius: 'var(--radius-box)' }"
                >
                  <div class="flex justify-between items-start mb-3">
                    <h3 class="text-xl font-bold">
                      <a 
                        v-if="project.link" 
                        :href="project.link" 
                        target="_blank"
                        class="hover:text-primary transition-colors duration-300 inline-flex items-center gap-2"
                      >
                        {{ project.name }}
                        <i class="fa-solid fa-arrow-up-right-from-square text-sm opacity-60"></i>
                      </a>
                      <span v-else>{{ project.name }}</span>
                    </h3>
                    <span 
                      v-if="project.duration"
                      class="px-3 py-1 bg-base-300 text-sm font-semibold"
                      :style="{ borderRadius: 'var(--radius-selector)' }"
                    >
                      {{ project.duration }}
                    </span>
                  </div>
                  <p class="opacity-80 mb-4">{{ project.description }}</p>
                  
                  <div v-if="project.context" class="mb-4">
                    <span 
                      class="px-3 py-1 bg-primary text-primary-content text-sm font-semibold"
                      :style="{ borderRadius: 'var(--radius-selector)' }"
                    >
                      {{ project.context }}
                    </span>
                  </div>

                  <div v-if="project.highlights" class="mb-4">
                    <ul class="space-y-2">
                      <li 
                        v-for="(highlight, i) in project.highlights" 
                        :key="i"
                        class="flex items-start gap-2"
                      >
                        <i class="fa-solid fa-star text-primary mt-1"></i>
                        <span class="opacity-80">{{ highlight }}</span>
                      </li>
                    </ul>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="(tech, i) in project.technologies" 
                      :key="i"
                      class="px-3 py-1 bg-base-300 text-xs font-semibold"
                      :style="{ borderRadius: 'var(--radius-selector)' }"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Key Features -->
            <section v-if="skillDetail.keyFeatures && skillDetail.keyFeatures.length > 0">
              <h2 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <i class="fa-solid fa-star text-primary"></i>
                Compétences clés
              </h2>
              <div class="grid md:grid-cols-2 gap-4">
                <div 
                  v-for="(feature, index) in skillDetail.keyFeatures" 
                  :key="index"
                  class="bg-base-200 p-6"
                  :style="{ borderRadius: 'var(--radius-box)' }"
                >
                  <h3 class="text-lg font-bold mb-2">{{ feature.title }}</h3>
                  <p class="opacity-80">{{ feature.description }}</p>
                </div>
              </div>
            </section>

            <!-- Related Skills -->
            <section v-if="skillDetail.relatedSkills && skillDetail.relatedSkills.length > 0">
              <h2 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <i class="fa-solid fa-link text-primary"></i>
                Technologies associées
              </h2>
              <div class="flex flex-wrap gap-3">
                <router-link
                  v-for="(skill, index) in skillDetail.relatedSkills" 
                  :key="index"
                  v-if="hasDetailPage(skill)"
                  :to="`/skills/${getSkillSlug(skill)}`"
                  class="px-4 py-2 bg-base-200 font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-content cursor-pointer"
                  :style="{ borderRadius: 'var(--radius-selector)' }"
                >
                  {{ skill }}
                </router-link>
                <span 
                  v-for="(skill, index) in skillDetail.relatedSkills" 
                  :key="'non-link-' + index"
                  v-if="!hasDetailPage(skill)"
                  class="px-4 py-2 bg-base-200 font-semibold"
                  :style="{ borderRadius: 'var(--radius-selector)' }"
                >
                  {{ skill }}
                </span>
              </div>
            </section>

            <!-- Recommended Next Skills -->
            <section v-if="skillDetail.recommendedNextSkills && skillDetail.recommendedNextSkills.length > 0">
              <h2 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <i class="fa-solid fa-arrow-trend-up text-primary"></i>
                Prochaines étapes recommandées
              </h2>
              <div class="space-y-3">
                <div 
                  v-for="(nextSkill, index) in skillDetail.recommendedNextSkills" 
                  :key="index"
                  class="bg-base-200 p-4 flex items-center justify-between"
                  :style="{ borderRadius: 'var(--radius-box)' }"
                >
                  <div>
                    <h3 class="font-bold">{{ nextSkill.name }}</h3>
                    <p class="text-sm opacity-70">{{ nextSkill.reason }}</p>
                  </div>
                  <i class="fa-solid fa-chevron-right opacity-50"></i>
                </div>
              </div>
            </section>

            <!-- Resources -->
            <section v-if="skillDetail.resources && skillDetail.resources.length > 0">
              <h2 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <i class="fa-solid fa-book text-primary"></i>
                Ressources utiles
              </h2>
              <div class="space-y-3">
                <a 
                  v-for="(resource, index) in skillDetail.resources" 
                  :key="index"
                  :href="resource.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="bg-base-200 p-4 flex items-center justify-between transition-all duration-300 hover:bg-primary hover:text-primary-content group"
                  :style="{ borderRadius: 'var(--radius-box)' }"
                >
                  <div class="flex items-center gap-3">
                    <i 
                      class="fa-solid text-xl"
                      :class="resource.type === 'docs' ? 'fa-file-lines' : 'fa-graduation-cap'"
                    ></i>
                    <span class="font-semibold">{{ resource.title }}</span>
                  </div>
                  <i class="fa-solid fa-external-link opacity-50 group-hover:opacity-100"></i>
                </a>
              </div>
            </section>

            <!-- Personal Notes -->
            <section v-if="skillDetail.personalNotes">
              <h2 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <i class="fa-solid fa-comment text-primary"></i>
                Note personnelle
              </h2>
              <div 
                class="bg-base-200 p-6 border-l-4 border-primary"
                :style="{ borderRadius: 'var(--radius-box)' }"
              >
                <p class="opacity-90 italic">{{ skillDetail.personalNotes }}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const route = useRoute()
const router = useRouter()

const skillDetail = ref(null)
const loading = ref(true)
const error = ref(null)
const allSkills = ref([])

const getProficiencyColor = (level) => {
  const colors = {
    'débutant': 'bg-info text-info-content',
    'intermédiaire': 'bg-warning text-warning-content',
    'avancé': 'bg-success text-success-content',
    'expert': 'bg-secondary text-secondary-content'
  }
  return colors[level] || 'bg-base-300'
}

const getSkillSlug = (skillName) => {
  return skillName.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const hasDetailPage = (skillName) => {
  const skill = allSkills.value.find(s => s.name === skillName)
  return skill?.hasDetailPage || false
}

onMounted(async () => {
  try {
    // Load all skills first
    const skillsResponse = await fetch('/data/skills.json')
    allSkills.value = await skillsResponse.json()
    
    // Then load skill detail
    const slug = route.params.slug
    const response = await fetch(`/data/skill-details/${slug}.json`)
    
    if (!response.ok) {
      throw new Error(`Cette compétence n'a pas encore de page détaillée.`)
    }
    
    skillDetail.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
