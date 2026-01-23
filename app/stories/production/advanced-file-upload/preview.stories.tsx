import preview from '.storybook/preview';
import { setupWorker } from 'msw/browser';
import { AdvancedFileUpload } from './advanced-file-upload';
import { mswHandlers } from './msw-handlers';

const worker = setupWorker(...mswHandlers);

const meta = preview.meta({
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
});

export default meta;

export const Default = meta.story();
