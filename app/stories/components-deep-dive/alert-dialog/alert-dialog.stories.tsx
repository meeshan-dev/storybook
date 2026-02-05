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
        An accessible alert dialog for critical confirmations that require
        explicit user acknowledgment. Unlike regular dialogs, alert dialogs{' '}
        <strong>cannot be dismissed by clicking outside</strong> — ensuring
        users consciously respond to important actions.
      </p>

      <div className='story-demo not-typography'>
        <h2>Interactive Examples</h2>
        <p>
          Common patterns: destructive actions, logout, and navigation guards
        </p>
        <div>
          <AlertDialogDemo />
        </div>
      </div>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Non-dismissible by outside click</strong> — Forces explicit
          user decision for critical actions
        </li>
        <li>
          <strong>Shares infrastructure with Dialog</strong> — Same focus trap,
          scroll lock, and portal implementation
        </li>
        <li>
          <strong>
            Uses <code>role="alertdialog"</code>
          </strong>{' '}
          — Proper semantic role for assistive technologies
        </li>
        <li>
          <strong>Layer-aware</strong> — Works correctly when nested within
          other dialogs
        </li>
        <li>
          <strong>Escape key closes</strong> — Allows keyboard dismissal while
          preventing accidental mouse clicks
        </li>
      </ul>

      <h2>Alert Dialog vs Dialog</h2>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 pr-4 text-left font-semibold'>Feature</th>
              <th className='py-2 pr-4 text-left font-semibold'>Dialog</th>
              <th className='py-2 text-left font-semibold'>Alert Dialog</th>
            </tr>
          </thead>
          <tbody className='text-muted-foreground'>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Outside click</td>
              <td className='py-2 pr-4'>Closes dialog</td>
              <td className='py-2'>No effect</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Escape key</td>
              <td className='py-2 pr-4'>Closes dialog</td>
              <td className='py-2'>Closes dialog</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>ARIA role</td>
              <td className='py-2 pr-4'>
                <code>dialog</code>
              </td>
              <td className='py-2'>
                <code>alertdialog</code>
              </td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>Use case</td>
              <td className='py-2 pr-4'>Forms, content, info</td>
              <td className='py-2'>Confirmations, warnings</td>
            </tr>
          </tbody>
        </table>
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
