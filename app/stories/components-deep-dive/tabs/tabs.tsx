import React from 'react';
import { cn } from '~/lib/utils';
import { useControlled } from '~/stories/hooks/use-controlled/use-controlled';
import { createContextScope } from '~/stories/utils/context-scope/context-scope';

/* ———————————————————— Root ———————————————————— */

type ActivationMode = 'automatic' | 'manual';
type Orientation = 'horizontal' | 'vertical';

interface TabsCtxProps {
  value: string;
  rootId: string;
  activationMode: ActivationMode;
  orientation: Orientation;
  loop: boolean;
  isTabbingBackOut: boolean;
  setIsTabbingBackOut: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: (value: string) => void;
}

const [TabsCtx, useTabsCtx] = createContextScope<TabsCtxProps>();

export function TabsRoot({
  value: valueProp,
  defaultValue = '',
  loop = false,
  orientation = 'horizontal',
  activationMode = 'automatic',
  onValueChange,
  children,
  className,
}: {
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  className?: string;
  loop?: boolean;
  activationMode?: ActivationMode;
  orientation?: Orientation;
  onValueChange?: (value: string) => void;
}) {
  const [value, setValue] = useControlled({
    controlled: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  const [isTabbingBackOut, setIsTabbingBackOut] = React.useState(false);

  const rootId = React.useId();

  return (
    <TabsCtx
      value={{
        rootId,
        value,
        orientation,
        activationMode,
        loop,
        isTabbingBackOut,
        setIsTabbingBackOut,
        setValue,
      }}
    >
      <div className={className}>{children}</div>
    </TabsCtx>
  );
}

/* ———————————————————— List ———————————————————— */

export function TabsList({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const tabsCtx = useTabsCtx();

  const isClickFocusRef = React.useRef(false);

  return (
    <div
      tabIndex={tabsCtx.isTabbingBackOut ? -1 : 0}
      role='tablist'
      aria-orientation={tabsCtx.orientation}
      data-tabs-list-id={tabsCtx.rootId}
      onMouseDown={() => {
        isClickFocusRef.current = true;
      }}
      onBlur={() => tabsCtx.setIsTabbingBackOut(false)}
      onFocus={(e) => {
        if (e.target === e.currentTarget && !tabsCtx.isTabbingBackOut) {
          const items = Array.from(
            document.querySelectorAll<HTMLButtonElement>(
              `[data-tabs-list-id="${tabsCtx.rootId}"] [role="tab"]`,
            ),
          );

          const activeItems = items.filter((item) => {
            if (item instanceof HTMLButtonElement === false) return false;

            return (
              !item.disabled &&
              !item.hidden &&
              getComputedStyle(item).display !== 'none'
            );
          });

          const currentActiveItem = activeItems.find(
            (item) => item.dataset.active === 'true',
          );

          currentActiveItem?.focus();
        }

        isClickFocusRef.current = false;
      }}
      className={cn(
        tabsCtx.orientation === 'horizontal'
          ? 'flex w-full gap-2 rounded-lg p-2 *:grow'
          : 'flex flex-col gap-2 rounded-lg p-2 *:w-full',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ———————————————————— Trigger ———————————————————— */

export function TabsTrigger({
  value,
  children,
}: {
  value: string;
  children: (props: React.ComponentProps<'button'>) => React.ReactNode;
}) {
  const tabsCtx = useTabsCtx();

  if (!value) throw new Error('TabsTrigger requires a value prop');

  const isSelected = value === tabsCtx.value;

  const triggerId = 'trigger-' + value;
  const contentId = 'content-' + value;

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Tab' && e.shiftKey) {
      tabsCtx.setIsTabbingBackOut(true);
      return;
    }

    if (e.repeat) return;

    if ([' ', 'Enter'].includes(e.key)) {
      tabsCtx.setValue(value);
      return;
    }

    if (e.target !== e.currentTarget) return;

    const key = e.key;

    if (
      tabsCtx.orientation === 'horizontal' &&
      (key === 'ArrowLeft' || key === 'ArrowRight')
    ) {
      e.preventDefault();
    }

    if (
      tabsCtx.orientation === 'vertical' &&
      (key === 'ArrowUp' || key === 'ArrowDown')
    ) {
      e.preventDefault();
    }

    const Next =
      tabsCtx.orientation === 'horizontal'
        ? key === 'ArrowRight'
        : key === 'ArrowDown';

    const Prev =
      tabsCtx.orientation === 'horizontal'
        ? key === 'ArrowLeft'
        : key === 'ArrowUp';

    const items = Array.from(
      document.querySelectorAll<HTMLButtonElement>(
        `[data-tabs-list-id="${tabsCtx.rootId}"] [role="tab"]`,
      ),
    );

    const activeItems = items.filter((item) => {
      return (
        !item.disabled &&
        !item.hidden &&
        getComputedStyle(item).display !== 'none'
      );
    });

    const currentIndex = activeItems.indexOf(e.currentTarget);

    // loop from last to first
    if (currentIndex === activeItems.length - 1 && tabsCtx.loop && Next) {
      activeItems[0]?.focus();
      return;
    }

    // loop from first to end
    if (currentIndex === 0 && tabsCtx.loop && Prev) {
      activeItems[activeItems.length - 1]?.focus();
      return;
    }

    if (Next && currentIndex >= 0 && currentIndex < activeItems.length - 1) {
      activeItems[currentIndex + 1]?.focus();
      return;
    }

    if (Prev && currentIndex > 0 && currentIndex <= activeItems.length - 1) {
      activeItems[currentIndex - 1]?.focus();
      return;
    }
  };

  const onFocus = () => {
    if (tabsCtx.activationMode === 'automatic') {
      tabsCtx.setValue(value);
    }
  };

  return (
    <>
      {children({
        type: 'button',
        tabIndex: isSelected ? 0 : -1,
        role: 'tab',
        'aria-selected': isSelected,
        'aria-controls': contentId,
        id: triggerId,
        onKeyDown,
        onFocus,
        onClick: () => {
          tabsCtx.setValue(value);
        },
        ...{ 'data-orientation': tabsCtx.orientation },
      })}
    </>
  );
}

/* ———————————————————— Content ———————————————————— */

export function TabsContent({
  value,
  children,
  className,
}: {
  children?: React.ReactNode;
  value: string;
  className?: string;
}) {
  const tabsCtx = useTabsCtx();

  const isSelected = value === tabsCtx.value;
  const triggerId = 'trigger-' + value;
  const contentId = 'content-' + value;

  return !isSelected ? null : (
    <div
      data-orientation={tabsCtx.orientation}
      role='tabpanel'
      aria-labelledby={triggerId}
      id={contentId}
      tabIndex={0}
      className={cn('w-full rounded-lg p-2 text-sm', className)}
    >
      {children}
    </div>
  );
}
