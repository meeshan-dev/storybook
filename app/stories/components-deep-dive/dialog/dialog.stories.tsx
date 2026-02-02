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
    <div className='story typography'>
      <h1>Dialog</h1>

      <p>
        A fully-featured, accessible modal dialog component built from
        primitives. Implements the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/'
          target='_blank'
        >
          WAI-ARIA Dialog Pattern
        </a>{' '}
        with focus trapping, scroll locking, and layer-aware behavior for
        complex overlay scenarios.
      </p>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Custom focus trap hook</strong> using{' '}
          <code>useFocusTrap</code> that handles edge cases like dynamically
          added content
        </li>
        <li>
          <strong>Scroll lock implementation</strong> via{' '}
          <code>useScrollLock</code> preventing background scroll while
          preserving scroll position
        </li>
        <li>
          <strong>Layer management system</strong> using{' '}
          <code>getLayers()</code> to track stacked dialogs and ensure only the
          topmost responds to interactions
        </li>
        <li>
          <strong>Portal-based rendering</strong> with React's{' '}
          <code>createPortal</code> for proper stacking context isolation
        </li>
        <li>
          <strong>Click outside detection</strong> via{' '}
          <code>useOnClickOutside</code> with layer awareness
        </li>
        <li>
          <strong>Compound component pattern</strong> for flexible composition
        </li>
      </ul>

      <div className='story-demo not-typography'>
        <h2>Interactive Examples</h2>
        <p className='text-muted-foreground mb-6'>
          Real-world patterns: forms, wizards, and nested dialogs
        </p>
        <div>
          <DialogDemo />
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

      <h2>Accessibility Features</h2>

      <ul>
        <li>
          <code>role="dialog"</code> with <code>aria-modal="true"</code>
        </li>
        <li>
          <code>aria-labelledby</code> pointing to dialog title
        </li>
        <li>
          <code>aria-describedby</code> pointing to dialog description
        </li>
        <li>Focus moves into dialog on open and returns to trigger on close</li>
        <li>Focus is trapped within the dialog while open</li>
        <li>Background content is inert and hidden from screen readers</li>
      </ul>

      <h2>Layer Management</h2>

      <p>
        The dialog uses a layer tracking system that allows multiple dialogs to
        be stacked. Key behaviors:
      </p>

      <ul>
        <li>
          Only the <strong>topmost dialog</strong> responds to Escape key
        </li>
        <li>
          Only the <strong>topmost dialog</strong> closes on outside click
        </li>
        <li>Each dialog maintains its own overlay</li>
        <li>Focus is properly managed across all layers</li>
      </ul>

      <h2>Component API</h2>

      <ul>
        <li>
          <code>DialogRoot</code> — Context provider and state manager
        </li>
        <li>
          <code>DialogTrigger</code> — Render prop trigger button
        </li>
        <li>
          <code>DialogPortal</code> — Renders children in document body
        </li>
        <li>
          <code>DialogOverlay</code> — Backdrop overlay
        </li>
        <li>
          <code>DialogContent</code> — Main dialog container with focus trap
        </li>
        <li>
          <code>DialogTitle</code> — Accessible title (required)
        </li>
        <li>
          <code>DialogDescription</code> — Optional description
        </li>
        <li>
          <code>DialogClose</code> — Close button with render prop
        </li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
