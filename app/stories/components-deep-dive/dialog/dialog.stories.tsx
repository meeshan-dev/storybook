import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import { DialogOverview } from './dialog-overview';
import { DialogPreview } from './dialog-preview';
import Dialog_Raw from './dialog?raw';

const meta: Meta = {
  title: 'components-deep-dive/Dialog',
};

export default meta;

export const Overview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator()],
  render: DialogOverview,
};

export const Preview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator({ className: 'min-h-dvh' })],
  render: DialogPreview,
};

export const Source: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: () => <StorySourceCode>{Dialog_Raw}</StorySourceCode>,
};
