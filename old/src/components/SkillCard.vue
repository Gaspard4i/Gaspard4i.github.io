<template>
  <component
    :is="skill.hasDetailPage ? 'router-link' : 'div'"
    :to="skill.hasDetailPage ? `/skills/${getSlug(skill.name)}` : undefined"
    class="w-full aspect-square bg-base-200 flex flex-col items-center justify-center gap-4 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl group"
    :class="skill.hasDetailPage ? 'cursor-pointer' : ''"
    :style="{ borderRadius: 'var(--radius-box)', padding: '1.25rem' }"
  >
    <div 
      class="bg-base-300 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
      :style="{ borderRadius: 'var(--radius-field)', padding: '0.875rem' }"
    >
      <img 
        :src="skill.icon" 
        :alt="skill.name" 
        class="w-14 h-14 sm:w-16 sm:h-16"
      />
    </div>
    <p 
      class="text-sm sm:text-base text-center font-medium leading-tight"
      :style="{ color: 'color-mix(in oklch, var(--color-base-content) 80%, transparent)' }"
    >
      {{ skill.name }}
    </p>
    <i 
      v-if="skill.hasDetailPage"
      class="fa-solid fa-arrow-right text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-3 right-3"
    ></i>
  </component>
</template>

<script setup>
defineProps({
  skill: {
    type: Object,
    required: true
  }
})

const getSlug = (name) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
</script>

