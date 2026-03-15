<template>
  <router-view />
</template>

<script setup>
import { useTheme } from './composables/useTheme'

// Initialize theme system
useTheme()
</script>
