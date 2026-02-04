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
import React, { useEffectEvent, useRef } from 'react';
import { createPortal } from 'react-dom';
import { createContextScope } from '~/lib/context-scope';
import { getLayers } from '~/lib/get-layers';
import { cn } from '~/lib/utils';
import { useControlled } from '~/stories/hooks/use-controlled';
import { useOnClickOutside } from '~/stories/hooks/use-on-click-outside';

/* ———————————————————— Root ———————————————————— */

interface PopoverCtxProps {
  open: boolean;
  handleOpen(): void;
  handleClose(): void;
  contentId: string;
  setTrigger: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  trigger: HTMLButtonElement | null;
  titleId: string;
  descriptionId: string;
  contentRef: React.RefObject<HTMLElement | null>;
}

const [PopoverCtx, usePopoverCtx] = createContextScope<PopoverCtxProps>();

export const PopoverRoot = ({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const returnFocusToRef = React.useRef<HTMLElement | null>(null);

  const contentRef = React.useRef<HTMLElement | null>(null);

  const titleId = React.useId();
  const descriptionId = React.useId();

  const [open, setOpen] = useControlled({
    controlled: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const contentId = React.useId();
  const [trigger, setTrigger] = React.useState<HTMLButtonElement | null>(null);

  const handleOpen = () => {
    returnFocusToRef.current = document.activeElement as HTMLElement;
    setOpen(true);
  };

  const handleClose = () => {
    if (!contentRef.current) throw new Error('Content ref is not assigned');

    const topLayer = getLayers().at(-1);

    const isPaused = topLayer !== contentRef.current;

    if (!open || isPaused) return;

    setOpen(false);
    returnFocusToRef.current?.focus();
  };

  return (
    <PopoverCtx
      value={{
        handleOpen,
        handleClose,
        open,
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

/* ———————————————————— Trigger ———————————————————— */

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

/* ———————————————————— Content ———————————————————— */

export function PopoverContent({
  children,
  className,
  innerWrapperClassName,
  outerWrapperClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  outerWrapperClassName?: string;
  innerWrapperClassName?: string;
}) {
  const popoverCtx = usePopoverCtx();

  const { contentRef } = popoverCtx;

  const innerRef = React.useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);

  const floatingReturn = useFloating<HTMLButtonElement>({
    open: popoverCtx.open,
    placement: 'bottom',
    elements: { reference: popoverCtx.trigger },
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

  const { context, refs, floatingStyles } = floatingReturn;

  React.useEffect(() => {
    if (!floatingReturn.isPositioned) return;

    innerRef.current?.focus();
  }, [floatingReturn.isPositioned]);

  useOnClickOutside(innerRef, popoverCtx.handleClose, 'mousedown');

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
    <div
      ref={refs.setFloating}
      className={cn(
        'relative z-50 flex max-h-[calc(100%-2rem)] w-[min(100%,calc(100%-2rem))] max-w-lg data-[hide=true]:hidden',
        outerWrapperClassName,
      )}
      data-hide={!!floatingReturn.middlewareData.hide?.referenceHidden}
      style={floatingStyles}
    >
      <FloatingArrow
        context={context}
        ref={arrowRef}
        className='fill-foreground'
      />

      <div
        tabIndex={-1}
        role='dialog'
        id={popoverCtx.contentId}
        aria-labelledby={popoverCtx.titleId}
        aria-describedby={popoverCtx.descriptionId}
        data-layer={true}
        ref={(node) => {
          innerRef.current = node;
          contentRef.current = node;

          if (!node) return;

          const topLayer = getLayers().at(-1);

          if (node.dataset.layerDepth) return;

          node.dataset.layerDepth = String(
            parseInt(topLayer?.dataset.layerDepth || '0') + 1,
          );
        }}
        className={cn(
          'ring-foreground/10 bg-background flex grow overflow-hidden rounded-md p-0 ring-1 outline-none',
          innerWrapperClassName,
        )}
      >
        <div
          className={cn(
            'bg-background grid grow gap-6 overflow-auto p-6 text-sm',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ———————————————————— Portal ———————————————————— */

export const PopoverPortal = ({ children }: { children?: React.ReactNode }) => {
  const popoverCtx = usePopoverCtx();

  return (
    <>{popoverCtx.open && createPortal(children, globalThis?.document?.body)}</>
  );
};

/* ———————————————————— Close ———————————————————— */

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

/* ———————————————————— Header ———————————————————— */

export function PopoverHeader({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>;
}

/* ———————————————————— Footer ———————————————————— */

export function PopoverFooter({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-3 *:grow sm:flex-row sm:justify-end sm:*:grow-0',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ———————————————————— Title ———————————————————— */

export function PopoverTitle({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { titleId } = usePopoverCtx();

  return (
    <div id={titleId} className={cn('text-base font-medium', className)}>
      {children}
    </div>
  );
}

/* ———————————————————— Description ———————————————————— */

export function PopoverDescription({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { descriptionId } = usePopoverCtx();

  return (
    <div
      id={descriptionId}
      className={cn(
        'text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3',
        className,
      )}
    >
      {children}
    </div>
  );
}
