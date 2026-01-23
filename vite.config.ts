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
  define: {
    SITE_URL: JSON.stringify(
      process.env.VERCEL_ENV === 'preview'
        ? `https://${process.env.VERCEL_BRANCH_URL}`
        : process.env.VERCEL_ENV === 'production'
          ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
          : 'http://localhost:6006',
    ),
  },
});
