<template>
  <div 
    class="card"
    :class="[
      hoverEffect ? 'card-hover' : '',
      bordered ? 'card-bordered' : ''
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  hoverEffect: {
    type: Boolean,
    default: true
  },
  bordered: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.card {
  @apply bg-base-200 shadow-lg transition-all duration-300;
  border-radius: var(--radius-box);
  padding: 1.5rem;
}

.card-hover:hover {
  @apply shadow-2xl transform -translate-y-2;
}

.card-bordered {
  @apply border-2 border-base-300 hover:border-primary;
}
</style>
