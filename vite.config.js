import { defineConfig } from 'vite';
import vitePluginString from 'vite-plugin-string'

// export default {
//   plugins: [
//     vitePluginString()
//   ]
// }

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: './public/js/planet.js', // Your Three.js entry file
    },
    outDir: 'public/dist',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:4158'
    }
  },
  plugins: [
    vitePluginString()
  ]
});