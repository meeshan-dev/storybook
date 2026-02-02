import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { SwitchDemo } from './switch-demo';
import sourceCode from './switch?raw';

const meta: Meta = {
  title: 'components-deep-dive/Switch',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Switch',
  render: () => (
    <div className='story typography'>
      <h1>Switch</h1>

      <p>
        A switch is a form control that lets users toggle a single option on or
        off.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>Basic switch, icon switch, and disabled states.</p>
        <div>
          <SwitchDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>Built on native HTML input for reliable accessibility.</li>
        <li>Represents a clear on/off state.</li>
        <li>Customizable on/off icons.</li>
        <li>Supports both controlled and uncontrolled usage.</li>
      </ul>

      <p>
        For more details, see the official W3C Switch pattern{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/switch/'
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
