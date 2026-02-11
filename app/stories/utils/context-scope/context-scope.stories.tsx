import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { ContextScopeDemo } from './context-scope-demo';
import sourceCode from './context-scope?raw';

const meta: Meta = {
  title: 'utils/Context Scope',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Context Scope',
  render: () => (
    <div className='story'>
      <h1>Context Scope</h1>

      <p>
        A factory that creates a scoped <code>Provider</code> and a type-safe{' '}
        <code>useScopeCtx</code> hook — eliminating repetitive boilerplate for
        React context.
      </p>

      <h2>Interactive demo</h2>

      <p>
        Three patterns: basic consumption, nested scope overriding, and optional
        (non-throwing) context access.
      </p>

      <hr />

      <ContextScopeDemo />

      <hr />

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          Returns a <code>[ScopeProvider, useScopeCtx]</code> tuple — mirrors
          the familiar <code>createContext</code> / <code>useContext</code> API
        </li>
        <li>
          <strong>Type-safe by default</strong> — the generic parameter infers
          the context shape across provider and consumer
        </li>
        <li>
          Throws with a helpful error message when the context is consumed
          outside a provider (configurable via <code>shouldThrow: false</code>)
        </li>
        <li>
          Supports <strong>nested scoping</strong> — inner providers
          automatically override outer values for their subtree
        </li>
        <li>
          Uses <code>React.use(Context)</code> for modern context consumption
        </li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
