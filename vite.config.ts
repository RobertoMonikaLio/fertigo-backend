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
      },
      build: {
        chunkSizeWarningLimit: 600,
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
              utils: ['zustand'],
              admin: [
                './pages/AdminDashboardPage.tsx',
                './pages/AdminFinancePage.tsx',
                './pages/AdminPartnersPage.tsx',
                './pages/AdminProfilePage.tsx',
                './pages/AdminRequestsPage.tsx',
                './pages/AdminUsersPage.tsx'
              ],
              partner: [
                './pages/PartnerDashboardPage.tsx',
                './pages/PartnerBillingPage.tsx',
                './pages/PartnerJobsPage.tsx',
                './pages/PartnerMarketplacePage.tsx',
                './pages/PartnerMessagesPage.tsx',
                './pages/PartnerProfilePage.tsx',
                './pages/PartnerRequestDetailPage.tsx',
                './pages/PartnerRequestsPage.tsx',
                './pages/PartnerRentPage.tsx',
                './pages/PartnerSettingsPage.tsx'
              ]
            }
          }
        }
      }
    };
});
