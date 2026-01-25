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
      e.preventDefault();
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

    const next =
      activeElements[Math.min(currentIndex + 1, activeElements.length - 1)];

    const prev = activeElements[Math.max(currentIndex - 1, 0)];

    if (ArrowDown) next?.focus();
    if (ArrowUp) prev?.focus();
    if (Home) activeElements[0]?.focus();
    if (End) activeElements[activeElements.length - 1]?.focus();
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
      className='focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground group/accordion-trigger relative flex w-full flex-1 items-start justify-between rounded-md border border-transparent py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4'
    >
      {children}
    </button>
  );
};
