import type { Meta, StoryObj } from '@storybook/react-vite';

function Welcome() {
  return 'welcome';
}

const meta: Meta<typeof Welcome> = {
  title: 'Welcome',
  component: Welcome,
};

export default meta;

export const Default: StoryObj<typeof Welcome> = { name: 'Welcome' };
