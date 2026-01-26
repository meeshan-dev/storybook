import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import { AccordionOverview } from './accordion-overview';
import { AccordionPreview } from './accordion-preview';
import Accordion_Raw from './accordion.tsx?raw';

const meta: Meta = {
  title: 'components-deep-dive/Accordion',
};

export default meta;

export const Overview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator()],
  render: AccordionOverview,
};

export const Preview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator({ className: 'min-h-dvh' })],
  render: AccordionPreview,
};

export const SourceCode: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator({ className: 'h-dvh' })],
  render: () => <StorySourceCode>{Accordion_Raw}</StorySourceCode>,
};
