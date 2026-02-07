import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { TabsDemo } from './tabs-demo';
import sourceCode from './tabs?raw';

const meta: Meta = {
  title: 'components-deep-dive/Tabs',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Tabs',
  render: () => (
    <div className='story typography'>
      <h1>Tabs</h1>

      <p>
        Implements the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/tabs/'
          target='_blank'
        >
          WAI-ARIA Tabs Pattern
        </a>
      </p>

      <div className='story-demo not-typography'>
        <h2>Interactive demo</h2>
        <p>Dashboard overview</p>
        <div>
          <TabsDemo />
        </div>
      </div>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Roving tabindex</strong> — Only active tab is tabbable; arrow
          keys move focus
        </li>
        <li>
          <strong>Activation modes</strong> — Automatic (focus selects) or
          Manual (Enter/Space)
        </li>
        <li>
          <strong>Bi-directional support</strong> — Horizontal and vertical
          orientations with proper arrow key handling
        </li>
        <li>
          Accessible roles and attributes — <code>role="tablist"</code>,{' '}
          <code>role="tab"</code> with <code>aria-selected</code>,{' '}
          <code>role="tabpanel"</code> with <code>aria-labelledby</code>,{' '}
          <code>aria-controls</code>, <code>aria-orientation</code>
        </li>
        <li>Only the selected panel is visible; others are hidden</li>
      </ul>

      <h2>Keyboard Navigation</h2>

      <h3>Horizontal Orientation</h3>

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
                <code>→</code> Arrow Right
              </td>
              <td className='py-2'>Focus next tab (loops if enabled)</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>←</code> Arrow Left
              </td>
              <td className='py-2'>Focus previous tab (loops if enabled)</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Home</code>
              </td>
              <td className='py-2'>Focus first tab</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>End</code>
              </td>
              <td className='py-2'>Focus last tab</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>Enter</code> / <code>Space</code>
              </td>
              <td className='py-2'>Select focused tab (manual mode only)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Vertical Orientation</h3>
      <p>
        Uses <code>↑</code> and <code>↓</code> arrow keys instead of horizontal
        arrows.
      </p>

      <h2>Activation Modes</h2>

      <ul>
        <li>
          <strong>Automatic (default)</strong> — Tab is selected immediately
          when focused. Best for tabs with instant content.
        </li>
        <li>
          <strong>Manual</strong> — Tab requires Enter or Space to select. Best
          when tab content requires loading or has side effects.
        </li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
