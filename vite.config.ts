import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || ''),
    },

    server: {
      watch: {
        ignored: ['**/tsconfig.json', '**/.env']
      },
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/api/wilayah': {
          target: 'https://wilayah.id',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/wilayah/, '/api')
        },
        '/api/midtrans': {
          target: 'http://127.0.0.1:3001',
          changeOrigin: true
        }
      }
    },
  };
});
