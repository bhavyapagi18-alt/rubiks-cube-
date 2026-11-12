import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // relative paths: works on Vercel and GitHub Pages sub-paths
  worker: { format: 'es' },
  build: { chunkSizeWarningLimit: 1200 }, // three.js is large by nature
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
