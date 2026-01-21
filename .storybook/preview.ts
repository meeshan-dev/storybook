import themesAddon from '@storybook/addon-themes';
import { definePreview } from '@storybook/react-vite';

import '../app/app.css';

export default definePreview({
  addons: [themesAddon()],
  parameters: {
    backgrounds: { disable: true },
    themes: {
      themeOverride: 'dark',
    },
    controls: {
      expanded: false,
    },
  },
});
