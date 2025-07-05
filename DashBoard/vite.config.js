import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mediconnect-backend1.onrender.com', // Change this to your backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
