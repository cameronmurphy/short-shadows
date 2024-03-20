import legacy from '@vitejs/plugin-legacy';
import path from 'path';
import ViteRestart from 'vite-plugin-restart';

export default ({ command }) => ({
  base: command === 'serve' ? '' : '/dist/',
  build: {
    emptyOutDir: true,
    manifest: true,
    outDir: './web/dist/',
    rollupOptions: {
      input: {
        app: './templates/_scripts/main.js',
      },
    },
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '~hamburgers': path.resolve(__dirname, 'node_modules/hamburgers'),
      '~photoswipe': path.resolve(__dirname, 'node_modules/photoswipe'),
    },
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    ViteRestart({
      reload: ['./templates/**/*'],
    }),
  ],
  server: {
    fs: {
      strict: false,
    },
    host: '0.0.0.0',
    origin: 'http://localhost:3000',
    port: 3000,
    strictPort: true,
  },
});
