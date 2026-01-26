<template>
  <div 
    class="w-full aspect-square bg-base-200 flex flex-col items-center justify-center gap-4 shadow-lg"
    :style="{ borderRadius: 'var(--radius-box)', padding: '1.25rem' }"
  >
    <SkeletonLoader 
      width="4rem" 
      height="4rem" 
      variant="field" 
      custom-class="mx-auto"
    />
    <SkeletonLoader 
      width="80%" 
      height="1rem" 
      variant="selector"
    />
  </div>
</template>

<script setup>
import SkeletonLoader from './atoms/SkeletonLoader.vue'
</script>
