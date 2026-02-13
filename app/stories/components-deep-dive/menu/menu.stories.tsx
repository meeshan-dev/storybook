import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { MenuDemo } from './menu-demo';
import sourceCode from './menu?raw';

const meta: Meta = {
  title: 'components-deep-dive/Menu',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Menu',
  render: () => (
    <div className='story'>
      <h1>Menu</h1>

      <p>
        Implements the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/menu/'
          target='_blank'
        >
          WAI-ARIA Menu Pattern
        </a>
      </p>

      <h2>Interactive demo</h2>

      <p>
        File actions, view options, alignment, account menu, and nested patterns
      </p>

      <hr />

      <MenuDemo />

      <hr />

      <h2>Fearutes</h2>

      <ul>
        <li>
          <strong>DOM-driven roving tabindex</strong>: Updates{' '}
          <code>tabindex</code> directly to avoid React re-renders during
          navigation
        </li>
        <li>
          <strong>Typeahead support</strong>: Jump to menu items by typing
        </li>
        <li>
          <strong>Checkbox & radio patterns</strong>: Stateful items with proper
          ARIA attributes
        </li>
        <li>
          <strong>Layer-aware escape handling</strong>: Works correctly inside
          nested dialogs
        </li>
        <li>
          <strong>Accessible roles & attributes</strong>:{' '}
          <code>role="menu"</code>, <code>role="menuitem"</code>,{' '}
          <code>aria-checked</code>, <code>aria-disabled</code>,{' '}
          <code>aria-labelledby</code>
        </li>
        <li>
          <strong>Focus management</strong>: Focus trap while open and returns
          to trigger on close
        </li>
      </ul>

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
              <td className='py-2'>Move focus to next item (loops)</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>↑</code> Arrow Up
              </td>
              <td className='py-2'>Move focus to previous item (loops)</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Home</code>
              </td>
              <td className='py-2'>Move focus to first item</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>End</code>
              </td>
              <td className='py-2'>Move focus to last item</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Space</code>
              </td>
              <td className='py-2'>Activate focused item</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Escape</code>
              </td>
              <td className='py-2'>Close menu and restore focus to trigger</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>A-Z</code>
              </td>
              <td className='py-2'>
                Typeahead: focus item starting with letter
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Menu Item Types</h2>

      <ul>
        <li>
          <strong>MenuItem</strong>: Standard action item, closes menu on
          activation
        </li>
        <li>
          <strong>MenuCheckboxItem</strong>: Toggleable item with{' '}
          <code>aria-checked</code>, optionally keeps menu open
        </li>
        <li>
          <strong>MenuRadioItem</strong>: Exclusive selection within a{' '}
          <code>MenuRadioGroup</code>
        </li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
