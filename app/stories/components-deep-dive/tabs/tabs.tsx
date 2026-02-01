import React, { useState } from 'react';
import { createContextScope } from '~/lib/context-scope';

type ActivationMode = 'automatic' | 'manual';
type Orientation = 'horizontal' | 'vertical';

export interface TabsRootProps {
  defaultValue?: string;
  loop?: boolean;
  activationMode?: ActivationMode;
  orientation?: Orientation;
  children?: React.ReactNode;
}

interface TabsCtxProps {
  value: string;
  rootId: string;
  activationMode: ActivationMode;
  orientation: Orientation;
  loop: TabsRootProps['loop'];
  isTabbingBackOut: boolean;
  setIsTabbingBackOut: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const [TabsCtx, useTabsCtx] = createContextScope<TabsCtxProps>();

export function TabsRoot(props: TabsRootProps) {
  const {
    defaultValue,
    loop = false,
    orientation = 'horizontal',
    activationMode = 'automatic',
    children,
  } = props;

  const [value, setValue] = useState(defaultValue ?? '');

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
      {children}
    </TabsCtx>
  );
}

// <<--------------------Tabs List-------------------->>

export function TabsList(props: React.ComponentPropsWithRef<'div'>) {
  const { ...restProps } = props;

  const tabsCtx = useTabsCtx();

  const isClickFocusRef = React.useRef(false);

  return (
    <div
      {...restProps}
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
    />
  );
}

// <<--------------------Tabs Trigger-------------------->>

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

// <<--------------------Tabs Content-------------------->>

export function TabsContent(
  props: React.ComponentPropsWithRef<'div'> & { value: string },
) {
  const { value, ...contentProps } = props;

  const tabsCtx = useTabsCtx();

  const isSelected = value === tabsCtx.value;
  const triggerId = 'trigger-' + value;
  const contentId = 'content-' + value;

  return !isSelected ? null : (
    <div
      {...contentProps}
      data-orientation={tabsCtx.orientation}
      role='tabpanel'
      aria-labelledby={triggerId}
      id={contentId}
      tabIndex={0}
    />
  );
}
