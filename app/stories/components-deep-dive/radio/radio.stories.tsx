import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import { RadioOverview } from './radio-overview';
import { RadioPreview } from './radio-preview';
import Radio_Raw from './radio?raw';

const meta: Meta = {
  title: 'components-deep-dive/Radio',
};

export default meta;

export const Overview: StoryObj = {
  decorators: [breadcrumbsDecorator()],
  render: RadioOverview,
};

export const Preview: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'min-h-dvh' })],
  render: RadioPreview,
};

export const Source: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: () => <StorySourceCode>{Radio_Raw}</StorySourceCode>,
};
