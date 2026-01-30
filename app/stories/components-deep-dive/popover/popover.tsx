import { useControlled } from '@base-ui/utils/useControlled';
import {
  arrow as arrowMiddleware,
  autoUpdate,
  flip as flipMiddleware,
  hide as hideMiddleware,
  limitShift,
  offset as offsetMiddleware,
  shift as shiftMiddleware,
  useFloating,
  type Coords,
  type Placement,
  type Strategy,
} from '@floating-ui/react-dom';
import { FocusTrap } from 'focus-trap-react';
import React, { useEffectEvent } from 'react';
import { createPortal } from 'react-dom';
import { createContextScope } from '~/lib/context-scope';
import { getLayers } from '~/lib/get-layers';
import { useOnClickOutside } from '~/stories/hooks/use-on-click-outside';

export interface PopoverRootProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  keepMounted?: boolean;
}

interface PopoverCtxProps {
  open: boolean;
  handleOpen(): void;
  handleClose(): void;
  keepMounted: boolean;
  contentId: string;
  setTrigger: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  trigger: HTMLButtonElement | null;
  titleId: string;
  descriptionId: string;
  contentRef: React.RefObject<HTMLElement | null>;
}

const [PopoverCtx, usePopoverCtx] = createContextScope<PopoverCtxProps>();

export { usePopoverCtx };

export const PopoverRoot = (props: PopoverRootProps) => {
  const {
    children,
    defaultOpen,
    open: openProp,
    onOpenChange,
    keepMounted = false,
  } = props;

  const contentRef = React.useRef<HTMLElement | null>(null);

  const titleId = React.useId();
  const descriptionId = React.useId();

  const [open, setOpen] = useControlled({
    default: defaultOpen ?? false,
    controlled: openProp,
    name: 'PopoverRoot',
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
  };

  return (
    <PopoverCtx
      value={{
        handleOpen,
        handleClose,
        open,
        keepMounted,
        contentId,
        setTrigger,
        trigger,
        titleId,
        descriptionId,
        contentRef,
      }}
    >
      {children}
    </PopoverCtx>
  );
};

// <<--------------------Trigger-------------------->>

export function PopoverTrigger({
  children,
}: {
  children?: (props: React.ComponentPropsWithRef<'button'>) => React.ReactNode;
}) {
  const popoverCtx = usePopoverCtx();

  return (
    <>
      {children?.({
        ref: popoverCtx.setTrigger,
        'aria-expanded': popoverCtx.open,
        'aria-controls': popoverCtx.open ? popoverCtx.contentId : undefined,
        onClick: popoverCtx.handleOpen,
        ...{ 'data-open': popoverCtx.open },
      })}
    </>
  );
}

// <<--------------------Content-------------------->>

type FloatingArrowProps = Partial<Coords> & {
  placement: Placement;
  centerOffset?: number;
  alignmentOffset?: number;
  setFloatingArrow: React.Dispatch<
    React.SetStateAction<HTMLElement | SVGSVGElement | null>
  >;
};

export interface PopoverContentProps {
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
  children?: (
    props: React.ComponentPropsWithRef<'div'>,
    floatingArrowProps: FloatingArrowProps,
  ) => React.ReactNode;
}

export function PopoverContent(props: PopoverContentProps) {
  const {
    children,
    offset = 5,
    arrowPadding = 10,
    placement = 'bottom',
    strategy = 'absolute',
  } = props;

  const popoverCtx = usePopoverCtx();

  const { contentRef } = popoverCtx;

  const innerRef = React.useRef<HTMLDivElement>(null);

  const [floatingArrow, setFloatingArrow] = React.useState<
    HTMLElement | SVGSVGElement | null
  >(null);

  const floatingReturn = useFloating<HTMLButtonElement>({
    open: popoverCtx.open,
    placement,
    elements: { reference: popoverCtx.trigger },
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

  React.useEffect(() => {
    if (!floatingReturn.isPositioned) return;

    innerRef.current?.focus();
  }, [floatingReturn.isPositioned]);

  useOnClickOutside(
    innerRef,
    (e) => {
      if (!contentRef.current) throw new Error('Content ref is not assigned');

      const topLayer = getLayers().at(-1);

      const isPaused = topLayer !== contentRef.current;

      if (isPaused) return;

      if (e.target === popoverCtx.trigger) return;

      popoverCtx.handleClose();
    },
    'mousedown',
  );

  const arrowData = floatingReturn.middlewareData.arrow;

  const floatingArrowProps: FloatingArrowProps = {
    x: arrowData?.x,
    y: arrowData?.y,
    centerOffset: arrowData?.centerOffset,
    alignmentOffset: arrowData?.alignmentOffset,
    placement,
    setFloatingArrow,
  };

  const onEscape = useEffectEvent((e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    popoverCtx.handleClose();
  });

  React.useEffect(() => {
    document.addEventListener('keydown', onEscape);

    return () => {
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  return (
    <>
      <FocusTrap
        paused
        focusTrapOptions={{
          allowOutsideClick: true,
        }}
      >
        {children?.(
          // eslint-disable-next-line react-hooks/refs
          {
            tabIndex: -1,
            role: 'dialog',
            id: popoverCtx.contentId,
            style: floatingReturn.floatingStyles,
            'aria-labelledby': popoverCtx.titleId,
            'aria-describedby': popoverCtx.descriptionId,
            ref: (node) => {
              innerRef.current = node;
              floatingReturn.refs.setFloating(node);
              contentRef.current = node;

              if (!node) return;

              const topLayer = getLayers().at(-1);

              if (node.dataset.layerDepth) return;

              node.dataset.layerDepth = String(
                parseInt(topLayer?.dataset.layerDepth || '0') + 1,
              );
            },
            ...{
              'data-hide':
                !!floatingReturn.middlewareData.hide?.referenceHidden,
              'data-layer': true,
            },
          },
          floatingArrowProps,
        )}
      </FocusTrap>
    </>
  );
}

// <<--------------------Portal-------------------->>

export const PopoverPortal = ({
  children,
  container = globalThis?.document?.body,
}: {
  children?: React.ReactNode;
  container?: Element;
}) => {
  const popoverCtx = usePopoverCtx();

  return <>{popoverCtx.open && createPortal(children, container)}</>;
};

// <<--------------------Close-------------------->>

export function PopoverClose({
  children,
}: {
  children?: (props: React.ComponentProps<'button'>) => React.ReactNode;
}) {
  const popoverCtx = usePopoverCtx();

  return (
    <>
      {children?.({
        onClick: () => popoverCtx.handleClose(),
      })}
    </>
  );
}

// <<--------------------Popover Title-------------------->>

export function PopoverTitle(props: React.ComponentPropsWithRef<'div'>) {
  const { children, ...restProps } = props;

  const { titleId } = usePopoverCtx();

  return (
    <div id={titleId} {...restProps} className='text-base font-medium'>
      {children}
    </div>
  );
}

// <<--------------------Popover Description-------------------->>

export function PopoverDescription(props: React.ComponentPropsWithRef<'div'>) {
  const { children, ...restProps } = props;

  const { descriptionId } = usePopoverCtx();

  return (
    <div
      id={descriptionId}
      {...restProps}
      className='text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3'
    >
      {children}
    </div>
  );
}
