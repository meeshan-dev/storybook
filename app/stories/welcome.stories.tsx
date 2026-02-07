import type { Meta, StoryObj } from '@storybook/react-vite';

function Welcome() {
  return (
    <main className='min-h-dvh content-center px-5 py-16'>
      <div className='typography mx-auto w-full max-w-lg'>
        <h1>Meeshan.dev Storybook</h1>

        <p>
          Frontend developer focused on accessibility and complex UI systems.
        </p>

        <p>
          This storybook showcases my expertise through accessible components,
          complex features, creative experiments, and reusable hooks.
        </p>

        <p>Click any section in the sidebar to explore.</p>

        <h2 className='text-xl'>Advanced Stories</h2>

        <p>
          Complex features tackling real-world challenges. Built to demonstrate
          handling of scale, performance, and edge cases.
        </p>

        <h2 className='text-xl'>Components Deep Dive</h2>

        <p>
          Hand-built accessible UI components following W3C ARIA patterns.
          Focused on internal mechanics and accessibility — no external
          libraries.
        </p>

        <h2 className='text-xl'>Experimental Stories</h2>

        <p>
          Creative explorations pushing boundaries. Ideas explored fast, focused
          on learning and experimentation.
        </p>

        <h2 className='text-xl'>Hooks</h2>

        <p>
          Reusable custom React hooks focused on solving specific UI problems in
          a clean, composable way.
        </p>

        <hr className='border-foreground' />

        <p className='text-muted-foreground text-sm'>
          Built with React, TypeScript, and Tailwind CSS.
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
