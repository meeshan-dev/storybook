import preview from '.storybook/preview';
import { setupWorker } from 'msw/browser';
import { handlers } from './msw-handlers';
import { OptimisticChat } from './optimistic-chat';

const server = setupWorker(...handlers);

const meta = preview.meta({
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
});

export default meta;

export const Default = meta.story({});
