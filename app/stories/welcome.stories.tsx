import type { Meta, StoryObj } from '@storybook/react-vite';

function Welcome() {
  return (
    <main className='flex min-h-dvh flex-col items-center justify-center p-5 text-center'>
      <h1 className='text-3xl font-semibold text-balance'>
        Meeshan.dev Storybook
      </h1>

      <p className='mt-3 text-center text-balance'>
        Welcome to the hub of my experience. This space brings together my
        production implementations, experiments, and ongoing work, all shown
        through real, working code.
      </p>

      <p className='mt-7 max-w-md p-2 text-center text-sm text-balance'>
        Tip. Start with the <strong>Overview</strong> tab to understand the
        context before exploring the preview.
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
