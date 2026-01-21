import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import storybookDarkClass from './scripts/vite-storybook-dark-class';

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths({ root: __dirname }),
    storybookDarkClass(),
  ],
});
