import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import { ComboboxOverview } from './combobox-overview';
import { ComboboxPreview } from './combobox-preview';
import Combobox_Raw from './combobox?raw';

const meta: Meta = {
  title: 'components-deep-dive/Combobox',
};

export default meta;

export const Overview: StoryObj = {
  decorators: [breadcrumbsDecorator()],
  render: ComboboxOverview,
};

export const Preview: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: ComboboxPreview,
};

export const Source: StoryObj = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: () => <StorySourceCode>{Combobox_Raw}</StorySourceCode>,
};
