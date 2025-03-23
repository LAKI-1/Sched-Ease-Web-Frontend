import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Add base path if deploying to a subfolder, otherwise leave it as '/'
  base: '/', // Change this if you deploy to a subpath like '/your-subpath/'
  build: {
    outDir: 'dist',  // Default build directory
  }
})
