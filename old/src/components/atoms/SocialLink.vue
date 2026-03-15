<template>
  <a 
    :href="href"
    :target="target"
    :aria-label="ariaLabel"
    class="social-link"
    :class="variant"
  >
    <i :class="icon"></i>
  </a>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'default'
  },
  target: {
    type: String,
    default: '_blank'
  },
  ariaLabel: String
})
</script>

<style scoped>
.social-link {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  @apply flex items-center justify-center text-primary-content text-xl transition-all duration-300 transform hover:scale-110 shadow-lg;
}

@media (min-width: 640px) {
  .social-link {
    width: 3.5rem;
    height: 3.5rem;
  }
}

.default {
  @apply bg-primary hover:brightness-110;
}

.linkedin {
  @apply bg-blue-600 hover:bg-blue-700;
}

.github {
  @apply bg-gray-800 hover:bg-gray-900;
}

.gitlab {
  @apply bg-orange-600 hover:bg-orange-700;
}
</style>
