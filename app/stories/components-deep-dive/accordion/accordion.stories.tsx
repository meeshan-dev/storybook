import { IconChevronDown } from '@tabler/icons-react';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from './';

const meta = {
  title: 'components-deep-dive/Accordion',
};

export default meta;

const MultipleTemplate = () => (
  <AccordionRoot defaultValue={['accordion-item-1']}>
    {Array.from({ length: 10 }).map((_, i) => (
      <AccordionItem
        key={i}
        value={`accordion-item-${i + 1}`}
        disabled={i === 7}
      >
        <AccordionHeader>
          <AccordionTrigger className='group'>
            {i === 7 ? (
              <span>DISABLED Accordion with dummy content</span>
            ) : (
              <span>Accordion no. {i + 1} with dummy content</span>
            )}

            <IconChevronDown
              size={20}
              className='ml-auto rotate-0 transition-transform group-data-[expanded=true]:-rotate-180'
            />
          </AccordionTrigger>
        </AccordionHeader>

        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          pariatur vitae consectetur ullam repellendus illo suscipit
          perspiciatis at maxime neque exercitationem qui doloribus architecto
          reiciendis modi debitis aliquid, ex id!
        </AccordionContent>
      </AccordionItem>
    ))}
  </AccordionRoot>
);

export const Multiple = {
  render: MultipleTemplate,
};

const SingleTemplate = () => (
  <AccordionRoot
    type='single'
    isSingleCollapsible={false}
    defaultValue='accordion-item-1'
  >
    {Array.from({ length: 10 }).map((_, i) => (
      <AccordionItem
        key={i}
        value={`accordion-item-${i + 1}`}
        disabled={i === 7}
      >
        <AccordionHeader>
          <AccordionTrigger className='group'>
            {i === 7 ? (
              <span>DISABLED Accordion with dummy content</span>
            ) : (
              <span>Accordion no. {i + 1} with dummy content</span>
            )}

            <IconChevronDown
              size={20}
              className='ml-auto rotate-0 transition-transform group-data-[expanded=true]:-rotate-180'
            />
          </AccordionTrigger>
        </AccordionHeader>

        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          pariatur vitae consectetur ullam repellendus illo suscipit
          perspiciatis at maxime neque exercitationem qui doloribus architecto
          reiciendis modi debitis aliquid, ex id!
        </AccordionContent>
      </AccordionItem>
    ))}
  </AccordionRoot>
);

export const Single = {
  render: SingleTemplate,
};

const SingleCollapsibleTemplate = () => (
  <AccordionRoot type='single' defaultValue='accordion-item-1'>
    {Array.from({ length: 10 }).map((_, i) => (
      <AccordionItem
        key={i}
        value={`accordion-item-${i + 1}`}
        disabled={i === 7}
      >
        <AccordionHeader>
          <AccordionTrigger className='group'>
            {i === 7 ? (
              <span>DISABLED Accordion with dummy content</span>
            ) : (
              <span>Accordion no. {i + 1} with dummy content</span>
            )}

            <IconChevronDown
              size={20}
              className='ml-auto rotate-0 transition-transform group-data-[expanded=true]:-rotate-180'
            />
          </AccordionTrigger>
        </AccordionHeader>

        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          pariatur vitae consectetur ullam repellendus illo suscipit
          perspiciatis at maxime neque exercitationem qui doloribus architecto
          reiciendis modi debitis aliquid, ex id!
        </AccordionContent>
      </AccordionItem>
    ))}
  </AccordionRoot>
);

export const SingleCollapsible = {
  render: SingleCollapsibleTemplate,
};
