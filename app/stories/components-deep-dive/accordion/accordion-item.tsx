import React from 'react';
import { createContextScope } from '~/lib/context-scope';
import { useAccordionCtx } from './accordion-root';

interface AccordionItemProps extends React.ComponentPropsWithRef<'div'> {
  value: string;
  disabled?: boolean;
}

interface AccordionItemCtxProps {
  value: string;
  triggerId: string;
  contentId: string;
  isExpended: boolean;
  disabled?: boolean;
}

const [AccordionItemCtx, useAccordionItemCtx] =
  createContextScope<AccordionItemCtxProps>();

export { useAccordionItemCtx };

export const AccordionItem = (props: AccordionItemProps) => {
  const { value, disabled, ...restProps } = props;

  const accordionCtx = useAccordionCtx();

  const triggerId = React.useId();
  const contentId = React.useId();

  const isExpended =
    accordionCtx.type === 'multiple'
      ? Array.isArray(accordionCtx.value) &&
        !!accordionCtx.value.find((ele) => ele === value)
      : accordionCtx.value === value;

  return (
    <AccordionItemCtx
      value={{
        value,
        contentId: contentId,
        triggerId: triggerId,
        isExpended: isExpended,
        disabled: disabled,
      }}
    >
      <div
        {...restProps}
        data-expanded={isExpended}
        className='not-last:border-b'
      />
    </AccordionItemCtx>
  );
};
