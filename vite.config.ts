import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifest: false, // Using existing manifest.json in public folder
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg}'], // Cache all assets
          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024 // 10MB
        }
      }),
      {
        name: 'save-itinerary',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.method === 'POST' && req.url?.startsWith('/api/save-itinerary/')) {
              const dest = req.url.split('/').pop();
              let body = '';
              req.on('data', chunk => { body += chunk.toString(); });
              req.on('end', () => {
                try {
                  const filePath = path.resolve(__dirname, `src/data/${dest}.json`);
                  fs.writeFileSync(filePath, body);
                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true }));
                } catch (e) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: String(e) }));
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
