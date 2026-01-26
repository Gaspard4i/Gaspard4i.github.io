<template>
  <h2 class="section-heading">
    <i v-if="icon" :class="icon" class="mr-3"></i>
    <slot></slot>
  </h2>
</template>

<script setup>
defineProps({
  icon: String
})
</script>

<style scoped>
.section-heading {
  @apply text-4xl font-bold text-center mb-12;
}

.section-heading :deep(span) {
  @apply text-primary;
}
</style>
