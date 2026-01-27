import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import { AlertDialogOverview } from './alert-dialog-overview';
import { AlertDialogPreview } from './alert-dialog-preview';
import AlertDialog_Raw from './alert-dialog?raw';

const meta: Meta = {
  title: 'components-deep-dive/Alert Dialog',
};

export default meta;

export const Overview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator()],
  render: AlertDialogOverview,
};

export const Preview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator({ className: 'min-h-dvh' })],
  render: AlertDialogPreview,
};

export const Source: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: () => <StorySourceCode>{AlertDialog_Raw}</StorySourceCode>,
};
