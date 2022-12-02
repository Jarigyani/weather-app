import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  base: './',
  root: './src',
  build: {
    /**
     * GitHub Pages でメインブランチを公開する場合には、
     * サーブするディレクトリには
     * '/' (root) と '/docs' しか選択肢がない
     */
    outDir: '../docs',
  },
  plugins: [react(), VitePWA()],
});
