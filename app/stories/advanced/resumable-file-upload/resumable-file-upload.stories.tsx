import type { Meta, StoryObj } from '@storybook/react-vite';
import { setupWorker } from 'msw/browser';
import { StorySourceCode } from '~/components/story-source-code';
import { mswHandlers } from './msw-handlers';
import { ResumableFileUploadDemo } from './resumable-file-upload-demo';
import sourceCode from './resumable-file-upload-demo?raw';

const meta: Meta = {
  title: 'Advanced/Resumable File Upload',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Resumable File Upload',
  beforeEach: () => {
    const worker = setupWorker(...mswHandlers);

    worker.start();

    return () => {
      worker.resetHandlers();
      worker.stop();
    };
  },
  render: () => (
    <div className='story typography'>
      <h1>Resumable File Upload</h1>

      <p>
        A production-ready file upload system designed for reliability, control,
        and clear user feedback. This goes beyond basic uploads and handles
        real-world scenarios.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>Select files to upload and test pause, resume, and cancel.</p>
        <div>
          <ResumableFileUploadDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>Support for selecting multiple files.</li>
        <li>Real-time upload progress visibility.</li>
        <li>Pause and resume functionality.</li>
        <li>Ability to cancel uploads while in progress.</li>
        <li>Strong error handling with retry support.</li>
      </ul>

      <h2>Preview Notes</h2>

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

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
