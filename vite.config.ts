import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/latex-preview/',
  plugins: [
    react()
  ],
  build: {
    // Modern build settings
    target: 'esnext',
    minify: 'terser', // Rolldown uses terser/minify if available
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
  }
})
