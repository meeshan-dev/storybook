import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '~/components/ui/badge';

function Welcome() {
  return (
    <main className='flex min-h-dvh flex-col items-center justify-center p-5 text-center'>
      <h1 className='text-3xl font-semibold text-balance'>
        Meeshan.dev Storybook
      </h1>

      <p className='mt-3 text-center text-balance'>
        Welcome to the hub of my experience.
      </p>

      <div className='max-w-md'>
        <hr className='border-foreground my-5' />

        <p className='text-center text-sm text-balance'>
          <Badge>Tip</Badge> Start with the <strong>Overview</strong> tab to
          understand the context before exploring the preview.
        </p>
      </div>
    </main>
  );
}

const meta: Meta<typeof Welcome> = {
  title: 'Welcome',
  component: Welcome,
};

export default meta;

export const Default: StoryObj<typeof Welcome> = { name: 'Welcome' };
