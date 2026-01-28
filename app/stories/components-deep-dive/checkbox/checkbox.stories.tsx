import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import { CheckboxOverview } from './checkbox-overview';
import { CheckboxPreview } from './checkbox-preview';
import Checkbox_Raw from './checkbox?raw';

const meta: Meta = {
  title: 'components-deep-dive/checkbox',
};

export default meta;

export const Overview: StoryObj = {
  decorators: [breadcrumbsDecorator()],
  render: CheckboxOverview,
};

export const Preview: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: CheckboxPreview,
};

export const Source: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: () => <StorySourceCode>{Checkbox_Raw}</StorySourceCode>,
};
