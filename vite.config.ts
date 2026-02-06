import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        // HMR / Live-Reload: Port automatisch vom Dev-Server übernehmen,
        // damit es auch bei abweichenden Ports (z.B. 5173) zuverlässig funktioniert.
        hmr: {
          overlay: true,
        },
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
