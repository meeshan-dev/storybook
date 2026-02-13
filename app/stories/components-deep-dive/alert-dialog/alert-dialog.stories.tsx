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
    <div className='story'>
      <h1>Alert Dialog</h1>

      <p>
        Implements the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/'
          target='_blank'
        >
          WAI-ARIA Alert Dialog Pattern
        </a>
      </p>

      <h2>Interactive demo</h2>

      <p>Common patterns: destructive actions, logout, and navigation guards</p>

      <hr />

      <AlertDialogDemo />

      <hr />

      <h2>Fearutes</h2>

      <ul>
        <li>
          <strong>Alert semantics</strong> using <code>role="alertdialog"</code>
        </li>
        <li>
          <strong>Layer-aware behavior</strong> for safe nesting inside dialogs
        </li>
        <li>
          <strong>Keyboard dismissible</strong> via Escape key
        </li>
        <li>
          <strong>No outside click dismissal</strong> to enforce explicit user
          action
        </li>
        <li>
          <strong>Shared Dialog infrastructure</strong> (focus trap, scroll
          lock, portals)
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
              <td className='py-2'>Cycle through focusable elements</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Shift + Tab</code>
              </td>
              <td className='py-2'>Cycle backwards</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>Escape</code>
              </td>
              <td className='py-2'>Close the alert dialog</td>
            </tr>
          </tbody>
        </table>
      </div>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
