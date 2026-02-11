import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { UseControlledDemo } from './use-controlled-demo';
import sourceCode from './use-controlled?raw';

const meta: Meta = {
  title: 'hooks/use Controlled',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'use Controlled',
  render: () => (
    <div className='story'>
      <h1>use Controlled</h1>

      <p>
        A hook that allows a component to be either controlled or uncontrolled.
        It manages internal state when no controlled value is provided, and
        delegates to the parent when one is.
      </p>

      <h2>Interactive demo</h2>

      <p>Two modes demonstrating controlled vs uncontrolled behavior</p>

      <hr />

      <UseControlledDemo />

      <hr />

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          Supports both <strong>controlled</strong> and{' '}
          <strong>uncontrolled</strong> modes via a single API
        </li>
        <li>
          Uses a stable reference for the internal state setter to avoid
          unnecessary re-renders
        </li>
        <li>
          Accepts <code>React.SetStateAction&lt;T&gt;</code> so callers can pass
          a value or an updater function
        </li>
        <li>
          Returns a tuple <code>[value, setValue]</code> matching the{' '}
          <code>useState</code> signature
        </li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
