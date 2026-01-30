import { useControlled } from '@base-ui/utils/useControlled';
import { useScrollLock } from '@base-ui/utils/useScrollLock';
import {
  type Coords,
  type Placement,
  type Strategy,
  arrow as arrowMiddleware,
  autoUpdate,
  flip as flipMiddleware,
  hide as hideMiddleware,
  limitShift,
  offset as offsetMiddleware,
  shift as shiftMiddleware,
  useFloating,
} from '@floating-ui/react-dom';
import React, { useEffectEvent, useId } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { createContextScope } from '~/lib/context-scope';
import { getLayers } from '~/lib/get-layers';
import { useOnClickOutside } from '~/stories/hooks/use-on-click-outside';

export interface MenuRootProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  loop?: boolean;
  disableCloseOnEscape?: boolean;
}

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

export function MenuRoot(props: MenuRootProps) {
  const {
    children,
    defaultOpen,
    open: openProp,
    onOpenChange,
    loop = false,
    disableCloseOnEscape = false,
  } = props;

  const contentRef = React.useRef<HTMLElement | null>(null);

  const [open, setOpen] = useControlled({
    default: defaultOpen ?? false,
    controlled: openProp,
    name: 'MenuRoot',
    state: 'open',
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    onOpenChange?.(isOpen);
  };

  const contentId = React.useId();

  const [trigger, setTrigger] = React.useState<HTMLButtonElement | null>(null);

  const handleOpen = () => {
    handleOpenChange(true);
  };

  const handleClose = () => {
    if (!contentRef.current) throw new Error('Content ref is not assigned');

    const topLayer = getLayers().at(-1);

    const isPaused = topLayer !== contentRef.current;

    if (!open || isPaused) return;

    handleOpenChange(false);
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

// <<--------------------Content-------------------->>

export interface MenuContentProps extends React.ComponentPropsWithRef<'ul'> {
  /** distance between combobox and listbox
   * @default 5
   */
  offset?: number;
  /** padding used to prevent arrow to touch content edges. its usefull when content has rounded corners.
   * @default 10
   */
  arrowPadding?: number;
  /** @default bottom */
  placement?: Placement;
  /** @default absolute */
  strategy?: Strategy;
  arrow?: (props: FloatingArrowProps) => React.ReactNode;
}

type FloatingArrowProps = Partial<Coords> & {
  placement: Placement;
  centerOffset?: number;
  alignmentOffset?: number;
  setFloatingArrow: React.Dispatch<
    React.SetStateAction<HTMLElement | SVGSVGElement | null>
  >;
};

export function MenuContent(props: MenuContentProps) {
  const {
    ref,
    children,
    className,
    offset = 5,
    arrowPadding = 10,
    placement = 'bottom',
    strategy = 'absolute',
    arrow,
    ...restProps
  } = props;

  const [floatingArrow, setFloatingArrow] = React.useState<
    HTMLElement | SVGSVGElement | null
  >(null);

  const innerRef = React.useRef<HTMLUListElement>(null);

  const menuCtx = useMenuCtx();

  const { contentRef } = menuCtx;

  const floatingReturn = useFloating<HTMLButtonElement>({
    open: menuCtx.open,
    placement,
    elements: { reference: menuCtx.trigger },
    whileElementsMounted: autoUpdate,
    strategy,
    middleware: [
      offsetMiddleware({ mainAxis: offset }),
      flipMiddleware(),
      shiftMiddleware({ limiter: limitShift() }),
      arrowMiddleware({
        element: floatingArrow,
        padding: arrowPadding,
      }),
      hideMiddleware({ strategy: 'referenceHidden' }),
    ],
  });

  const searchState = React.useRef<{
    timer?: ReturnType<typeof setTimeout>;
    chars: string;
  }>({ chars: '' }).current;

  useOnClickOutside(innerRef, (e) => {
    if (e.target !== menuCtx.trigger) menuCtx.handleClose();
  });

  useScrollLock(menuCtx.open);

  React.useEffect(() => {
    if (!floatingReturn.isPositioned) return;

    innerRef.current?.focus();
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

    if (char.length !== 1 || e.repeat) return;

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

  const arrowData = floatingReturn.middlewareData.arrow;

  const floatingArrowProps: FloatingArrowProps = {
    x: arrowData?.x,
    y: arrowData?.y,
    centerOffset: arrowData?.centerOffset,
    alignmentOffset: arrowData?.alignmentOffset,
    placement,
    setFloatingArrow,
  };

  return (
    <ul
      {...restProps}
      id={menuCtx.contentId}
      role='menu'
      data-hide={!!floatingReturn.middlewareData.hide?.referenceHidden}
      style={{
        ...restProps.style,
        ...floatingReturn.floatingStyles,
      }}
      ref={(node) => {
        innerRef.current = node;
        floatingReturn.refs.setFloating(node);
        contentRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }

        if (!node) return;

        const topLayer = getLayers().at(-1);

        if (node.dataset.layerDepth) return;

        node.dataset.layerDepth = String(
          parseInt(topLayer?.dataset.layerDepth || '0') + 1,
        );
      }}
      data-layer
      className={twMerge(
        'bg-background ring-foreground/10 z-50 max-w-sm rounded-md p-1 ring-1 outline-none',
        'w-xs',
        className,
      )}
      tabIndex={-1}
      onKeyDown={(e) => {
        onkeydown(e);
        handleCharSearch(e);
      }}
    >
      {arrow && arrow(floatingArrowProps)}
      {children}
    </ul>
  );
}

// <<--------------------Trigger-------------------->>

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
        role: 'button',
        'aria-haspopup': 'menu',
        'aria-expanded': menuCtx.open,
        'aria-controls': menuCtx.open ? menuCtx.contentId : undefined,
        onClick: menuCtx.handleOpen,
        ...{ 'data-open': menuCtx.open },
      })}
    </>
  );
}

