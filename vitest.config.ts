import { defineConfig } from 'vitest/config';
import vite from './vite.config.ts';
export default defineConfig({
  ...vite,
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
  },
});
