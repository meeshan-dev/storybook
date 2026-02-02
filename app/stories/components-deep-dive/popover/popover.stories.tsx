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

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Floating UI positioning</strong> — Automatic placement with
          flip, shift, and collision detection
        </li>
        <li>
          <strong>Layer-aware interactions</strong> — Uses{' '}
          <code>getLayers()</code> to determine if popover is the topmost layer
        </li>
        <li>
          <strong>Focus management</strong> — Moves focus into popover on open,
          returns to trigger on close
        </li>
        <li>
          <strong>Render prop pattern</strong> — Full control over trigger and
          content with <code>children</code> function
        </li>
        <li>
          <strong>Portal rendering</strong> — Content rendered via portal for
          correct stacking context
        </li>
        <li>
          <strong>Outside click handling</strong> — Uses{' '}
          <code>useOnClickOutside</code> with layer awareness
        </li>
      </ul>

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
              <td className='py-2'>Open popover from trigger</td>
            </tr>
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

      <h2>Popover vs Dialog vs Tooltip</h2>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 pr-4 text-left font-semibold'>Aspect</th>
              <th className='py-2 pr-4 text-left font-semibold'>Popover</th>
              <th className='py-2 pr-4 text-left font-semibold'>Dialog</th>
              <th className='py-2 text-left font-semibold'>Tooltip</th>
            </tr>
          </thead>
          <tbody className='text-muted-foreground'>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Focus trap</td>
              <td className='py-2 pr-4'>No</td>
              <td className='py-2 pr-4'>Yes</td>
              <td className='py-2'>No</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Backdrop</td>
              <td className='py-2 pr-4'>No</td>
              <td className='py-2 pr-4'>Yes (modal)</td>
              <td className='py-2'>No</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Interactive</td>
              <td className='py-2 pr-4'>Yes</td>
              <td className='py-2 pr-4'>Yes</td>
              <td className='py-2'>Optional</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>Use case</td>
              <td className='py-2 pr-4'>Contextual actions</td>
              <td className='py-2 pr-4'>Important tasks</td>
              <td className='py-2'>Brief hints</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Accessibility Features</h2>

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

      <h2>Component API</h2>

      <ul>
        <li>
          <code>PopoverRoot</code> — Context provider with open state
        </li>
        <li>
          <code>PopoverTrigger</code> — Render prop for trigger element
        </li>
        <li>
          <code>PopoverPortal</code> — Renders content in portal
        </li>
        <li>
          <code>PopoverContent</code> — Positioned content with arrow props
        </li>
        <li>
          <code>PopoverTitle</code> — Accessible title
        </li>
        <li>
          <code>PopoverDescription</code> — Accessible description
        </li>
        <li>
          <code>PopoverClose</code> — Close action trigger
        </li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
