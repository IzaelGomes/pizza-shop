import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { InlineConfig, UserConfig } from 'vitest'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    test: {
      globals: true,
    },
  } as UserConfig & {
    test: InlineConfig
  },
})
