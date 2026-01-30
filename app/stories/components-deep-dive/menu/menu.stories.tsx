import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import { MenuOverview } from './menu-overview';
import { MenuPreview } from './menu-preview';
import Menu_Raw from './menu?raw';

const meta: Meta = {
  title: 'components-deep-dive/Menu',
};

export default meta;

export const Overview: StoryObj = {
  decorators: [breadcrumbsDecorator()],
  render: MenuOverview,
};

export const Preview: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: MenuPreview,
};

export const Source: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: () => <StorySourceCode>{Menu_Raw}</StorySourceCode>,
};
