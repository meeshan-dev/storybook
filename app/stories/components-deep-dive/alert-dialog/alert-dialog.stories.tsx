import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { AlertDialogDemo } from './alert-dialog-demo';
import sourceCode from './alert-dialog?raw';

const meta: Meta = {
  title: 'components-deep-dive/Alert Dialog',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Alert Dialog',
  render: () => (
    <div className='story typography'>
      <h1>Alert Dialog</h1>

      <p>
        An Alert Dialog is a modal dialog that interrupts the user's workflow to
        communicate a critical message and require an explicit response.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>Click the button to trigger the alert dialog.</p>
        <div>
          <AlertDialogDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>
          Fully accessible, with proper ARIA roles, labels, and descriptions.
        </li>
        <li>
          Focus is trapped within the alert dialog while open and restored on
          close.
        </li>
        <li>Supports controlled and uncontrolled open state.</li>
        <li>Closes on Escape key, or explicit close actions.</li>
        <li>Scroll locking prevents background content from scrolling.</li>
        <li>
          Layer-aware behavior ensures only the topmost alert dialog responds to
          interactions.
        </li>
        <li>
          Portal-based rendering for correct stacking and layout isolation.
        </li>
      </ul>

      <p>
        For more details, see the official W3C Alert Dialog pattern{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/'
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
