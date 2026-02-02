import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { ComboboxDemo } from './combobox-demo';
import sourceCode from './combobox?raw';

const meta: Meta = {
  title: 'components-deep-dive/Combobox',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Combobox',
  render: () => (
    <div className='story typography'>
      <h1>Combobox</h1>

      <p>
        A fully accessible combobox built from first principles, designed to
        handle complex interaction patterns without relying on heavy
        abstractions.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>Single, multiple selection, and disabled options.</p>
        <div>
          <ComboboxDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>Single and multiple selection support with removable tags.</li>
        <li>Full keyboard navigation and screen reader compatibility.</li>
        <li>Search with diacritics-insensitive filtering.</li>
        <li>
          Precise focus and highlight management for input, listbox, and tags.
        </li>
        <li>Floating, auto-positioned listbox with dynamic sizing.</li>
        <li>Disabled option handling and robust edge-case coverage.</li>
      </ul>

      <p>
        For more details, see the official W3C Combobox pattern{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/combobox/'
          target='_blank'
        >
          documentation
        </a>
        .
      </p>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
