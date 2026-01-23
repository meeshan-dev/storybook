import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../app/**/*.mdx', '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-themes'],
  framework: '@storybook/react-vite',
  // NOTE: vite copy static assets automatically from the "public" folder
  staticDirs: [],
  managerHead: (head) => {
    return `
      ${head}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
/>
    `;
  },
  previewHead: (head) => {
    return `
      ${head}
<style>
  .sb-previewBlock,
  .sb-preparing-story,
  .sb-preparing-docs,
  .sb-errordisplay {
    background: ${process.env.NODE_ENV === 'development' ? '#000000 !important' : 'var(--background)'};
  }
</style>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
/>
    `;
  },
};

export default config;
