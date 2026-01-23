import type { Meta, StoryObj } from '@storybook/react-vite';
import { setupWorker } from 'msw/browser';
import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';
import { AdvancedFileUpload } from './advanced-file-upload';
import { mswHandlers } from './msw-handlers';

const worker = setupWorker(...mswHandlers);

const meta: Meta<typeof AdvancedFileUpload> = {
  component: AdvancedFileUpload,
  title: 'Production/Advanced File Upload',
  tags: ['file upload'],
  beforeEach: () => {
    worker.start();

    return () => {
      worker.resetHandlers();
      worker.stop();
    };
  },
};

export default meta;

const OverviewComp = () => {
  return (
    <StoryOverviewWrapper>
      <h1>Advanced File Upload</h1>

      <p>
        A production-ready file upload system designed for reliability, control,
        and clear user feedback. This goes beyond basic uploads and handles
        real-world scenarios.
      </p>

      <h2>Key Features</h2>

      <ul>
        <li>Support for selecting multiple files</li>
        <li>Real-time upload progress visibility</li>
        <li>Pause and resume functionality</li>
        <li>Ability to cancel uploads while in progress</li>
        <li>Strong error handling with retry support</li>
      </ul>

      <h2>Preview Notes and Limitations</h2>

      <p>
        This preview relies on Mock Service Worker (MSW) to simulate network
        requests. As a result, actual network behavior such as latency and
        throughput may differ from a live backend.
      </p>

      <p>
        Files are not stored on a server. Upload state lives in an in-memory
        JavaScript <code>Map</code>, so refreshing the page will reset all
        uploads.
      </p>

      <p>
        The core upload logic is production-ready. Only the persistence layer is
        mocked for preview and demonstration purposes.
      </p>
    </StoryOverviewWrapper>
  );
};

export const Overview: StoryObj<typeof meta> = {
  render: () => <OverviewComp />,
};

export const Preview: StoryObj<typeof meta> = {};
