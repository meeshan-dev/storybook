import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { DisclosureDemo } from './disclosure-demo';
import sourceCode from './disclosure?raw';

const meta: Meta = {
  title: 'components-deep-dive/Disclosure',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Disclosure',
  render: () => (
    <div className='story typography'>
      <h1>Disclosure</h1>

      <p>
        The Disclosure component is fully accessible and follows the WAI-ARIA
        Authoring Practices. It supports keyboard navigation and screen readers
        to deliver an inclusive user experience.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>Multiple, single collapsible, and single non-collapsible modes.</p>
        <div>
          <DisclosureDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>Supports both single and multiple item open modes.</li>
        <li>Individual items can be configured to be non-collapsible.</li>
        <li>
          Smooth open and close animations powered by <code>motion/react</code>.
        </li>
        <li>
          State management with support for externally controlled open and
          closed states.
        </li>
      </ul>

      <p>
        For more details, see the official W3C Disclosure pattern{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/'
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
