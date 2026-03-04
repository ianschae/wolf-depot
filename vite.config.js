import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// GitHub Pages serves at lowercase URL: username.github.io/wolf-depot/
const base = process.env.VITE_BASE_PATH ?? (process.env.NODE_ENV === 'production' ? '/wolf-depot/' : '/')

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
