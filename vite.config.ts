import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      input: { main: 'index.html', still: 'still.html' },
      output: { manualChunks: { three: ['three'], r3f: ['@react-three/fiber', '@react-three/drei'] } },
    },
  },
})
