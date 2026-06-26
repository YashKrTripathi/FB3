import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Exclude binary assets in public/ from the watcher to prevent
      // Windows EBUSY errors when files are held open by another process
      ignored: [
        '**/public/**/*.gif',
        '**/public/**/*.mp4',
        '**/public/**/*.webm',
        '**/public/**/*.png',
        '**/public/**/*.jpg',
        '**/public/**/*.jpeg',
        '**/public/**/*.svg',
      ],
    },
  },
})

