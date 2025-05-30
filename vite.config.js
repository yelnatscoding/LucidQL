import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './client',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/db': 'http://localhost:8081', // Make sure your Express server runs on 8081
    },
  },
});