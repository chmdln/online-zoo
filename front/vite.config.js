import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        map: './src/pages/map/index.html',
        zoos: './src/pages/zoos/index.html',
        contact: './src/pages/contact/index.html',
        signin: './src/pages/signin/index.html',
        signup: './src/pages/signup/index.html',
      }
    }
  },
  server: {
    allowedHosts: true
  }
});