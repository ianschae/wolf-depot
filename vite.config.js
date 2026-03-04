import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Relative base so assets load on GitHub Pages from any repo path/casing
const base = process.env.NODE_ENV === 'production' ? './' : '/'

export default defineConfig({
  plugins: [
    react(),
    // GitHub Pages: 404.html loads the app so client-side routes work
    {
      name: 'copy-404',
      closeBundle() {
        const src = resolve(__dirname, 'dist/index.html')
        const dest = resolve(__dirname, 'dist/404.html')
        if (existsSync(src)) copyFileSync(src, dest)
      },
    },
  ],
  base,
})
