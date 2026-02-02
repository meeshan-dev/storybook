import { AnimatePresence, motion } from 'motion/react';
import React, { useId, useState } from 'react';
import { createContextScope } from '~/lib/context-scope';
import { cn } from '~/lib/utils';

/* ———————————————————— Root ———————————————————— */

type DisclosureRootProps<Type, IsSingleCollapsible> = {
  children?: React.ReactNode;
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
    isSingleCollapsible = true,
    type = 'multiple',
    children,
  } = props;

  const rootId = useId();

  const [value, setValue] = useState(
    type === 'multiple' ? defaultValue || [] : defaultValue || null,
  );

  const onOpen = (openedItem: string) => {
    if (type === 'single') {
      setValue(openedItem);
    }

    if (type === 'multiple') {
      setValue((prev) => (Array.isArray(prev) ? [...prev, openedItem] : prev));
    }
  };

  const onClose = (closedItem: string) => {
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
      }}
    >
      {children}
    </DisclosureCtx>
  );
}

/* ———————————————————— Item ———————————————————— */

type DisclosureItemProps = {
  children?: React.ReactNode;
  value: string;
  disabled?: boolean;
};

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

/* ———————————————————— Trigger ———————————————————— */

export const DisclosureTrigger = ({
  children,
}: {
  children?: (
    props: Omit<React.ComponentPropsWithRef<'button'>, 'children'>,
  ) => React.ReactNode;
}) => {
  const disclosureCtx = useDisclosureCtx();
  const itemCtx = useDisclosureItemCtx();

  const handleToggle = () => {
    if (itemCtx.isOpen) disclosureCtx.onClose(itemCtx.value);
    else disclosureCtx.onOpen(itemCtx.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (itemCtx.disabled) return;
    if ([' ', 'Enter'].includes(e.key)) {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <>
      {children?.({
        onKeyDown,
        disabled: itemCtx.disabled,
        onClick: handleToggle,
        id: itemCtx.triggerId,
        'aria-expanded': itemCtx.isOpen,
        'aria-controls': itemCtx.contentId,
        ...{
          'data-expanded': itemCtx.isOpen,
          'data-disclosure-item': disclosureCtx.rootId,
        },
      })}
    </>
  );
};

/* ———————————————————— Content ———————————————————— */

export const DisclosureContent = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const itemCtx = useDisclosureItemCtx();

  return (
    <AnimatePresence>
      {!itemCtx.isOpen ? null : (
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
            className={cn(
              '[&_a]:hover:text-foreground overflow-hidden px-3 py-4 text-sm [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
              className,
            )}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
