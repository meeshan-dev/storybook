import { IconChevronDown } from '@tabler/icons-react';
import { Button } from '~/components/ui/button';
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from './accordion';

export function AccordionDemo({
  type,
  isSingleCollapsible,
}: {
  type: 'multiple' | 'single';
  isSingleCollapsible?: boolean;
}) {
  return (
    <div className='mx-auto flex w-full max-w-md flex-col'>
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
              {(props) => (
                <Button
                  {...props}
                  variant='ghost'
                  className='group w-full py-5'
                >
                  {title}

                  <IconChevronDown
                    size={20}
                    className='ml-auto rotate-0 transition-transform group-data-[expanded=true]:-rotate-180'
                  />
                </Button>
              )}
            </AccordionTrigger>

            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              pariatur vitae consectetur ullam repellendus illo
            </AccordionContent>

            <hr className='border-ring/20 last:hidden' />
          </AccordionItem>
        ))}
      </AccordionRoot>
    </div>
  );
}
