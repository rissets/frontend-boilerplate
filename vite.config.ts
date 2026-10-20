import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: '@/components/ui',
        replacement: fileURLToPath(new URL('./src/shared/ui', import.meta.url)),
      },
      {
        find: '@/hooks',
        replacement: fileURLToPath(new URL('./src/shared/hooks', import.meta.url)),
      },
      { find: '@/lib', replacement: fileURLToPath(new URL('./src/shared/lib', import.meta.url)) },
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
  server: { strictPort: true },
});
