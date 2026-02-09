import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { generate, parse, tokenize } from './mini-javascript-compiler';

export function MiniJavaScriptCompilerDemo() {
  const [value, setValue] = useState(
    `let x = 10;\nconst y = 20;\nlet z = x + y;`,
  );

  return (
    <section data-demo>
      <Editor
        language='javascript'
        height='40vh'
        loading={
          <div className='bg-secondary h-full w-full content-center rounded-lg text-center text-sm'>
            Loading Editor...
          </div>
        }
        value={value}
        onChange={(newValue) => {
          setValue(newValue || '');
        }}
        theme='vs-dark'
        className='overflow-hidden rounded-lg'
        options={{
          contextmenu: false,
          minimap: { enabled: false },
          padding: { top: 8, bottom: 8 },
        }}
      />

      <Output code={value} />
    </section>
  );
}

function Output({ code }: { code: string }) {
  let output: string = '';
  let error: string | null = null;

  try {
    const tokens = tokenize(code);
    const ast = parse(tokens);
    const generated = generate(ast);

    output = generated;
  } catch (e) {
    console.error(e);
    error = (e as Error).message;
  }

  return (
    <div className='bg-secondary mt-4 min-h-10 content-center rounded-lg p-2'>
      {error ? (
        <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
      ) : (
        <pre className='text-sm text-green-600 dark:text-green-400'>
          <code>{output}</code>
        </pre>
      )}
    </div>
  );
}
