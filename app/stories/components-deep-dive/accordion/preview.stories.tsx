import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconChevronDown } from '@tabler/icons-react';
import { Badge } from '~/components/ui/badge';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '.';

const meta: Meta = {
  title: 'components-deep-dive/Accordion',
};

export default meta;

function AccordionExample({
  type,
  isSingleCollapsible,
}: {
  type: 'multiple' | 'single';
  isSingleCollapsible?: boolean;
}) {
  return (
    <div className='bg-secondary w-full max-w-xl rounded-lg p-3'>
      <Badge className='mb-3'>
        {(() => {
          if (type === 'multiple') {
            return 'Multiple item expansion';
          }

          if (type === 'single' && isSingleCollapsible === true) {
            return 'Single item expansion (collapsible)';
          }

          if (type === 'single' && isSingleCollapsible === false) {
            return 'Single item expansion (non-collapsible)';
          }

          return '';
        })()}
      </Badge>

      <AccordionRoot
        {...({
          defaultValue: type === 'multiple' ? ['1'] : '1',
          isSingleCollapsible: isSingleCollapsible,
          type: type === 'multiple' ? 'multiple' : 'single',
        } as object)}
      >
        {[
          {
            id: 1,
            title: 'Accordion no. 1 with dummy content',
          },
          {
            id: 2,
            title: 'Accordion no. 2 with dummy content',
          },
          {
            id: 3,
            title: 'Accordion no. 3 with dummy content',
            disabled: true,
          },
          {
            id: 4,
            title: 'Accordion no. 4 with dummy content',
          },
        ].map(({ id, title, disabled }) => (
          <AccordionItem key={id} value={`${id}`} disabled={disabled}>
            <AccordionTrigger headingLevel='h2'>
              {title}
              <IconChevronDown
                size={20}
                className='ml-auto rotate-0 transition-transform group-data-[expanded=true]/accordion-trigger:-rotate-180'
              />
            </AccordionTrigger>

            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              pariatur vitae consectetur ullam repellendus illo suscipit
              perspiciatis at maxime neque exercitationem qui doloribus
              architecto reiciendis modi debitis aliquid, ex id!
            </AccordionContent>

            <hr className='border-ring/10 last:hidden' />
          </AccordionItem>
        ))}
      </AccordionRoot>
    </div>
  );
}

const PreviewComp = () => {
  return (
    <main className='flex grow items-center justify-center py-10'>
      <section>
        <AccordionExample type='multiple' />
        <div className='mt-5' />
        <AccordionExample type='single' isSingleCollapsible />
        <div className='mt-5' />
        <AccordionExample type='single' isSingleCollapsible={false} />
      </section>
    </main>
  );
};

export const Preview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator({ className: 'min-h-dvh' })],
  render: PreviewComp,
};
