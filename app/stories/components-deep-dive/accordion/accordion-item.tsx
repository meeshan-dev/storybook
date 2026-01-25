import React from 'react';
import { createContextScope } from '~/lib/context-scope';
import { useAccordionCtx } from './accordion-root';

interface AccordionItemProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
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
  const { value, disabled, children } = props;

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
        contentId,
        triggerId,
        isExpended,
        disabled,
      }}
    >
      {children}
    </AccordionItemCtx>
  );
};
