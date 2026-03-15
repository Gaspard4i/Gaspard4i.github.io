<template>
  <div 
    class="animate-pulse bg-base-300"
    :class="customClass"
    :style="{ 
      borderRadius: variant === 'box' ? 'var(--radius-box)' : variant === 'field' ? 'var(--radius-field)' : variant === 'selector' ? 'var(--radius-selector)' : '0',
      width: width,
      height: height
    }"
  ></div>
</template>

<script setup>
defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '1rem'
  },
  variant: {
    type: String,
    default: 'box',
    validator: (value) => ['box', 'field', 'selector', 'circle', 'none'].includes(value)
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>
