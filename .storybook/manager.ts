import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'dark',
  fontBase: "'Noto Sans Variable', sans-serif",
  appPreviewBg: '#000000',
});

addons.setConfig({
  theme,
});
