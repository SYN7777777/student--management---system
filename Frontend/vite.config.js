// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      // All calls to /api/* will be forwarded to your backend server
      '/api': 'http://localhost:5000',
    },
  },
});
