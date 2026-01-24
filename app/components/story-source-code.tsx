import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';

SyntaxHighlighter.registerLanguage('tsx', tsx);

export function StorySourceCode({ children }: { children: string }) {
  return (
    <main className='flex grow overflow-auto rounded-lg'>
      <SyntaxHighlighter
        language='tsx'
        style={dracula}
        showLineNumbers
        customStyle={{
          margin: 0,
          borderRadius: 0,
          colorScheme: 'dark',
          overflow: 'auto',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </main>
  );
}
