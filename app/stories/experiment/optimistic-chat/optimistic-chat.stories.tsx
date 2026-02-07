import type { Meta, StoryObj } from '@storybook/react-vite';
import { setupWorker } from 'msw/browser';
import { StorySourceCode } from '~/components/story-source-code';
import { handlers } from './msw-handlers';
import { OptimisticChatDemo } from './optimistic-chat-demo';
import sourceCode from './optimistic-chat-demo?raw';

const meta: Meta = {
  title: 'experiment/Optimistic Chat',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Optimistic Chat',
  beforeEach: () => {
    const worker = setupWorker(...handlers);

    worker.start();

    return () => {
      worker.resetHandlers();
      worker.stop();
    };
  },
  render: () => (
    <div className='story typography'>
      <h1>Optimistic Chat</h1>

      <p>
        An experimental implementation exploring optimistic UI patterns for a
        chat interface. Messages appear instantly while being sent in the
        background.
      </p>

      <div className='story-demo not-typography'>
        <h2>Interactive demo</h2>
        <p>Send messages to see optimistic updates in action.</p>
        <div>
          <OptimisticChatDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>Instant message rendering before server confirmation.</li>
        <li>Visual status indicators for sending, sent, and error states.</li>
        <li>Retry mechanism for failed messages.</li>
        <li>Automatic scroll to latest message.</li>
      </ul>

      <h2>Warning</h2>

      <p>
        ⚠️ This is experimental code for exploring optimistic UI patterns. Not
        intended for production use.
      </p>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
