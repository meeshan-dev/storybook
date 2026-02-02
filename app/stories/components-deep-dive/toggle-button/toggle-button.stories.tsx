import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { ToggleButtonDemo } from './toggle-button-demo';
import sourceCode from './toggle-button?raw';

const meta: Meta = {
  title: 'components-deep-dive/Toggle Button',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Toggle Button',
  render: () => (
    <div className='story typography'>
      <h1>Toggle Button</h1>

      <p>
        The Toggle Button component represents an on/off state and can be used
        individually or as part of a group.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>Exclusive (single selection) and multiple selection modes.</p>
        <div>
          <ToggleButtonDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>
          <strong>Exclusive</strong>: Only one button can be selected at a time,
          similar to radio buttons.
        </li>
        <li>
          <strong>Multiple</strong>: Multiple buttons can be selected
          simultaneously, similar to checkboxes.
        </li>
        <li>
          Uses <code>aria-pressed</code> to communicate toggle state to
          assistive technologies.
        </li>
        <li>Supports both controlled and uncontrolled state.</li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
