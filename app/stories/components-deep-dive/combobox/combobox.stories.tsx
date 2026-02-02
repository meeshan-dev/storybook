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
        A sophisticated, fully accessible combobox component built from first
        principles. Implements the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/combobox/'
          target='_blank'
        >
          WAI-ARIA Combobox Pattern
        </a>{' '}
        with support for single selection, multi-selection, typeahead search,
        and complex keyboard navigation.
      </p>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Diacritics-insensitive filtering</strong> — Search matches
          "café" when typing "cafe" using Unicode normalization
        </li>
        <li>
          <strong>Floating UI integration</strong> — Auto-positioned dropdown
          with collision detection and dynamic sizing
        </li>
        <li>
          <strong>Virtual highlighting</strong> — Separate highlight state from
          selection for smooth keyboard navigation
        </li>
        <li>
          <strong>Multi-select with tags</strong> — Removable tags with keyboard
          support (Backspace to remove last)
        </li>
        <li>
          <strong>Focus management</strong> — Proper focus flow between input,
          listbox, and tag removal buttons
        </li>
        <li>
          <strong>TypeScript generics</strong> — Full type inference for option
          values
        </li>
      </ul>

      <div className='story-demo not-typography'>
        <h2>Interactive Examples</h2>
        <p className='text-muted-foreground mb-6'>
          Real-world patterns: country selector, user search, skills picker
        </p>
        <div>
          <ComboboxDemo />
        </div>
      </div>

      <h2>Keyboard Navigation</h2>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 pr-4 text-left font-semibold'>Key</th>
              <th className='py-2 text-left font-semibold'>Action</th>
            </tr>
          </thead>
          <tbody className='text-muted-foreground'>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>↓</code> Arrow Down
              </td>
              <td className='py-2'>
                Open listbox (if closed) or move highlight down
              </td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>↑</code> Arrow Up
              </td>
              <td className='py-2'>Move highlight up</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Home</code>
              </td>
              <td className='py-2'>Move highlight to first option</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>End</code>
              </td>
              <td className='py-2'>Move highlight to last option</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Enter</code>
              </td>
              <td className='py-2'>Select highlighted option</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Escape</code>
              </td>
              <td className='py-2'>Close listbox</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>Backspace</code>
              </td>
              <td className='py-2'>
                Remove last selected tag (multi-select, when input is empty)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Accessibility Features</h2>

      <ul>
        <li>
          <code>role="combobox"</code> on input with{' '}
          <code>aria-autocomplete="list"</code>
        </li>
        <li>
          <code>aria-expanded</code> indicates listbox visibility
        </li>
        <li>
          <code>aria-activedescendant</code> tracks highlighted option
        </li>
        <li>
          <code>role="listbox"</code> with <code>role="option"</code> children
        </li>
        <li>
          <code>aria-selected</code> on selected options
        </li>
        <li>
          <code>aria-disabled</code> on disabled options
        </li>
        <li>Live region announces selection changes to screen readers</li>
      </ul>

      <h2>Architecture</h2>

      <p>The combobox manages several interconnected states:</p>

      <ul>
        <li>
          <strong>Open state</strong> — Whether the dropdown is visible
        </li>
        <li>
          <strong>Search query</strong> — Current filter text
        </li>
        <li>
          <strong>Highlighted index</strong> — Visual focus within listbox
        </li>
        <li>
          <strong>Selected values</strong> — Current selection (single or
          multiple)
        </li>
        <li>
          <strong>Filtered options</strong> — Computed from search query
        </li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
