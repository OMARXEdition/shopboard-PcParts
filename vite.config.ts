import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site from /Shopboard-PcParts/, while Netlify serves it
// from the domain root. Netlify sets NETLIFY=true during its builds.
const base = process.env.NETLIFY === 'true' ? '/' : '/Shopboard-PcParts/'

export default defineConfig({
  base,
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    exclude: ['node_modules/**', '.agents/**'],
  },
})
