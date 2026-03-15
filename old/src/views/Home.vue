<template>
  <div class="min-h-screen bg-base-100">
    <Header />
    <main>
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Experience />
      <Contact />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
import Header from '../components/Header.vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Skills from '../components/Skills.vue'
import Education from '../components/Education.vue'
import Projects from '../components/Projects.vue'
import Experience from '../components/Experience.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'

// Initialize theme system
useTheme()
</script>
