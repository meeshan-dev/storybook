import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { UseOnClickOutsideDemo } from './use-on-click-outside-demo';
import sourceCode from './use-on-click-outside?raw';

const meta: Meta = {
  title: 'hooks/useOnClickOutside',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'useOnClickOutside',
  render: () => (
    <div className='story'>
      <h1>useOnClickOutside</h1>

      <p>
        Invokes a callback when a click, touch, or focus event occurs outside
        the referenced element. Commonly used for closing dropdowns, popovers,
        and modals.
      </p>

      <h2>Interactive demo</h2>

      <p>
        Click inside the blue box vs the surrounding area to see it in action
      </p>

      <hr />

      <UseOnClickOutsideDemo />

      <hr />

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          Supports <strong>single refs</strong> and{' '}
          <strong>arrays of refs</strong> for multi-element boundaries
        </li>
        <li>
          Configurable event type: <code>mousedown</code>, <code>mouseup</code>,{' '}
          <code>touchstart</code>, <code>touchend</code>, <code>focusin</code>,{' '}
          <code>focusout</code>
        </li>
        <li>
          Accepts custom <code>AddEventListenerOptions</code> for passive /
          capture control
        </li>
        <li>
          Ignores clicks on disconnected DOM nodes to prevent false positives
        </li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
