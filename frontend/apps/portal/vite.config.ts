import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Dashboard runs on 5173; portal on 5174 (see docs/12-tech-stack.md §12.4)
  server: { port: 5174 },
})
