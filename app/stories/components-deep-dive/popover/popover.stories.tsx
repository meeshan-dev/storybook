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
        An accessible popover component for displaying rich interactive content
        anchored to a trigger element. Uses Floating UI for intelligent
        positioning and the layer system for proper stacking.
      </p>

      <div className='story-demo not-typography'>
        <h2>Interactive Examples</h2>
        <p className='text-muted-foreground mb-6'>
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
          Trigger has <code>aria-expanded</code> and <code>aria-controls</code>{' '}
          attributes
        </li>
        <li>
          Content has <code>aria-labelledby</code> and{' '}
          <code>aria-describedby</code> linked to title and description
        </li>
        <li>Focus moves to popover content on open</li>
        <li>Focus returns to trigger on close</li>
        <li>Escape key closes popover</li>
        <li>Click outside closes popover (layer-aware)</li>
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
