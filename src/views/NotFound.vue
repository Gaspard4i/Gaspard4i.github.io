<template>
  <div class="min-h-screen bg-base-100 flex flex-col items-center justify-center px-4">
    <!-- 404 Header -->
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary mb-4">404</h1>
      <h2 class="text-3xl font-bold mb-4">Oups ! Page introuvable</h2>
      <p class="text-xl opacity-70 mb-8">
        Cette page n'existe pas...
      </p>
      
      <!-- Finn GIF -->
      <div class="mb-8 flex justify-center">
        <img 
          src="@/assets/images/finnstay.gif" 
          alt="Finn" 
          class="w-32 h-32 object-contain"
        />
      </div>

      <router-link
        to="/"
        class="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-content font-semibold transition-all duration-300 hover:bg-secondary hover:-translate-y-0.5 shadow-lg"
        :style="{ borderRadius: 'var(--radius-selector)' }"
      >
        <i class="fa-solid fa-home"></i>
        Retour à l'accueil
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

