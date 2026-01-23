import addonThemes, { withThemeByClassName } from '@storybook/addon-themes';
import { definePreview } from '@storybook/react-vite';

import '../app/app.css';

export default definePreview({
  addons: [addonThemes()],
  decorators: [
    withThemeByClassName({
      defaultTheme: 'dark',
      themes: {
        light: 'scheme-light',
        dark: 'dark scheme-dark',
      },
    }),
  ],
  parameters: {
    backgrounds: { disable: true },
    layout: 'fullscreen',
    controls: { expanded: false },
  },
});
