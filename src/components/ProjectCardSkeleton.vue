<template>
  <div 
    class="bg-base-200 p-6 shadow-lg"
    :style="{ borderRadius: 'var(--radius-box)' }"
  >
    <div class="flex items-center gap-4 mb-4">
      <SkeletonLoader width="4rem" height="4rem" variant="circle" />
      <div class="flex-1 space-y-2">
        <SkeletonLoader width="60%" height="1.5rem" variant="selector" />
        <SkeletonLoader width="40%" height="1rem" variant="selector" />
      </div>
    </div>
    <SkeletonLoader width="100%" height="0.75rem" variant="selector" class="mb-2" />
    <SkeletonLoader width="90%" height="0.75rem" variant="selector" class="mb-2" />
    <SkeletonLoader width="80%" height="0.75rem" variant="selector" />
  </div>
</template>

<script setup>
import SkeletonLoader from './atoms/SkeletonLoader.vue'
</script>
