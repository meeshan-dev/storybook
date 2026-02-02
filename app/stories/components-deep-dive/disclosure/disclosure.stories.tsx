import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { DisclosureDemo } from './disclosure-demo';
import sourceCode from './disclosure?raw';

const meta: Meta = {
  title: 'components-deep-dive/Disclosure',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Disclosure',
  render: () => (
    <div className='story typography'>
      <h1>Disclosure</h1>

      <p>
        An accessible disclosure (accordion) component implementing the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/'
          target='_blank'
        >
          WAI-ARIA Disclosure Pattern
        </a>
        . Supports single or multiple expansion modes with smooth animations via
        motion/react.
      </p>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Flexible expansion modes</strong> — <code>type="multiple"</code>{' '}
          allows any number of items open, <code>type="single"</code> enforces
          accordion behavior
        </li>
        <li>
          <strong>Collapsible control</strong> — Single mode supports{' '}
          <code>isSingleCollapsible</code> to prevent closing all items
        </li>
        <li>
          <strong>Smooth animations</strong> — Uses <code>motion/react</code>{' '}
          with <code>AnimatePresence</code> for enter/exit transitions
        </li>
        <li>
          <strong>Type-safe API</strong> — TypeScript generics enforce correct
          defaultValue types based on mode
        </li>
        <li>
          <strong>Render prop pattern</strong> — Full control over trigger
          styling with <code>data-expanded</code> attribute
        </li>
      </ul>

      <div className='story-demo not-typography'>
        <h2>Interactive Examples</h2>
        <p className='text-muted-foreground mb-6'>
          FAQ section, settings panel, filter sidebar, and feature details
        </p>
        <div>
          <DisclosureDemo />
        </div>
      </div>

      <h2>Expansion Modes</h2>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 pr-4 text-left font-semibold'>Mode</th>
              <th className='py-2 pr-4 text-left font-semibold'>Props</th>
              <th className='py-2 text-left font-semibold'>Behavior</th>
            </tr>
          </thead>
          <tbody className='text-muted-foreground'>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Multiple</td>
              <td className='py-2 pr-4'>
                <code>type="multiple"</code>
              </td>
              <td className='py-2'>Any number of items can be open</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Single (collapsible)</td>
              <td className='py-2 pr-4'>
                <code>type="single"</code>
              </td>
              <td className='py-2'>One item at a time, can close all</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>Single (non-collapsible)</td>
              <td className='py-2 pr-4'>
                <code>type="single" isSingleCollapsible={'{'}false{'}'}</code>
              </td>
              <td className='py-2'>Always exactly one item open</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Keyboard Interactions</h2>

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
                <code>Enter</code> / <code>Space</code>
              </td>
              <td className='py-2'>Toggle disclosure open/closed</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Tab</code>
              </td>
              <td className='py-2'>Move focus to next trigger</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>Shift + Tab</code>
              </td>
              <td className='py-2'>Move focus to previous trigger</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Accessibility Features</h2>

      <ul>
        <li>
          Trigger has <code>aria-expanded</code> reflecting open state
        </li>
        <li>
          Trigger has <code>aria-controls</code> pointing to content ID
        </li>
        <li>
          Content has <code>role="region"</code> and{' '}
          <code>aria-labelledby</code>
        </li>
        <li>Disabled items announced and skip interaction</li>
        <li>
          <code>data-expanded</code> attribute for CSS-based styling
        </li>
      </ul>

      <h2>Animation Details</h2>

      <p>
        Content height animation uses motion/react's <code>AnimatePresence</code>{' '}
        with <code>initial</code>, <code>animate</code>, and <code>exit</code>{' '}
        states. The content measures its natural height and animates from 0 to
        full height with opacity transition for a smooth reveal effect.
      </p>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
