<template>
  <component 
    :is="tag"
    :class="buttonClass"
    :disabled="disabled"
    :href="href"
    :target="target"
    @click="handleClick"
  >
    <i v-if="iconLeft" :class="iconLeft" class="mr-2"></i>
    <slot></slot>
    <i v-if="iconRight" :class="iconRight" class="ml-2"></i>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tag: {
    type: String,
    default: 'button'
  },
  href: String,
  target: String,
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  iconLeft: String,
  iconRight: String,
  fullWidth: Boolean
})

const emit = defineEmits(['click'])

const buttonClass = computed(() => {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed'
  const radius = 'rounded-[var(--radius-selector)]'
  
  const variants = {
    primary: 'bg-primary hover:brightness-110 text-primary-content shadow-lg hover:scale-105',
    secondary: 'bg-secondary hover:brightness-110 text-secondary-content shadow-lg hover:scale-105',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-content',
    ghost: 'text-primary hover:bg-primary hover:bg-opacity-10'
  }
  
  const sizes = {
    sm: 'p-2 sm:p-3 text-sm',
    md: 'p-3 sm:p-4 text-base',
    lg: 'p-4 sm:p-5 text-lg'
  }
  
  const width = props.fullWidth ? 'w-full' : ''
  
  return `${base} ${radius} ${variants[props.variant]} ${sizes[props.size]} ${width}`
})

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>
