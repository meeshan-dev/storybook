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
        The Popover component displays contextual content anchored to a trigger
        element. It is commonly used for supplemental information, lightweight
        actions, or small forms that don't require full page focus.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>Basic popover and popover inside a dialog.</p>
        <div>
          <PopoverDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>
          Fully accessible, with proper ARIA roles, labels, and descriptions.
        </li>
        <li>
          Opens relative to its trigger and automatically adjusts placement to
          remain visible.
        </li>
        <li>Supports controlled and uncontrolled open state.</li>
        <li>Moves focus into the popover when opened.</li>
        <li>Restores focus to the trigger when closed.</li>
        <li>Closes on outside click, Escape key, or explicit close actions.</li>
        <li>
          Layer-aware behavior ensures only the topmost layer responds to
          interactions.
        </li>
        <li>
          Portal-based rendering for correct stacking and layout isolation.
        </li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
