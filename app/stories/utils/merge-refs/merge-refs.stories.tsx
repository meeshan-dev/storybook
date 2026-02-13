import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { MergeRefsDemo } from './merge-refs-demo';
import sourceCode from './merge-refs?raw';

const meta: Meta = {
  title: 'utils/Merge Refs',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Merge Refs',
  render: () => (
    <div className='story'>
      <h1>Merge Refs</h1>

      <p>
        Combines multiple React refs (object refs and callback refs) into a
        single callback ref that forwards the element to all of them.
      </p>

      <h2>Interactive demo</h2>

      <p>
        See how <code>mergeRefs</code> lets multiple refs point to the same DOM
        element.
      </p>

      <hr />

      <MergeRefsDemo />

      <hr />

      <h2>Fearutes</h2>

      <ul>
        <li>
          Accepts a variadic list of <code>React.Ref&lt;T&gt;</code>,{' '}
          <code>state setter</code>, <code>null</code>, or{' '}
          <code>undefined</code>, where <code>T extends HTMLElement</code>
        </li>
        <li>
          Returns a single <strong>callback ref</strong> that dispatches the
          element (or <code>null</code>) to every provided ref
        </li>
        <li>
          Safely skips <code>null</code> and <code>undefined</code> refs; no
          guards needed at the call site
        </li>
        <li>
          Handles both <strong>object refs</strong> (assigns{' '}
          <code>ref.current</code>) and <strong>callback refs</strong> (invokes
          the function)
        </li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
