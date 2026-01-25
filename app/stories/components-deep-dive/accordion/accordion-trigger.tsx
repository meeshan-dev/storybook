import React from 'react';
import { useAccordionItemCtx } from './accordion-item';
import { useAccordionCtx } from './accordion-root';

export const AccordionTrigger = (
  props: React.ComponentPropsWithRef<'button'>,
) => {
  const { children, disabled, ...restProps } = props;

  const accordionCtx = useAccordionCtx();
  const itemCtx = useAccordionItemCtx();

  const isExpended = itemCtx.isExpended;

  const onClick = () => {
    if (isExpended) accordionCtx.onCollapse(itemCtx.value);
    else accordionCtx.onExpand(itemCtx.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (accordionCtx.disabled) return;

    const key = e.key;

    if (key === 'Tab' || (key === 'Tab' && e.shiftKey)) return;

    if ([' ', 'Enter'].includes(key)) {
      onClick();

      return;
    }

    const ArrowDown = key === 'ArrowDown';
    const ArrowUp = key === 'ArrowUp';
    const Home = key === 'Home';
    const End = key === 'End';

    const elements = Array.from(
      document.querySelectorAll<HTMLButtonElement>(
        `#${accordionCtx.rootId} [data-accordtion-item]`,
      ),
    );

    const activeElements = elements.filter(
      (ele) =>
        !ele.disabled &&
        !ele.hidden &&
        getComputedStyle(ele).display !== 'none',
    );

    const currentIndex = activeElements.findIndex(
      (item) => item === e.currentTarget,
    );

    const next = elements[Math.min(currentIndex + 1, elements.length - 1)];

    const prev = elements[Math.max(currentIndex - 1, 0)];

    if (ArrowDown) next?.focus();
    if (ArrowUp) prev?.focus();
    if (Home) elements[0]?.focus();
    if (End) elements[elements.length - 1]?.focus();
  };

  return (
    <button
      {...restProps}
      onKeyDown={onKeyDown}
      disabled={accordionCtx.disabled ?? disabled ?? itemCtx.disabled}
      id={itemCtx.triggerId}
      aria-expanded={isExpended}
      aria-controls={itemCtx.contentId}
      data-expanded={isExpended}
      role='button'
      onClick={onClick}
      data-accordtion-item
    >
      {children}
    </button>
  );
};
