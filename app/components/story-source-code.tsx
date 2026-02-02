import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';

SyntaxHighlighter.registerLanguage('tsx', tsx);

export function StorySourceCode({ children }: { children: string }) {
  return (
    <>
      <h2>Source Code</h2>

      <div className='mt-3 flex max-h-[80vh] overflow-hidden rounded-lg'>
        <SyntaxHighlighter
          language='tsx'
          style={dracula}
          showLineNumbers
          customStyle={{
            margin: 0,
            borderRadius: 0,
            colorScheme: 'dark',
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </>
  );
}
