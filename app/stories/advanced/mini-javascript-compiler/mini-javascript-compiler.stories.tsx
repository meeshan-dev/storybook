import type { Meta, StoryObj } from '@storybook/react-vite';
import { MiniJavaScriptCompilerDemo } from './mini-javascript-compiler-demo';

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
          JavaScript compiler from scratch focused on tokenization, parsing, and
          code generation for modern browsers.
        </p>

        <h2>Interactive Demo</h2>

        <hr />

        <MiniJavaScriptCompilerDemo />

        <hr />
      </div>
    );
  },
};
