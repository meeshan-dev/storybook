import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import { ToggleButtonOverview } from './toggle-button-overview';
import { ToggleButtonPreview } from './toggle-button-preview';
import ToggleButton_Raw from './toggle-button?raw';

const meta: Meta = {
  title: 'components-deep-dive/Toggle Button',
};

export default meta;

export const Overview: StoryObj = {
  decorators: [breadcrumbsDecorator()],
  render: ToggleButtonOverview,
};

export const Preview: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: ToggleButtonPreview,
};

export const Source: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: () => <StorySourceCode>{ToggleButton_Raw}</StorySourceCode>,
};
