import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'public/dist',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:4158'
    }
  }
});