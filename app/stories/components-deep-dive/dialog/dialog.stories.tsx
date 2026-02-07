import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { DialogDemo } from './dialog-demo';
import sourceCode from './dialog?raw';

const meta: Meta = {
  title: 'components-deep-dive/Dialog',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Dialog',
  render: () => (
    <div className='story'>
      <h1>Dialog</h1>

      <p>
        Implements the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/'
          target='_blank'
        >
          WAI-ARIA Dialog Pattern
        </a>
      </p>

      <h2>Interactive demo</h2>

      <p>Real-world patterns: forms, wizards, and nested dialogs</p>

      <hr />

      <DialogDemo />

      <hr />

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Focus management</strong> with focus trap, auto-focus on open,
          and restore on close
        </li>
        <li>
          <strong>Scroll lock</strong> to prevent background scroll while
          preserving scroll position
        </li>
        <li>
          <strong>Layer management</strong> for stacked dialogs. Only the
          topmost responds to Escape and outside clicks
        </li>
        <li>
          <strong>Portal-based rendering</strong> for proper stacking and
          isolation
        </li>
        <li>
          <strong>Layer-aware outside click detection</strong>
        </li>
        <li>
          <strong>Accessible markup</strong> with
          <code>role="dialog"</code>, <code>aria-modal</code>,
          <code>aria-labelledby</code>, and <code>aria-describedby</code>
        </li>
        <li>
          <strong>Inert background</strong> hidden from screen readers while
          dialogs are open
        </li>
        <li>
          <strong>Independent overlays</strong> per dialog with consistent
          behavior
        </li>
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
                <code>Tab</code>
              </td>
              <td className='py-2'>
                Cycle through focusable elements within the dialog
              </td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Shift + Tab</code>
              </td>
              <td className='py-2'>
                Cycle backwards through focusable elements
              </td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>Escape</code>
              </td>
              <td className='py-2'>Close the topmost dialog</td>
            </tr>
          </tbody>
        </table>
      </div>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