// <<--------------------Item Implement-------------------->>

interface ItemBasePorps extends React.ComponentPropsWithRef<'li'> {
  disabled?: boolean;
}

function ItemBase(props: ItemBasePorps) {
  const { disabled, onClick, className, ...restProps } = props;

  const id = React.useId();

  const menuCtx = useMenuCtx();

  return (
    <li
      {...restProps}
      id={id}
      onClick={onClick}
      aria-disabled={disabled}
      onMouseEnter={(e) => {
        restProps.onMouseEnter?.(e);

        if (disabled) return;

        for (const item of getActiveItems(menuCtx.contentId)) {
          item.tabIndex = -1;
        }

        e.currentTarget.tabIndex = 0;
        e.currentTarget.focus();
      }}
      onKeyDown={(e) => {
        restProps.onKeyDown?.(e);

        const key = e.key;

        if (![' ', 'Tab'].includes(key)) return;

        e.preventDefault();
        onClick?.(e as unknown as React.MouseEvent<HTMLLIElement>);
      }}
      className={twMerge(
        'focus:bg-secondary flex gap-2 rounded-md px-3 py-2 text-sm outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50 *:[svg]:size-4',
        className,
      )}
    />
  );
}

// <<--------------------Item-------------------->>

export interface MenuItemProps extends ItemBasePorps {
  disableCloseOnClick?: boolean;
}

export function MenuItem(props: MenuItemProps) {
  const { children, onClick, disableCloseOnClick, ...restProps } = props;

  const menuCtx = useMenuCtx();

  return (
    <ItemBase
      {...restProps}
      role='menuitem'
      onClick={(e) => {
        if (!disableCloseOnClick) menuCtx.handleClose();

        onClick?.(e);
      }}
    >
      {children}
    </ItemBase>
  );
}

// <<--------------------Checkbox Item-------------------->>

export interface MenuCheckboxItemProps extends Omit<ItemBasePorps, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disableCloseOnChange?: boolean;
}

