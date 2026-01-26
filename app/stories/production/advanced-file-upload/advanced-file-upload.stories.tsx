import type { Meta, StoryObj } from '@storybook/react-vite';
import { setupWorker } from 'msw/browser';
import { StorySourceCode } from '~/components/story-source-code';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import { AdvancedFileUploadOverview } from './advanced-file-upload-overview';
import { AdvancedFileUploadPreview } from './advanced-file-upload-preview';
import AdvancedFileUpload_Raw from './advanced-file-upload-preview?raw';
import { mswHandlers } from './msw-handlers';

const meta: Meta<typeof AdvancedFileUploadPreview> = {
  title: 'Production/Advanced File Upload',
  tags: ['file upload'],
};

export default meta;

export const Overview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator()],
  render: AdvancedFileUploadOverview,
};

export const Preview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: AdvancedFileUploadPreview,
  beforeEach: () => {
    const worker = setupWorker(...mswHandlers);

    worker.start();

    return () => {
      worker.resetHandlers();
      worker.stop();
    };
  },
};

export const SourceCode: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: () => <StorySourceCode>{AdvancedFileUpload_Raw}</StorySourceCode>,
};
