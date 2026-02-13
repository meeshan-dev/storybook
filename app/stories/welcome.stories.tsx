import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconExternalLink,
} from '@tabler/icons-react';
import { Button } from '~/components/ui/button';

function Welcome() {
  return (
    <main className='mx-auto min-h-dvh w-full max-w-2xl px-5 py-16'>
      <h1 className='text-3xl font-semibold'>Muhammad Zeeshan</h1>

      <p className='text-muted-foreground mt-2 font-medium'>
        <span className='rounded-md bg-[oklch(0.8343_0.1167_217.91)] px-2 py-0.5 text-black'>
          React
        </span>{' '}
        <span className='rounded-md bg-[oklch(0.5671_0.1399_253.3)] px-2 py-0.5 text-white'>
          TypeScript
        </span>{' '}
        Developer
      </p>

      <div className='my-6 flex items-center gap-2'>
        <Button
          variant='outline'
          size='icon'
          render={
            <a
              href='https://github.com/meeshan-dev'
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconBrandGithub />
            </a>
          }
        />

        <Button
          variant='outline'
          size='icon'
          render={
            <a
              href='https://linkedin.com/in/meeshan-dev'
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconBrandLinkedin />
            </a>
          }
        />

        <Button
          variant='link'
          className=''
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
