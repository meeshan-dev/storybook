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
        A Dialog is a modal surface that appears above the page content to
        present critical information or request user input. It temporarily
        blocks interaction with the underlying UI until the dialog is dismissed.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>Basic and nested/stacked dialogs.</p>
        <div>
          <DialogDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>
          Fully accessible, with proper ARIA roles, labels, and descriptions.
        </li>
        <li>
          Focus is trapped within the dialog while open and restored on close.
        </li>
        <li>Supports controlled and uncontrolled open state.</li>
        <li>Closes on outside click, Escape key, or explicit close actions.</li>
        <li>Scroll locking prevents background content from scrolling.</li>
        <li>
          Layer-aware behavior ensures only the topmost dialog responds to
          interactions.
        </li>
        <li>
          Portal-based rendering for correct stacking and layout isolation.
        </li>
      </ul>

      <p>
        For more details, see the official W3C Dialog pattern{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/'
          target='_blank'
        >
          documentation
        </a>
        .
      </p>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
