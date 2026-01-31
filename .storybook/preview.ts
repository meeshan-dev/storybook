import { withThemeByClassName } from '@storybook/addon-themes';
import { type Preview } from '@storybook/react-vite';

import '../app/app.css';

const preview: Preview = {
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
    backgrounds: { disabled: true },
    layout: 'fullscreen',
    controls: { expanded: false },
    options: {
      storySort: {
        order: ['Welcome', 'Advanced', 'components-deep-dive', 'Experiments'],
      },
    },
  },
};

export default preview;
