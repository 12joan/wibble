import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      include: ['tailwind-config', 'node_modules/**'],
    },
  },
  optimizeDeps: {
    include: ['tailwind-config'],
  },
  resolve: {
    alias: {
      'tailwind-config': path.resolve(__dirname, 'tailwind.config.ts'),
      '~/core': path.resolve(__dirname, 'src/core'),
    },
  },
});
