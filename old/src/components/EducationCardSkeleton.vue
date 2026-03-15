<template>
  <div 
    class="bg-base-200 p-6 shadow-lg"
    :style="{ borderRadius: 'var(--radius-box)' }"
  >
    <div class="flex items-start gap-4">
      <SkeletonLoader width="3rem" height="3rem" variant="circle" class="flex-shrink-0" />
      <div class="flex-1 space-y-3">
        <SkeletonLoader width="70%" height="1.25rem" variant="selector" />
        <SkeletonLoader width="50%" height="0.875rem" variant="selector" />
        <SkeletonLoader width="100%" height="0.75rem" variant="selector" class="mt-4" />
        <SkeletonLoader width="90%" height="0.75rem" variant="selector" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from './atoms/SkeletonLoader.vue'
</script>
