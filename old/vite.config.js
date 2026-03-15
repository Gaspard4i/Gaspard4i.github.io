import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // IMPORTANT : Laisse la base par défaut ou mets '/'
  // Si c'était un projet "ton-pseudo.github.io/mon-app", il faudrait mettre '/mon-app/'
  base: '/', 
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})