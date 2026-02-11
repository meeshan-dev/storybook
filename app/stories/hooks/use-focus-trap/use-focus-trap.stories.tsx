import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { UseFocusTrapDemo } from './use-focus-trap-demo';
import sourceCode from './use-focus-trap?raw';

const meta: Meta = {
  title: 'hooks/useFocusTrap',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'useFocusTrap',
  render: () => (
    <div className='story'>
      <h1>useFocusTrap</h1>

      <p>
        Traps keyboard focus within a container element, preventing users from
        tabbing outside. Essential for accessible modals and dialogs.
      </p>

      <h2>Interactive demo</h2>

      <p>
        Toggle the trap and try tabbing — focus stays inside the highlighted
        zone
      </p>

      <hr />

      <UseFocusTrapDemo />

      <hr />

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          Returns spread-ready props (<code>ref</code>, <code>onKeyDown</code>,{' '}
          <code>tabIndex</code>) for the container element
        </li>
        <li>
          Required <code>enabled</code> prop activates the trap;{' '}
          <code>trapped</code> controls whether focus can leave via keyboard,
          and <code>loop</code> controls Tab wrapping
        </li>
        <li>
          Listens to both <code>focusin</code> and <code>focusout</code>{' '}
          document events to catch all focus movement
        </li>
        <li>
          Restores focus to the previously focused element on cleanup (can be
          disabled via <code>disableFocusReturn</code>)
        </li>
        <li>
          Uses a <code>TreeWalker</code> to find tabbable elements, correctly
          skipping hidden, disabled, and <code>tabIndex=&quot;-1&quot;</code>{' '}
          elements
        </li>
        <li>
          Handles dynamic DOM changes via <code>MutationObserver</code> — if a
          focused element is removed, focus moves back to the container
        </li>
        <li>
          Integrates with a layer system via <code>isLayerPaused</code> for
          nested focus traps
        </li>
      </ul>

      <h2>Keyboard Navigation</h2>

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
                Move focus to the next focusable element inside the trap
              </td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>Shift + Tab</code>
              </td>
              <td className='py-2'>
                Move focus to the previous focusable element inside the trap
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
