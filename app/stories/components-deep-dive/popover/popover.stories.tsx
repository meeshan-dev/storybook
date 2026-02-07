import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { PopoverDemo } from './popover-demo';
import sourceCode from './popover?raw';

const meta: Meta = {
  title: 'components-deep-dive/Popover',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Popover',
  render: () => (
    <div className='story typography'>
      <h1>Popover</h1>

      <p>
        Implements the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/'
          target='_blank'
        >
          WAI-ARIA Dialog (non-modal) Pattern
        </a>
      </p>

      <div className='story-demo not-typography'>
        <h2>Interactive demo</h2>
        <p>
          User profile cards, notification settings, filter panels, and date
          selection
        </p>
        <div>
          <PopoverDemo />
        </div>
      </div>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          Trigger with <code>aria-expanded</code> and <code>aria-controls</code>
        </li>
        <li>
          Content linked via <code>aria-labelledby</code> and{' '}
          <code>aria-describedby</code>
        </li>
        <li>
          Focus management — Moves into popover on open, returns to trigger on
          close
        </li>
        <li>Dismissal — Escape key and layer-aware outside click</li>
      </ul>

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
                <code>Escape</code>
              </td>
              <td className='py-2'>Close popover, return focus to trigger</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>Tab</code>
              </td>
              <td className='py-2'>
                Navigate focusable elements within popover
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
