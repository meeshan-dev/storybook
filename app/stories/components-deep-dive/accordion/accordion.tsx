import { AnimatePresence, motion } from 'motion/react';
import React, { useId } from 'react';
import { createContextScope } from '~/lib/context-scope';
import { useControlled } from '~/stories/hooks/use-controlled';

/* ———————————————————— Root ———————————————————— */

type AccordionRootProps<Type, IsSingleCollapsible> = {
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
} & (Type extends 'multiple'
  ? {
      type?: Type;
      value?: string[];
      defaultValue?: string[];
      onValueChange?: (value: string[]) => void;
      isSingleCollapsible?: undefined;
    }
  : IsSingleCollapsible extends true
    ? {
        type: Type;
        value?: string | null;
        defaultValue?: string | null;
        onValueChange?: (value: string | null) => void;
        isSingleCollapsible?: IsSingleCollapsible;
      }
    : {
        type: Type;
        value?: string;
        defaultValue?: string;
        onValueChange?: (value: string) => void;
        isSingleCollapsible: IsSingleCollapsible;
      });

type AccordionCtxProps = {
  rootId: string;
  onExpand: (value: string) => void;
  onCollapse: (value: string) => void;
  disabled?: boolean;
  value: string | string[] | null;
  type: 'multiple' | 'single';
};

const [AccordionCtx, useAccordionCtx] = createContextScope<AccordionCtxProps>();

export function AccordionRoot<
  Type extends 'single' | 'multiple' = 'multiple',
  IsSingleCollapsible extends boolean = true,
>(props: AccordionRootProps<Type, IsSingleCollapsible>) {
  const {
    value: valueProp,
    defaultValue,
    onValueChange,
    disabled,
    isSingleCollapsible = true,
    type = 'multiple',
    children,
    className,
  } = props;

  const rootId = useId();

  const [value, setValue] = useControlled({
    controlled: valueProp,
    defaultValue:
      type === 'multiple' ? (defaultValue ?? []) : (defaultValue ?? null),
    onChange: onValueChange as
      | ((value: string | string[] | null) => void)
      | undefined,
  });

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
      <div className={className}>{children}</div>
    </AccordionCtx>
  );
}

/* ———————————————————— Item ———————————————————— */

type AccordionItemProps = {
  children?: React.ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
};

type AccordionItemCtxProps = {
  value: string;
  triggerId: string;
  contentId: string;
  isExpended: boolean;
  disabled?: boolean;
};

const [AccordionItemCtx, useAccordionItemCtx] =
  createContextScope<AccordionItemCtxProps>();

export const AccordionItem = (props: AccordionItemProps) => {
  const { value, disabled, children, className } = props;

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
      <div
        className={className}
        data-open={isExpended ? true : undefined}
        data-closed={isExpended ? undefined : true}
        data-disabled={disabled ? true : undefined}
      >
        {children}
      </div>
    </AccordionItemCtx>
  );
};

/* ———————————————————— Trigger ———————————————————— */

type HeadingLevel = `h${2 | 3 | 4 | 5 | 6}`;

export const AccordionTrigger = (props: {
  disabled?: boolean;
  headingLevel: HeadingLevel;
  children?: (
    props: Omit<React.ComponentPropsWithRef<'button'>, 'children'>,
  ) => React.ReactNode;
}) => {
  const { disabled: disabledProp, children, headingLevel } = props;

  const accordionCtx = useAccordionCtx();
  const itemCtx = useAccordionItemCtx();

  const disabled = accordionCtx.disabled || disabledProp || itemCtx.disabled;

  const isExpended = itemCtx.isExpended;

  const handleToggle = () => {
    if (isExpended) accordionCtx.onCollapse(itemCtx.value);
    else accordionCtx.onExpand(itemCtx.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
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

    document
      .querySelectorAll<HTMLElement>(
        `[data-accordtion-item=${accordionCtx.rootId}]`,
      )
      .forEach((ele) => {
        delete ele.dataset.focused;
      });

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

    if (ArrowDown) {
      const next = activeElements.at(
        Math.min(currentIndex + 1, activeElements.length - 1),
      );

      if (next) {
        next.focus();
        next.dataset.focused = 'true';
      }
    }
    if (ArrowUp) {
      const prev = activeElements.at(Math.max(currentIndex - 1, 0));

      if (prev) {
        prev.focus();
        prev.dataset.focused = 'true';
      }
    }
    if (Home) {
      const first = activeElements.at(0);

      if (first) {
        first.focus();
        first.dataset.focused = 'true';
      }
    }
    if (End) {
      const last = activeElements.at(activeElements.length - 1);

      if (last) {
        last.focus();
        last.dataset.focused = 'true';
      }
    }
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

  return (
    <Heading>
      {children?.({
        onKeyDown,
        disabled,
        onClick: handleToggle,
        onBlur: (e) => {
          delete e.currentTarget.dataset.focused;
        },
        onMouseMove: (e) => {
          if (e.currentTarget.dataset.focused === 'true') return;

          document
            .querySelectorAll<HTMLElement>(
              `[data-accordtion-item=${accordionCtx.rootId}]`,
            )
            .forEach((ele) => {
              delete ele.dataset.focused;
            });

          e.currentTarget.focus();
          e.currentTarget.dataset.focused = 'true';
        },
        onMouseLeave: (e) => {
          e.currentTarget.dataset.focused = 'false';
        },
        type: 'button',
        id: itemCtx.triggerId,
        'aria-expanded': isExpended,
        'aria-controls': itemCtx.contentId,
        ...{
          'data-accordtion-item': accordionCtx.rootId,
        },
      })}
    </Heading>
  );
};

/* ———————————————————— Content ———————————————————— */

export const AccordionContent = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const itemCtx = useAccordionItemCtx();

  return (
    <AnimatePresence>
      {!itemCtx.isExpended ? null : (
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
            overflow: 'hidden',
          }}
          animate={{
            height: 'auto',
            opacity: 1,
            overflow: 'hidden',
          }}
          exit={{
            height: 0,
            opacity: 0,
            overflow: 'hidden',
          }}
          transition={{ duration: 0.2 }}
        >
          <div
            id={itemCtx.contentId}
            aria-labelledby={itemCtx.triggerId}
            role='region'
            className={className}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
