import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type TargetAndTransition,
  type Transition,
} from 'motion/react';
import React, { useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { createContextScope } from '~/lib/context-scope';
import { mergeMotionProp } from '~/lib/merge-motion-prop';

// <<--------------------Accordion-------------------->>

export type AccordionRootProps<Type, IsSingleCollapsible> = {
  disabled?: boolean;
  children: React.ReactNode;
} & (Type extends 'multiple'
  ? {
      type?: Type;
      defaultValue?: string[];
      isSingleCollapsible?: undefined;
    }
  : IsSingleCollapsible extends true
    ? {
        type: Type;
        defaultValue?: string | null;
        isSingleCollapsible?: IsSingleCollapsible;
      }
    : {
        type: Type;
        defaultValue?: string;
        isSingleCollapsible: IsSingleCollapsible;
      });

interface AccordionCtxProps {
  rootId: string;
  onExpand: (value: string) => void;
  onCollapse: (value: string) => void;
  disabled?: boolean;
  value: string | string[] | null;
  type: 'multiple' | 'single';
}

const [AccordionCtx, useAccordionCtx] = createContextScope<AccordionCtxProps>();

export function AccordionRoot<
  Type extends 'single' | 'multiple' = 'multiple',
  IsSingleCollapsible extends boolean = true,
>(props: AccordionRootProps<Type, IsSingleCollapsible>) {
  const {
    defaultValue = null,
    disabled,
    isSingleCollapsible = true,
    type = 'multiple',
    children,
  } = props;

  const rootId = useId();

  const [value, setValue] = useState(
    type === 'multiple' ? (defaultValue ?? []) : defaultValue,
  );

  const onExpand = (expanedItem: string) => {
    if (disabled) return;

    if (type === 'single') {
      setValue(expanedItem);
    }

    if (type === 'multiple') {
      setValue((prev) => (Array.isArray(prev) ? [...prev, expanedItem] : prev));
    }
  };

  const onCollapse = (collapsedItem: string) => {
    if (disabled) return;

    if (type === 'single' && !isSingleCollapsible) return;

    if (type === 'single' && isSingleCollapsible) {
      setValue(null);
    }

    if (type === 'multiple') {
      setValue((prev) =>
        Array.isArray(prev)
          ? prev.filter((ele) => ele !== collapsedItem)
          : prev,
      );
    }
  };

  if (type === 'single' && !isSingleCollapsible && Array.isArray(value))
    throw new Error(
      `\`value\` must be \`string\` when type is single and isSingleCollapsible is false`,
    );

  if (type === 'single' && isSingleCollapsible && Array.isArray(value))
    throw new Error(
      `\`value\` must be \`string | null\` when type is single and isSingleCollapsible is true`,
    );

  if (type === 'multiple' && !Array.isArray(value))
    throw new Error(`\`value\` must be \`array\` when type is multiple`);

  return (
    <AccordionCtx
      value={{
        rootId,
        value,
        type,
        onCollapse,
        onExpand,
        disabled,
      }}
    >
      {children}
    </AccordionCtx>
  );
}

// <<--------------------Accordion Item-------------------->>

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

// <<--------------------Accordion Trigger-------------------->>

type HeadingLevel = `h${2 | 3 | 4 | 5 | 6}`;

export const AccordionTrigger = (
  props: Omit<
    React.ComponentPropsWithRef<'button'>,
    'children' | 'id' | 'aria-expanded' | 'aria-controls'
  > & {
    headingLevel: HeadingLevel;
    headingProps?: Omit<React.ComponentPropsWithRef<HeadingLevel>, 'children'>;
    children?: (
      props: Omit<React.ComponentPropsWithRef<'button'>, 'children'>,
    ) => React.ReactNode;
  },
) => {
  const {
    disabled: disabledProp,
    children,
    headingLevel,
    headingProps,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    ...restProps
  } = props;

  const accordionCtx = useAccordionCtx();
  const itemCtx = useAccordionItemCtx();

  const disabled = accordionCtx.disabled || disabledProp || itemCtx.disabled;

  const isExpended = itemCtx.isExpended;

  const handleToggle = () => {
    if (isExpended) accordionCtx.onCollapse(itemCtx.value);
    else accordionCtx.onExpand(itemCtx.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDownProp?.(e);

    if (disabled) return;

    const key = e.key;

    if (key === 'Tab' || (key === 'Tab' && e.shiftKey)) return;

    if ([' ', 'Enter'].includes(key)) {
      e.preventDefault();
      handleToggle();

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
      {children?.({
        ...restProps,
        onKeyDown,
        disabled,
        onClick: (e) => {
          handleToggle();
          onClickProp?.(e);
        },
        id: itemCtx.triggerId,
        'aria-expanded': isExpended,
        'aria-controls': itemCtx.contentId,
        ...{
          'data-expanded': isExpended,
          'data-accordtion-item': accordionCtx.rootId,
        },
      })}
    </Heading>
  );
};

// <<--------------------Accordion Content-------------------->>

const default_initial: TargetAndTransition = {
  height: 0,
  opacity: 0,
  overflow: 'hidden',
};

const default_animate: TargetAndTransition = {
  height: 'auto',
  opacity: 1,
  overflow: 'hidden',
};

const default_exit: TargetAndTransition = {
  height: 0,
  opacity: 0,
  overflow: 'hidden',
};

const default_transition: Transition = { duration: 0.2 };

export const AccordionContent = (
  props: Omit<React.ComponentPropsWithRef<'div'>, 'id'> & {
    motionProps?: Omit<HTMLMotionProps<'div'>, 'children'>;
  },
) => {
  const {
    className,
    motionProps: { initial, animate, exit, transition, ...motionProps } = {},
    ...restProps
  } = props;

  const itemCtx = useAccordionItemCtx();

  return (
    <AnimatePresence>
      {!itemCtx.isExpended ? null : (
        <motion.div
          {...motionProps}
          initial={mergeMotionProp(initial, default_initial)}
          animate={mergeMotionProp(animate, default_animate)}
          exit={mergeMotionProp(exit, default_exit)}
          transition={mergeMotionProp(transition, default_transition)}
        >
          <div
            {...restProps}
            id={itemCtx.contentId}
            className={twMerge(
              '[&_a]:hover:text-foreground overflow-hidden px-3 py-4 text-sm [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
              className,
            )}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
