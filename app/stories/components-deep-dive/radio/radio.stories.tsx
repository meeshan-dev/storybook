import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { RadioDemo } from './radio-demo';
import sourceCode from './radio?raw';

const meta: Meta = {
  title: 'components-deep-dive/Radio',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Radio',
  render: () => (
    <div className='story typography'>
      <h1>Radio</h1>

      <p>
        A radio button is a form control that allows users to select exactly one
        option from a group.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>Basic, icon-based, error, and disabled radio groups.</p>
        <div>
          <RadioDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>Built on native HTML input for reliable browser behavior.</li>
        <li>Grouped by name to ensure a single selected value.</li>
        <li>Customizable indicators and visual styles.</li>
        <li>Supports both controlled and uncontrolled usage.</li>
      </ul>

      <p>
        For more details, see the official W3C Radio Group pattern{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/radio/'
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
