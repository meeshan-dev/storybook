import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import { DisclosureOverview } from './disclosure-overview';
import { DisclosurePreview } from './disclosure-preview';
import Disclosure_Raw from './disclosure?raw';

const meta: Meta = {
  title: 'components-deep-dive/Disclosure',
};

export default meta;

export const Overview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator()],
  render: DisclosureOverview,
};

export const Preview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator({ className: 'min-h-dvh' })],
  render: DisclosurePreview,
};

export const SourceCode: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: () => <StorySourceCode>{Disclosure_Raw}</StorySourceCode>,
};
