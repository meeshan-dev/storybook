import type { Meta, StoryObj } from '@storybook/react-vite';
import { setupWorker } from 'msw/browser';
import { StorySourceCode } from '~/components/story-source-code';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import { mswHandlers } from './msw-handlers';
import { ResumableFileUploadOverview } from './resumable-file-upload-overview';
import { ResumableFileUploadPreview } from './resumable-file-upload-preview';
import ResumableFileUpload_Raw from './resumable-file-upload-preview?raw';

const meta: Meta<typeof ResumableFileUploadPreview> = {
  title: 'Advanced/Resumable File Upload',
  tags: ['file upload'],
};

export default meta;

export const Overview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator()],
  render: ResumableFileUploadOverview,
};

export const Preview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: ResumableFileUploadPreview,
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
  render: () => <StorySourceCode>{ResumableFileUpload_Raw}</StorySourceCode>,
};
