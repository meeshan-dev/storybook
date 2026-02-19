import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconCheck,
  IconCopy,
  IconExternalLink,
} from '@tabler/icons-react';
import { Copy } from '~/components/copy';
import { Button } from '~/components/ui/button';

function Welcome() {
  return (
    <main className='mx-auto min-h-dvh w-full max-w-2xl px-5 py-16'>
      <h1 className='mt-4 text-2xl font-medium text-balance'>
        Muhammad Zeeshan
      </h1>

      <p className='*:bg-foreground/10 mt-2 space-x-1 text-lg font-medium *:rounded-md *:border *:border-transparent *:px-2 *:py-0.5 *:text-sm *:font-medium *:data-highlight:border-sky-600 dark:*:data-highlight:border-sky-400'>
        <span className='sr-only'>Tech stack: </span>
        <span data-highlight>Next.js</span> <span data-highlight>Remix</span>{' '}
        <span data-highlight>Playwright</span>
      </p>

      <div className='my-6 flex flex-wrap items-center gap-2'>
        {[
          {
            name: 'GitHub',
            link: 'https://github.com/meeshan-dev',
            icon: <IconBrandGithub className='size-5' />,
          },
          {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/meeshan-dev/',
            icon: <IconBrandLinkedin className='size-5' />,
          },
        ].map((item) => (
          <Button
            key={item.name}
            variant='secondary'
            size='icon-sm'
            nativeButton={false}
            render={
              <a
                key={item.name}
                href={item.link}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`Visit my ${item.name} profile (opens in new tab)`}
              >
                {item.icon}
              </a>
            }
          />
        ))}

        <Copy textToCopy='hire@meeshan.dev'>
          {({ onClick, isCopied }) => (
            <Button
              onClick={onClick}
              variant='link'
              className='gap-0'
              aria-label={
                isCopied
                  ? 'Email address hire@meeshan.dev copied to clipboard'
                  : 'Copy email address hire@meeshan.dev to clipboard'
              }
              aria-live='polite'
            >
              <span className='font-bold text-emerald-600 dark:text-emerald-400'>
                hire
              </span>
              <span className='text-center text-sm'>@meeshan.dev</span>

              {isCopied ? (
                <IconCheck className='ml-2' />
              ) : (
                <IconCopy className='text-muted-foreground ml-2' />
              )}
            </Button>
          )}
        </Copy>

        <Button
          variant='link'
          className=''
          nativeButton={false}
          render={
            <a
              href='https://meeshan.dev'
              target='_blank'
              rel='noopener noreferrer'
            >
              View my portfolio
              <IconExternalLink />
            </a>
          }
        />
      </div>

      <p className='mt-6'>
        Explore engineering deep dives, W3C-compliant components, advanced UI
        patterns, custom hooks, utils and creative experiments.
      </p>

      <p className='text-muted-foreground border-foreground/50 mt-6 border-l-2 pl-4'>
        Each story includes interactive demos, implementation insights, and
        source code you can learn from.
      </p>

      <h2 className='mt-6 text-lg'>Advanced Patterns</h2>

      <p className='text-muted-foreground mt-3'>
        Complex features tackling real-world challenges. Built to demonstrate
        handling of scale, performance, and edge cases.
      </p>

      <h2 className='mt-10 text-lg'>Components Deep Dive</h2>

      <p className='text-muted-foreground mt-3'>
        Hand built accessible UI components following W3C ARIA patterns. Focused
        on internal mechanics and accessibility; no external libraries.
      </p>

      <h2 className='mt-10 text-lg'>Hooks</h2>

      <p className='text-muted-foreground mt-3'>
        React hooks focused on solving specific UI problems in a clean,
        composable way.
      </p>

      <h2 className='mt-10 text-lg'>Utils</h2>

      <p className='text-muted-foreground mt-3'>
        Utility functions and helpers for various tasks, promoting code reuse
        and consistency across projects.
      </p>

      <h2 className='mt-10 text-lg'>Experimental Stories</h2>

      <p className='text-muted-foreground mt-3'>
        Creative explorations pushing boundaries. Ideas explored fast, focused
        on learning and experimentation.
      </p>
    </main>
  );
}

const meta: Meta<typeof Welcome> = {
  title: 'Welcome',
  component: Welcome,
};

export default meta;

export const Default: StoryObj<typeof Welcome> = { name: 'Welcome' };
