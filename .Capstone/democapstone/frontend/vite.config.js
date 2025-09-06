// vite.config.js
import { defineConfig } from 'vite'

// if you’re using React
import react from '@vitejs/plugin-react'

// if you’re using Vue
// import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional
  }
})

