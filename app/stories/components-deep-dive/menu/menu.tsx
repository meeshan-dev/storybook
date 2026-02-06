import {
  arrow as arrowMiddleware,
  autoUpdate,
  flip as flipMiddleware,
  FloatingArrow,
  hide as hideMiddleware,
  limitShift,
  offset as offsetMiddleware,
  shift as shiftMiddleware,
  size,
  useFloating,
} from '@floating-ui/react';
import React, { useEffectEvent, useId } from 'react';
import { createPortal } from 'react-dom';
import { createContextScope } from '~/lib/context-scope';
import { getLayers } from '~/lib/get-layers';
import { cn } from '~/lib/utils';
import { useControlled } from '~/stories/hooks/use-controlled';
import { useOnClickOutside } from '~/stories/hooks/use-on-click-outside';
import { useScrollLock } from '~/stories/hooks/use-scroll-lock';

/* ———————————————————— Root ———————————————————— */

interface MenuCtxProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  contentId: string;
  setTrigger: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  trigger: HTMLButtonElement | null;
  loop: boolean;
  contentRef: React.RefObject<HTMLElement | null>;
  disableCloseOnEscape: boolean;
}

const [MenuCtx, useMenuCtx] = createContextScope<MenuCtxProps>();

export function MenuRoot({
  children,
  loop = false,
  disableCloseOnEscape = false,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: {
  children?: React.ReactNode;
  loop?: boolean;
  disableCloseOnEscape?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const contentRef = React.useRef<HTMLElement | null>(null);

  const [open, setOpen] = useControlled({
    controlled: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const contentId = React.useId();

  const [trigger, setTrigger] = React.useState<HTMLButtonElement | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!contentRef.current) throw new Error('Content ref is not assigned');

    const topLayer = getLayers().at(-1);

    const isPaused = topLayer !== contentRef.current;

    if (!open || isPaused) return;

    setOpen(false);
    trigger?.focus();
  };

  return (
    <MenuCtx
      value={{
        handleOpen,
        handleClose,
        open,
        contentId,
        setTrigger,
        trigger,
        loop,
        disableCloseOnEscape,
        contentRef,
      }}
    >
      {children}
    </MenuCtx>
  );
}

/* ———————————————————— Content ———————————————————— */

export function MenuContent({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const arrowRef = React.useRef<SVGSVGElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const ulRef = React.useRef<HTMLUListElement>(null);

  const menuCtx = useMenuCtx();

  const { contentRef } = menuCtx;

  const floatingReturn = useFloating<HTMLButtonElement>({
    open: menuCtx.open,
    placement: 'bottom',
    elements: { reference: menuCtx.trigger },
    whileElementsMounted: autoUpdate,
    strategy: 'absolute',
    middleware: [
      offsetMiddleware({ mainAxis: 3 + 7 /* 7 is arrow height */ }),
      flipMiddleware(),
      shiftMiddleware({ limiter: limitShift() }),
      // eslint-disable-next-line react-hooks/refs
      arrowMiddleware({
        element: arrowRef,
        padding: 10,
      }),
      size({
        apply({ rects, elements }) {
          elements.floating.style.setProperty(
            '--reference-width',
            `${rects.reference.width}px`,
          );
        },
      }),
      hideMiddleware({ strategy: 'referenceHidden' }),
    ],
  });

  const searchState = React.useRef<{
    timer?: ReturnType<typeof setTimeout>;
    chars: string;
  }>({ chars: '' }).current;

  useOnClickOutside(innerRef, (e) => {
    // NOTE: prevent default is important to return focus to trigger on click outside
    e.preventDefault();

    if (e.target !== menuCtx.trigger) menuCtx.handleClose();
  });

  useScrollLock({ isLocked: menuCtx.open });

  React.useEffect(() => {
    if (!floatingReturn.isPositioned) return;

    innerRef.current?.focus({ preventScroll: true });
  }, [floatingReturn.isPositioned]);

  const onEscape = useEffectEvent((e: KeyboardEvent) => {
    if (menuCtx.disableCloseOnEscape) return;

    if (e.key === 'Escape') {
      menuCtx.handleClose();
    }
  });

  React.useEffect(() => {
    document.addEventListener('keydown', onEscape);

    return () => {
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  const onkeydown = (e: React.KeyboardEvent) => {
    const key = e.key;

    const ArrowDown = key === 'ArrowDown';
    const ArrowUp = key === 'ArrowUp';

    if (!ArrowDown && !ArrowUp) return;

    const activeItems = getActiveItems(menuCtx.contentId);

    const currentIndex = activeItems.findIndex((ele) => ele.tabIndex === 0);

    let nextIndex: number | null = null;

    // either no menuitem is focused or loop from end to first
    if (
      (currentIndex === -1 && ArrowDown) ||
      (currentIndex === activeItems.length - 1 && menuCtx.loop && ArrowDown)
    ) {
      nextIndex = 0;
    }

    // loop from first to end when either no menuitem is focused or first is focused
    if (
      (currentIndex === 0 || currentIndex === -1) &&
      menuCtx.loop &&
      ArrowUp
    ) {
      nextIndex = activeItems.length - 1;
    }

    if (
      ArrowDown &&
      currentIndex >= 0 &&
      currentIndex < activeItems.length - 1
    ) {
      nextIndex = currentIndex + 1;
    }

    if (ArrowUp && currentIndex > 0 && currentIndex <= activeItems.length - 1) {
      nextIndex = currentIndex - 1;
    }

    if (nextIndex === null) return;

    for (const item of activeItems) {
      item.tabIndex = -1;
    }

    focusItem(activeItems[nextIndex], activeItems);
  };

  const handleCharSearch = (e: React.KeyboardEvent) => {
    const char = e.key;

    if (!char.trim() || char.length !== 1 || e.repeat) return;

    const activeItems = getActiveItems(menuCtx.contentId);

    const currentIndex = activeItems.findIndex((ele) => ele.tabIndex === 0);

    if (!activeItems.length) return;

    clearTimeout(searchState.timer);

    searchState.timer = setTimeout(() => {
      searchState.chars = '';
    }, 500);

    searchState.chars += char;

    const startIndex =
      currentIndex || currentIndex === 0 ? currentIndex + 1 : 0;

    const orderedOptions = [
      ...activeItems.slice(startIndex),
      ...activeItems.slice(0, startIndex),
    ];

    const filter = searchState.chars.toLowerCase();

    const excatMatch = orderedOptions.find((ele) =>
      ele.innerText.toLowerCase().startsWith(filter),
    );

    if (excatMatch) {
      focusItem(excatMatch, activeItems);
    } else {
      const sameLetters = filter
        .split('')
        .every((letter) => letter.toLowerCase() === filter[0]);

      if (sameLetters) {
        const matched = orderedOptions.find((ele) =>
          ele.innerText.toLowerCase().startsWith(filter),
        );

        if (matched) focusItem(matched, activeItems);
      }
    }
  };

  return (
    <div
      data-hide={!!floatingReturn.middlewareData.hide?.referenceHidden}
      id={menuCtx.contentId}
      tabIndex={-1}
      style={floatingReturn.floatingStyles}
      className={cn(
        'bg-background ring-foreground/10 relative z-50 w-(--reference-width) rounded-md p-1 shadow-md ring-1 outline-none data-[hide=true]:hidden',
        className,
      )}
      ref={(node) => {
        innerRef.current = node;
        floatingReturn.refs.setFloating(node);
        contentRef.current = node;

        if (!node) return;

        const topLayer = getLayers().at(-1);

        if (node.dataset.layerDepth) return;

        node.dataset.layerDepth = String(
          parseInt(topLayer?.dataset.layerDepth || '0') + 1,
        );
      }}
      data-layer
      onKeyDown={(e) => {
        onkeydown(e);
        handleCharSearch(e);
      }}
    >
      <FloatingArrow
        context={floatingReturn.context}
        ref={arrowRef}
        className='fill-foreground'
      />

      <ul ref={ulRef} role='menu' tabIndex={-1} className='outline-none'>
        {children}
      </ul>
    </div>
  );
}

/* ———————————————————— Trigger ———————————————————— */

export function MenuTrigger({
  children,
}: {
  children?: (props: React.ComponentPropsWithRef<'button'>) => React.ReactNode;
}) {
  const menuCtx = useMenuCtx();

  return (
    <>
      {children?.({
        ref: menuCtx.setTrigger,
        type: 'button',
        'aria-haspopup': 'menu',
        'aria-expanded': menuCtx.open,
        'aria-controls': menuCtx.open ? menuCtx.contentId : undefined,
        onClick: menuCtx.handleOpen,
      })}
    </>
  );
}

/* ———————————————————— Item Base ———————————————————— */

function ItemBase({
  disabled,
  onClick,
  variant,
  children,
  className,
  ...restProps
}: {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  role: string;
  'aria-checked'?: boolean;
  variant?: 'destructive';
  className?: string;
}) {
  const id = React.useId();

  const menuCtx = useMenuCtx();

  return (
    <li
      {...restProps}
      data-variant={variant}
      id={id}
      onClick={onClick}
      aria-disabled={disabled}
      onMouseEnter={(e) => {
        if (disabled) return;

        for (const item of getActiveItems(menuCtx.contentId)) {
          item.tabIndex = -1;
        }

        e.currentTarget.tabIndex = 0;
        e.currentTarget.focus();
      }}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();
          onClick?.(e as unknown as React.MouseEvent<HTMLLIElement>);
        }
      }}
      className={cn(
        'focus:bg-secondary [&_svg]:text-muted-foreground [&_kbd]:text-muted-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[variant=destructive]:text-red-600 dark:data-[variant=destructive]:text-red-400 [&_kbd]:inline-flex [&_kbd]:items-center [&_kbd]:justify-center [&_kbd]:gap-1 [&_kbd]:text-xs [&_kbd]:leading-0 [&_kbd]:font-medium [&_kbd]:tabular-nums [&_kbd>svg]:size-3.5 [&>svg]:size-4',
        className,
      )}
    >
      {children}
    </li>
  );
}

/* ———————————————————— Item ———————————————————— */

export function MenuItem({
  children,
  disableCloseOnClick,
  disabled,
  variant,
  className,
}: {
  children?: React.ReactNode;
  disabled?: boolean;
  disableCloseOnClick?: boolean;
  variant?: 'destructive';
  className?: string;
}) {
  const menuCtx = useMenuCtx();

  return (
    <ItemBase
      disabled={disabled}
      variant={variant}
      role='menuitem'
      className={className}
      onClick={() => {
        if (!disableCloseOnClick) menuCtx.handleClose();
      }}
    >
      {children}
    </ItemBase>
  );
}

/* ———————————————————— Checkbox Item ———————————————————— */

export function MenuCheckboxItem({
  children,
  checked,
  onChange,
  disableCloseOnChange,
  disabled,
  variant,
  className,
}: {
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disableCloseOnChange?: boolean;
  disabled?: boolean;
  variant?: 'destructive';
  className?: string;
}) {
  const menuCtx = useMenuCtx();

  return (
    <ItemBase
      disabled={disabled}
      variant={variant}
      role='menuitemcheckbox'
      aria-checked={checked}
      className={className}
      onClick={() => {
        if (!disableCloseOnChange) menuCtx.handleClose();
        onChange?.(!checked);
      }}
    >
      {children}
    </ItemBase>
  );
}

/* ———————————————————— Radio Group ———————————————————— */

interface MenuRadioGroupCtxProps {
  onChange?: (value: string) => void;
  value?: string;
}

const [MenuRadioGroupCtx, useMenuRadioGroupCtx] =
  createContextScope<MenuRadioGroupCtxProps>();

export const MenuRadioGroup = ({
  onChange,
  value,
  children,
}: {
  children?: React.ReactNode;
  onChange?: (value: string) => void;
  value?: string;
}) => {
  return (
    <MenuRadioGroupCtx value={{ value, onChange }}>
      {children}
    </MenuRadioGroupCtx>
  );
};

/* ———————————————————— Radio Item ———————————————————— */

export function MenuRadioItem({
  children,
  value,
  disableCloseOnChange,
  disabled,
  variant,
  className,
}: {
  children?: React.ReactNode;
  value: string;
  disableCloseOnChange?: boolean;
  disabled?: boolean;
  variant?: 'destructive';
  className?: string;
}) {
  const menuCtx = useMenuCtx();
  const menuRadioGroupCtx = useMenuRadioGroupCtx();

  const checked = value === menuRadioGroupCtx.value;

  return (
    <ItemBase
      disabled={disabled}
      variant={variant}
      role='menuitemradio'
      aria-checked={checked}
      className={className}
      onClick={() => {
        if (!disableCloseOnChange) menuCtx.handleClose();

        menuRadioGroupCtx.onChange?.(value);
      }}
    >
      {children}
    </ItemBase>
  );
}

/* ———————————————————— Separator ———————————————————— */

export function MenuSeparator({ className }: { className?: string }) {
  return (
    <div
      role='separator'
      className={cn('bg-foreground/10 my-1 h-px', className)}
    />
  );
}

/* ———————————————————— Group ———————————————————— */

const [MenuGroupProvider, useMenuGroupCtx] = createContextScope<{
  labelId?: string;
}>();

export function MenuGroup({ children }: { children?: React.ReactNode }) {
  const labelId = useId();

  return (
    <MenuGroupProvider value={{ labelId }}>
      <li role='none'>{children}</li>
    </MenuGroupProvider>
  );
}
/* ———————————————————— Group Label ———————————————————— */

export function MenuGroupLabel({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const { labelId } = useMenuGroupCtx();

  return (
    <div
      id={labelId}
      role='presentation'
      className={cn(
        'text-foreground/70 px-3 py-1.5 text-xs font-medium',
        className,
      )}
    >
      {children}
    </div>
  );
}
/* ———————————————————— Group Content ———————————————————— */

export function MenuGroupContent({ children }: { children?: React.ReactNode }) {
  const { labelId } = useMenuGroupCtx();

  return (
    <ul role='group' aria-labelledby={labelId}>
      {children}
    </ul>
  );
}

/* ———————————————————— Portal ———————————————————— */

export const MenuPortal = ({ children }: { children?: React.ReactNode }) => {
  const menuCtx = useMenuCtx();

  return (
    <>{menuCtx.open && createPortal(children, globalThis?.document?.body)}</>
  );
};

/* ———————————————————— Utils ———————————————————— */

const getActiveItems = (contentId: string) => {
  const allItems = Array.from(
    document.querySelectorAll<HTMLLIElement>(
      `#${contentId} [role="menuitem"], #${contentId} [role="menuitemradio"], #${contentId} [role="menuitemcheckbox"]`,
    ),
  );

  const activeItems = allItems.filter((item) => {
    return (
      !item.ariaDisabled &&
      !item.hidden &&
      getComputedStyle(item).display !== 'none'
    );
  });

  return activeItems;
};

const focusItem = (item: HTMLLIElement, activeItems: HTMLLIElement[]) => {
  for (const ele of activeItems) {
    ele.tabIndex = -1;
  }

  item.tabIndex = 0;
  item.focus();
};