export function MenuCheckboxItem(props: MenuCheckboxItemProps) {
  const { children, checked, onChange, disableCloseOnChange, ...restProps } =
    props;

  const menuCtx = useMenuCtx();

  return (
    <ItemBase
      {...restProps}
      role='menuitemcheckbox'
      aria-checked={checked}
      onClick={() => {
        if (!disableCloseOnChange) menuCtx.handleClose();
        onChange?.(!checked);
      }}
    >
      {children}
    </ItemBase>
  );
}

// <<--------------------Radio Group-------------------->>

export interface MenuRadioGroupProps {
  onChange?: (value: string) => void;
  value?: string;
  children?: React.ReactNode;
}

interface MenuRadioGroupCtxProps {
  onChange?: (value: string) => void;
  value?: string;
}

const [MenuRadioGroupCtx, useMenuRadioGroupCtx] =
  createContextScope<MenuRadioGroupCtxProps>();

export const MenuRadioGroup = (props: MenuRadioGroupProps) => {
  const { onChange, value, children } = props;

  return (
    <MenuRadioGroupCtx value={{ value, onChange }}>
      {children}
    </MenuRadioGroupCtx>
  );
};

// <<--------------------Radio Item-------------------->>

export interface MenuRadioItemProps extends ItemBasePorps {
  value: string;
  disableCloseOnChange?: boolean;
}

export function MenuRadioItem(props: MenuRadioItemProps) {
  const { children, value, disableCloseOnChange, ...restProps } = props;

  const menuCtx = useMenuCtx();
  const menuRadioGroupCtx = useMenuRadioGroupCtx();

  const checked = value === menuRadioGroupCtx.value;

  return (
    <ItemBase
      {...restProps}
      role='menuitemradio'
      aria-checked={checked}
      onClick={() => {
        if (!disableCloseOnChange) menuCtx.handleClose();

        menuRadioGroupCtx.onChange?.(value);
      }}
    >
      {children}
    </ItemBase>
  );
}

// <<--------------------Separator-------------------->>

export function MenuSeparator(
  props: Omit<React.ComponentPropsWithRef<'div'>, 'children'>,
) {
  const { className, ...restProps } = props;

  return (
    <div
      {...restProps}
      role='separator'
      className={twMerge('bg-foreground/10 my-1 h-px', className)}
    />
  );
}

// <<--------------------Group-------------------->>

const [MenuGroupProvider, useMenuGroupCtx] = createContextScope<{
  labelId?: string;
}>();

export function MenuGroup(props: React.ComponentPropsWithRef<'li'>) {
  const { className, children, ...restProps } = props;

  const labelId = useId();

  return (
    <MenuGroupProvider value={{ labelId }}>
      <li {...restProps} role='none' className={className}>
        {children}
      </li>
    </MenuGroupProvider>
  );
}
// <<--------------------Group Label-------------------->>

export function MenuGroupLabel(
  props: Omit<React.ComponentPropsWithRef<'div'>, 'children'> & {
    children: string;
  },
) {
  const { className, children, ...restProps } = props;

  const { labelId } = useMenuGroupCtx();

  return (
    <div
      {...restProps}
      id={labelId}
      role='presentation'
      className={twMerge(
        'text-foreground/70 px-3 py-1.5 text-xs font-medium',
        className,
      )}
    >
      {children}
    </div>
  );
}
// <<--------------------Group Content-------------------->>

export function MenuGroupContent(props: React.ComponentPropsWithRef<'ul'>) {
  const { className, ...restProps } = props;

  const { labelId } = useMenuGroupCtx();

  return (
    <ul
      {...restProps}
      role='group'
      aria-labelledby={labelId}
      className={className}
    />
  );
}

// <<--------------------Portal-------------------->>

export const MenuPortal = ({
  children,
  container = globalThis?.document?.body,
}: {
  children?: React.ReactNode;
  container?: Element;
}) => {
  const menuCtx = useMenuCtx();

  return <>{menuCtx.open && createPortal(children, container)}</>;
};

// <<--------------------Utils-------------------->>

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
