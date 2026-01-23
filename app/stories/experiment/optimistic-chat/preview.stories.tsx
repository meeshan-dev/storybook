import type { Meta, StoryObj } from '@storybook/react-vite';
import { setupWorker } from 'msw/browser';
import { handlers } from './msw-handlers';
import { OptimisticChat } from './optimistic-chat';

const server = setupWorker(...handlers);

const meta: Meta<typeof OptimisticChat> = {
  component: OptimisticChat,
  title: 'Experiment/Optimistic Chat',
  beforeEach: () => {
    server.start();

    return () => {
      server.resetHandlers();
      server.stop();
    };
  },
  tags: ['optimistic ui'],
};

export default meta;

export const Default: StoryObj<typeof meta> = {};
