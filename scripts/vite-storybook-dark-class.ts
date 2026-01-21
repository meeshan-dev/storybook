import type { Plugin } from 'vite';

// This plugin adds the 'dark' class to the .storybook-root element and <html> in the generated HTML
export default function StorybookDarkClassPlugin(): Plugin {
  return {
    name: 'storybook-dark-class',
    transformIndexHtml(html) {
      // Add 'dark' class to .storybook-root
      const newHtml = html.replace(
        /<html([^>]*)>/i,
        (_match: string, attrs: string) => {
          if (/class=/.test(attrs)) {
            return `<html${attrs.replace(
              /class=["']([^"']*)["']/,
              (_, cls) => ` class="${cls} dark scheme-dark"`,
            )}>`;
          }

          return `<html${attrs} class="dark scheme-dark">`;
        },
      );

      return newHtml;
    },
  };
}
