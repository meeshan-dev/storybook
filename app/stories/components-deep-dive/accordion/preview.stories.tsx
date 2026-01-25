import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconChevronDown } from '@tabler/icons-react';
import { breadcrumbsDecorator } from '~/lib/breadcrumbs-decorator';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '.';

const meta: Meta = {
  title: 'components-deep-dive/Accordion',
};

export default meta;

const PreviewComp = () => {
  return (
    <main className='flex grow items-center justify-center py-10'>
      <section className='w-full max-w-lg'>
        <AccordionRoot defaultValue={['accordion-item-1']}>
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
              <AccordionHeader>
                <AccordionTrigger>
                  <span>{title}</span>

                  <IconChevronDown
                    size={20}
                    className='ml-auto rotate-0 transition-transform group-data-[expanded=true]/accordion-trigger:-rotate-180'
                  />
                </AccordionTrigger>
              </AccordionHeader>

              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
                pariatur vitae consectetur ullam repellendus illo suscipit
                perspiciatis at maxime neque exercitationem qui doloribus
                architecto reiciendis modi debitis aliquid, ex id!
              </AccordionContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
      </section>
    </main>
  );
};

export const Preview: StoryObj<typeof meta> = {
  decorators: [breadcrumbsDecorator()],
  render: PreviewComp,
};
