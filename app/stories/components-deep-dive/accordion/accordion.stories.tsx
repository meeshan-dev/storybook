import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { AccordionDemo } from './accordion-demo';
import sourceCode from './accordion?raw';

const meta: Meta = {
  title: 'components-deep-dive/Accordion',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Accordion',
  render: () => (
    <div className='story typography'>
      <h1>Accordion</h1>

      <p>
        The Accordion component is fully accessible and follows the WAI-ARIA
        Authoring Practices. It supports keyboard navigation and screen readers,
        ensuring an inclusive and predictable user experience.
      </p>

      <p>
        Before interacting with the demos, make sure to review the W3C Accordion{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/accordion/#keyboardinteraction'
          target='_blank'
        >
          keyboard interaction guidelines
        </a>
        .
      </p>

      <div className='story-demo not-typography'>
        <h2>Multiple</h2>
        <p>Allows multiple panels to be expanded at the same time.</p>
        <div>
          <AccordionDemo type='multiple' />
        </div>
      </div>

      <div className='story-demo not-typography'>
        <h2>Single (collapsible)</h2>
        <p>The active panel can be toggled open and closed.</p>
        <div>
          <AccordionDemo type='single' isSingleCollapsible />
        </div>
      </div>

      <div className='story-demo not-typography'>
        <h2>Single (non-collapsible)</h2>
        <p>
          Once a panel is opened, it cannot be closed by clicking the header
          again.
        </p>
        <div>
          <AccordionDemo type='single' isSingleCollapsible={false} />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>Supports both single and multiple expansion modes.</li>
        <li>Optional non-collapsible behavior for individual items.</li>
        <li>
          Full keyboard support, including <code>Up</code>/<code>Down</code>{' '}
          arrows, <code>Home</code>/<code>End</code>, and <code>Tab</code>{' '}
          navigation.
        </li>
        <li>
          Smooth open and close animations powered by <code>motion/react</code>.
        </li>
      </ul>

      <p>
        For more details, see the official W3C Accordion pattern{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/accordion/'
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
