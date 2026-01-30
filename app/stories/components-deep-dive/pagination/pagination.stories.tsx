import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import { PaginationOverview } from './pagination-overview';
import { PaginationPreview } from './pagination-preview';
import Pagination_Raw from './pagination?raw';

const meta: Meta = {
  title: 'components-deep-dive/Pagination',
};

export default meta;

export const Overview: StoryObj = {
  decorators: [breadcrumbsDecorator()],
  render: PaginationOverview,
};

export const Preview: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: PaginationPreview,
};

export const Source: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: () => <StorySourceCode>{Pagination_Raw}</StorySourceCode>,
};
