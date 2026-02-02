import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { TooltipDemo } from './tooltip-demo';
import sourceCode from './tooltip?raw';

const meta: Meta = {
  title: 'components-deep-dive/Tooltip',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Tooltip',
  render: () => (
    <div className='story typography'>
      <h1>Tooltip</h1>

      <p>
        An accessible tooltip component implementing the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/'
          target='_blank'
        >
          WAI-ARIA Tooltip Pattern
        </a>
        . Powered by Floating UI for intelligent positioning with collision
        detection.
      </p>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Floating UI positioning</strong> — Uses{' '}
          <code>@floating-ui/react</code> with flip, shift, and offset
          middleware for automatic repositioning
        </li>
        <li>
          <strong>Single tooltip guarantee</strong> — Global registry ensures
          only one tooltip is visible at a time
        </li>
        <li>
          <strong>Configurable triggers</strong> — Support for hover, focus, or
          both via <code>trigger</code> prop
        </li>
        <li>
          <strong>Show/hide delays</strong> — Prevents flickering with
          configurable delays for smooth UX
        </li>
        <li>
          <strong>Interactive mode</strong> —{' '}
          <code>disableInteractive={'{'}false{'}'}</code> allows hovering over
          tooltip content
        </li>
        <li>
          <strong>Render prop pattern</strong> — Full control over trigger and
          content rendering
        </li>
      </ul>

      <div className='story-demo not-typography'>
        <h2>Interactive Examples</h2>
        <p className='text-muted-foreground mb-6'>
          Toolbar actions, text formatting, form hints, and interactive tooltips
        </p>
        <div>
          <TooltipDemo />
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
                <code>Tab</code>
              </td>
              <td className='py-2'>Focus trigger element (shows tooltip)</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Escape</code>
              </td>
              <td className='py-2'>Close tooltip without moving focus</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>Tab</code> (again)
              </td>
              <td className='py-2'>Move focus away (hides tooltip)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Trigger Modes</h2>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 pr-4 text-left font-semibold'>Mode</th>
              <th className='py-2 pr-4 text-left font-semibold'>Prop</th>
              <th className='py-2 text-left font-semibold'>Behavior</th>
            </tr>
          </thead>
          <tbody className='text-muted-foreground'>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Default</td>
              <td className='py-2 pr-4'>
                <code>trigger={'{'}undefined{'}'}</code>
              </td>
              <td className='py-2'>Shows on hover and focus</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Hover only</td>
              <td className='py-2 pr-4'>
                <code>trigger="hover"</code>
              </td>
              <td className='py-2'>Mouse hover only (no keyboard)</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>Focus only</td>
              <td className='py-2 pr-4'>
                <code>trigger="focus"</code>
              </td>
              <td className='py-2'>Keyboard focus only (no hover)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Accessibility Features</h2>

      <ul>
        <li>
          Uses <code>role="tooltip"</code> for screen reader announcement
        </li>
        <li>
          Trigger has <code>aria-describedby</code> pointing to tooltip
        </li>
        <li>Opens on keyboard focus by default</li>
        <li>Escape key dismisses without moving focus</li>
        <li>Does not trap focus (unlike dialogs)</li>
        <li>Disabled triggers prevent tooltip from appearing</li>
      </ul>

      <h2>Best Practices</h2>

      <ul>
        <li>Keep tooltip content brief and informative</li>
        <li>Don't put essential information only in tooltips</li>
        <li>Use consistent placement across similar elements</li>
        <li>Include keyboard shortcuts in toolbar tooltips</li>
        <li>
          Use interactive tooltips sparingly — consider popover for complex
          content
        </li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
