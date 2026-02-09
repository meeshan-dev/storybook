import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { MiniJavaScriptCompilerDemo } from './mini-javascript-compiler-demo';
import sourceCode from './mini-javascript-compiler.ts?raw';

const meta: Meta = {
  title: 'advanced/Mini JavaScript Compiler',
};

export default meta;

export const Default: StoryObj = {
  name: 'Mini JavaScript Compiler',
  render: () => {
    return (
      <div className='story'>
        <h1>Mini JavaScript Compiler</h1>

        <p>
          I wanted to truly understand how JavaScript works under the hood, so I
          built a compiler from scratch. No libraries, no shortcuts, just pure
          TypeScript implementing the core concepts: tokens, parsing into an
          AST, and code generation.
        </p>

        <h2>Interactive Demo</h2>

        <p>
          Edit the code below. You can use <code>let</code> and{' '}
          <code>const</code> declarations with basic math operators (
          <code>+ - * /</code>). Watch how the tokens and AST update in real
          time or break something and see the error handling in action.
        </p>

        <hr />

        <MiniJavaScriptCompilerDemo />

        <hr />

        <h2>Why This Matters</h2>

        <p>
          Building a compiler taught me how languages actually work. The
          tokenizer breaks code into meaningful chunks, the parser builds a tree
          structure that represents the program's logic, and the generator
          transforms that tree back into executable code. These aren't just
          academic concepts, understanding them makes me a better debugger and
          helps me write cleaner, more intentional code.
        </p>

        <StorySourceCode>{sourceCode}</StorySourceCode>
      </div>
    );
  },
};
