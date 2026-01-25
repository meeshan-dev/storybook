import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useAccordionItemCtx } from './accordion-item';
import { useAccordionCtx } from './accordion-root';

type HeadingLevel = `h${2 | 3 | 4 | 5 | 6}`;

export const AccordionTrigger = (
  props: React.ComponentPropsWithRef<'button'> & {
    headingLevel: HeadingLevel;
    headingProps?: Omit<React.ComponentPropsWithRef<HeadingLevel>, 'children'>;
  },
) => {
  const {
    disabled: disabledProp,
    className,
    headingLevel,
    headingProps,
    ...restProps
  } = props;

  const accordionCtx = useAccordionCtx();
  const itemCtx = useAccordionItemCtx();

  const disabled = accordionCtx.disabled || disabledProp || itemCtx.disabled;

  const isExpended = itemCtx.isExpended;

  const onClick = () => {
    if (isExpended) accordionCtx.onCollapse(itemCtx.value);
    else accordionCtx.onExpand(itemCtx.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

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

    if (![ArrowDown, ArrowUp, Home, End].includes(true)) return;

    e.preventDefault();

    const elements = Array.from(
      document.querySelectorAll<HTMLButtonElement>(
        `[data-accordtion-item=${accordionCtx.rootId}]`,
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

  const Heading = headingLevel as HeadingLevel;

  if (!headingLevel) {
    throw new Error('AccordionTrigger: headingLevel prop is required');
  }

  if (!['h2', 'h3', 'h4', 'h5', 'h6'].includes(headingLevel)) {
    throw new Error(
      'AccordionTrigger: headingLevel prop must be between h2 and h6',
    );
  }

  if ((headingProps as { children?: unknown })?.children) {
    throw new Error(
      'AccordionTrigger: headingProps.children prop is not allowed',
    );
  }

  return (
    <Heading {...headingProps}>
      <button
        {...restProps}
        onKeyDown={onKeyDown}
        disabled={disabled}
        id={itemCtx.triggerId}
        aria-expanded={isExpended}
        aria-controls={itemCtx.contentId}
        data-expanded={isExpended}
        role='button'
        onClick={onClick}
        data-accordtion-item={accordionCtx.rootId}
        className={twMerge(
          'focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground group/accordion-trigger relative flex w-full flex-1 items-start justify-between rounded-md border border-transparent px-3 py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4',
          className,
        )}
      />
    </Heading>
  );
};
