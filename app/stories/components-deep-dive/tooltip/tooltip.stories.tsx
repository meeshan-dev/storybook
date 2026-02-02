import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { TooltipDemo } from './tooltip-demo';
import sourceCode from './tooltip?raw';

const meta: Meta = {
  title: 'components-deep-dive/Tooltip',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Tooltip',
  render: () => (
    <div className='story typography'>
      <h1>Tooltip</h1>

      <p>
        The Tooltip component displays contextual information when users hover
        or focus an element. It is designed to be lightweight, accessible, and
        predictable across mouse and keyboard interactions.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>
          Default tooltip, keyboard focus only, hover only, and interactive
          tooltips.
        </p>
        <div>
          <TooltipDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>Supports hover, focus, or combined triggers.</li>
        <li>Keyboard accessible with Escape key dismissal.</li>
        <li>Configurable show and hide delays.</li>
        <li>Interactive tooltips that remain open on hover.</li>
        <li>Automatic positioning with collision handling.</li>
        <li>Single-tooltip visibility to prevent overlap.</li>
        <li>Disabled state support.</li>
      </ul>

      <h2>Accessibility</h2>

      <ul>
        <li>
          Uses <code>role="tooltip"</code> for assistive technologies.
        </li>
        <li>Opens on keyboard focus by default.</li>
        <li>Closes on Escape key.</li>
        <li>Does not trap focus.</li>
      </ul>

      <p>
        For more details, see the official W3C Tooltip pattern{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/'
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
