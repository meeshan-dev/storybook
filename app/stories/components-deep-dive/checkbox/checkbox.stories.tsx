import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { CheckboxDemo } from './checkbox-demo';
import sourceCode from './checkbox?raw';

const meta: Meta = {
  title: 'components-deep-dive/Checkbox',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Checkbox',
  render: () => (
    <div className='story typography'>
      <h1>Checkbox</h1>

      <p>
        A checkbox is a simple form control that lets users select one or more
        options from a group. It's commonly used for settings, preferences, and
        multi-select lists.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>Various checkbox styles and states.</p>
        <div>
          <CheckboxDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>Built on native HTML input for broad browser compatibility.</li>
        <li>
          Supports an indeterminate state for partial or mixed selections.
        </li>
        <li>Customizable icons.</li>
        <li>Fully controllable and uncontrolled usage.</li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
