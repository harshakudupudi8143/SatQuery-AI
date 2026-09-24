import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'unsafe-none'
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      }
    }
  },
  preview: {
    headers: {
      'Cross-Origin-Opener-Policy': 'unsafe-none'
    },
    port: 5173,
    strictPort: true
  }
})
