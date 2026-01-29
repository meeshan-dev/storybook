import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import { TooltipOverview } from './tooltip-overview';
import { TooltipPreview } from './tooltip-preview';
import Tooltip_Raw from './tooltip?raw';

const meta: Meta = {
  title: 'components-deep-dive/Tooltip',
};

export default meta;

export const Overview: StoryObj = {
  decorators: [breadcrumbsDecorator()],
  render: TooltipOverview,
};

export const Preview: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: TooltipPreview,
};

export const Source: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: () => <StorySourceCode>{Tooltip_Raw}</StorySourceCode>,
};
