import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  base: './',
  build: {
    // Replace only the viewer HTML; never clear the other biblical studies.
    outDir: fileURLToPath(new URL('../../page/Figuras Bíblicas/', import.meta.url)),
    emptyOutDir: false,
    assetsDir: 'assets/tabernaculo-inmersivo',
    rollupOptions: {
      input: fileURLToPath(new URL('./tabernaculo-3d.html', import.meta.url)),
      output: {
        manualChunks(id) {
          if (id.includes('three.core.js')) return 'three-core';
          if (id.includes('/node_modules/three/')) return 'three-renderer';
        },
      },
    },
  },
});
