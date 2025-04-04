import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige las peticiones que empiezan por /api al backend
      '/api': {
        target: 'http://localhost:5001', // La URL de tu servidor backend
        changeOrigin: true,
        // secure: false, // Descomenta si tu backend no usa HTTPS
      }
    }
  }
})
