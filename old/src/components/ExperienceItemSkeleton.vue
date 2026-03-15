<template>
  <div class="relative">
    <!-- Timeline Line Skeleton -->
    <div class="absolute left-4 top-0 bottom-0 w-1 bg-base-300"></div>
    
    <!-- Timeline Item -->
    <div class="relative pl-16 pb-12">
      <!-- Dot Skeleton -->
      <SkeletonLoader 
        width="2rem" 
        height="2rem" 
        variant="circle" 
        custom-class="absolute left-0 top-0"
      />
      
      <!-- Content -->
      <div 
        class="bg-base-200 p-6 space-y-3"
        :style="{ borderRadius: 'var(--radius-box)' }"
      >
        <SkeletonLoader width="40%" height="0.875rem" variant="selector" />
        <SkeletonLoader width="70%" height="1.5rem" variant="selector" />
        <SkeletonLoader width="50%" height="1rem" variant="selector" />
        <SkeletonLoader width="100%" height="0.75rem" variant="selector" class="mt-4" />
        <SkeletonLoader width="90%" height="0.75rem" variant="selector" />
        <SkeletonLoader width="80%" height="0.75rem" variant="selector" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from './atoms/SkeletonLoader.vue'
</script>
