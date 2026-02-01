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

// <<--------------------Disclosure Root-------------------->>

export type DisclosureRootProps<Type, IsSingleCollapsible> = {
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

interface DisclosureCtxProps {
  rootId: string;
  onOpen: (value: string) => void;
  onClose: (value: string) => void;
  disabled?: boolean;
  value: string | string[] | null;
  type: 'multiple' | 'single';
}

const [DisclosureCtx, useDisclosureCtx] =
  createContextScope<DisclosureCtxProps>();

export function DisclosureRoot<
  Type extends 'single' | 'multiple' = 'multiple',
  IsSingleCollapsible extends boolean = true,
>(props: DisclosureRootProps<Type, IsSingleCollapsible>) {
  const {
    defaultValue,
    disabled,
    isSingleCollapsible = true,
    type = 'multiple',
    children,
  } = props;

  const rootId = useId();

  const [value, setValue] = useState(
    type === 'multiple' ? defaultValue || [] : defaultValue || null,
  );

  const onOpen = (openedItem: string) => {
    if (disabled) return;

    if (type === 'single') {
      setValue(openedItem);
    }

    if (type === 'multiple') {
      setValue((prev) => (Array.isArray(prev) ? [...prev, openedItem] : prev));
    }
  };

  const onClose = (closedItem: string) => {
    if (disabled) return;

    if (type === 'single' && !isSingleCollapsible) return;
    if (type === 'single' && isSingleCollapsible) {
      setValue(null);
    }

    if (type === 'multiple') {
      setValue((prev) =>
        Array.isArray(prev) ? prev.filter((ele) => ele !== closedItem) : prev,
      );
    }
  };

  if (type === 'single' && !isSingleCollapsible && Array.isArray(value))
    throw new Error(
      '`value` must be `string` when type is single and isSingleCollapsible is false',
    );

  if (type === 'single' && isSingleCollapsible && Array.isArray(value))
    throw new Error(
      '`value` must be `string | null` when type is single and isSingleCollapsible is true',
    );

  if (type === 'multiple' && !Array.isArray(value))
    throw new Error('`value` must be `array` when type is multiple');

  return (
    <DisclosureCtx
      value={{
        rootId,
        value,
        type,
        onClose,
        onOpen,
        disabled,
      }}
    >
      {children}
    </DisclosureCtx>
  );
}

// <<--------------------Disclosure Item-------------------->>

interface DisclosureItemProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

interface DisclosureItemCtxProps {
  value: string;
  triggerId: string;
  contentId: string;
  isOpen: boolean;
  disabled?: boolean;
}

const [DisclosureItemCtx, useDisclosureItemCtx] =
  createContextScope<DisclosureItemCtxProps>();

export const DisclosureItem = (props: DisclosureItemProps) => {
  const { value, disabled, children } = props;
  const disclosureCtx = useDisclosureCtx();

  const triggerId = React.useId();
  const contentId = React.useId();

  const isOpen =
    disclosureCtx.type === 'multiple'
      ? Array.isArray(disclosureCtx.value) &&
        disclosureCtx.value.includes(value)
      : disclosureCtx.value === value;

  return (
    <DisclosureItemCtx
      value={{ value, triggerId, contentId, isOpen, disabled }}
    >
      {children}
    </DisclosureItemCtx>
  );
};

// <<--------------------Disclosure Trigger-------------------->>

export const DisclosureTrigger = (
  props: Omit<
    React.ComponentPropsWithRef<'button'>,
    'children' | 'id' | 'aria-expanded' | 'aria-controls'
  > & {
    children?: (
      props: Omit<React.ComponentPropsWithRef<'button'>, 'children'>,
    ) => React.ReactNode;
  },
) => {
  const {
    disabled: disabledProp,
    children,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    ...restProps
  } = props;
  const disclosureCtx = useDisclosureCtx();
  const itemCtx = useDisclosureItemCtx();

  const disabled = disclosureCtx.disabled || disabledProp || itemCtx.disabled;
  const isOpen = itemCtx.isOpen;

  const handleToggle = () => {
    if (isOpen) disclosureCtx.onClose(itemCtx.value);
    else disclosureCtx.onOpen(itemCtx.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDownProp?.(e);
    if (disabled) return;
    if ([' ', 'Enter'].includes(e.key)) {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <>
      {children?.({
        ...restProps,
        onKeyDown,
        disabled,
        onClick: (e) => {
          handleToggle();
          onClickProp?.(e);
        },
        id: itemCtx.triggerId,
        'aria-expanded': isOpen,
        'aria-controls': itemCtx.contentId,
        ...{
          'data-expanded': isOpen,
          'data-disclosure-item': disclosureCtx.rootId,
        },
      })}
    </>
  );
};

// <<--------------------Disclosure Content-------------------->>

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

export const DisclosureContent = (
  props: Omit<React.ComponentPropsWithRef<'div'>, 'id'> & {
    motionProps?: Omit<HTMLMotionProps<'div'>, 'children'>;
  },
) => {
  const {
    className,
    motionProps: { initial, animate, exit, transition, ...motionProps } = {},
    ...restProps
  } = props;
  const itemCtx = useDisclosureItemCtx();

  return (
    <AnimatePresence>
      {!itemCtx.isOpen ? null : (
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
