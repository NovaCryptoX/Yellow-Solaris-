import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Proper Vite config for React Router + Netlify
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true,
  },
});
