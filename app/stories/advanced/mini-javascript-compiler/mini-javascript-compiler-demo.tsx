import Editor from '@monaco-editor/react';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
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
  let tokens;
  let ast;
  let output: string = '';
  let error: string | null = null;

  try {
    tokens = tokenize(code);
    ast = parse(tokens);
    output = generate(ast);
  } catch (e) {
    console.error(e);
    error = (e as Error).message;
  }

  return (
    <>
      <p className='text-muted-foreground mt-4 text-sm font-semibold'>
        Output:
      </p>

      <div className='bg-secondary mt-2 content-center rounded-lg px-5 py-3'>
        {error ? (
          <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
        ) : (
          <pre className='text-sm text-green-600 dark:text-green-400'>
            <code>{output}</code>
          </pre>
        )}
      </div>

      <Accordion className='mt-4 space-y-4'>
        <AccordionItem value='tokens' className='rounded-md border'>
          <AccordionTrigger className='px-3'>View Tokens</AccordionTrigger>

          <AccordionContent className='text-muted-foreground flex max-h-[30vh] overflow-hidden rounded-b-md border-t p-0 text-sm'>
            <pre className='grow overflow-auto rounded-b-md p-5'>
              <code>{JSON.stringify(tokens, null, 2)}</code>
            </pre>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='ast' className='rounded-md border'>
          <AccordionTrigger className='px-3'>View AST</AccordionTrigger>

          <AccordionContent className='text-muted-foreground flex max-h-[30vh] overflow-hidden rounded-b-md border-t p-0 text-sm'>
            <pre className='grow overflow-auto rounded-b-md p-5'>
              <code>{JSON.stringify(ast, null, 2)}</code>
            </pre>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
