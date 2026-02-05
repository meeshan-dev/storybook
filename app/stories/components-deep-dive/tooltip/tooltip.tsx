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
  type Placement,
} from '@floating-ui/react';
import React, { useEffectEvent, useRef } from 'react';
import { createPortal } from 'react-dom';
import { createContextScope } from '~/lib/context-scope';
import { getLayers } from '~/lib/get-layers';
import { cn } from '~/lib/utils';
import { useControlled } from '~/stories/hooks/use-controlled';

/* ———————————————————— Root ———————————————————— */

type Trigger = 'hover' | 'focus';

interface TooltipCtxProps {
  showTooltip: (immediate?: boolean) => void;
  hideTooltip: (immediate?: boolean) => void;
  trigger?: Trigger;
  open: boolean;
  setTriggerEle: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  triggerEle: HTMLElement | null;
}

const [TooltipCtx, useTooltipCtx] = createContextScope<TooltipCtxProps>();

const tooltips: Record<string, (a: boolean) => void> = {};

export const TooltipRoot = ({
  children,
  showDelay = 100,
  hideDelay = 300,
  trigger,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled,
}: {
  children?: React.ReactNode;
  showDelay?: number;
  hideDelay?: number;
  trigger?: Trigger;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useControlled({
    controlled: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const identifier = React.useId();

  const showTimeoutRef = useRef<NodeJS.Timeout>(undefined);
  const hideTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  const [triggerEle, setTriggerEle] = React.useState<HTMLElement | null>(null);

  const hideTooltip = (immediate?: boolean) => {
    clearTimeout(showTimeoutRef.current);
    showTimeoutRef.current = undefined;

    if (immediate || hideDelay <= 0) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = undefined;
      setOpen(false);
    } else {
      hideTimeoutRef.current = setTimeout(() => {
        hideTimeoutRef.current = undefined;
        setOpen(false);
      }, hideDelay);
    }
  };

  const addOpenTooltip = () => {
    tooltips[identifier] = hideTooltip;
  };

  const closeOpenTooltips = () => {
    Object.entries(tooltips).forEach(([toHideIdentifier, hideTooltip]) => {
      if (toHideIdentifier === identifier) return;

      hideTooltip(true);
      delete tooltips[toHideIdentifier];
    });
  };

  const showTooltip = (immediate?: boolean) => {
    if (disabled) return;

    clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = undefined;

    closeOpenTooltips();
    addOpenTooltip();

    if (open) return;

    if (!immediate && showDelay > 0) {
      showTimeoutRef.current = setTimeout(() => {
        setOpen(true);
      }, showDelay);
    } else {
      setOpen(true);
    }
  };

  const hideTooltipOnDisable = useEffectEvent(hideTooltip);

  React.useEffect(() => {
    if (disabled) {
      hideTooltipOnDisable(true);
      delete tooltips[identifier];
    }
  }, [identifier, disabled]);

  React.useEffect(() => {
    return () => {
      clearTimeout(showTimeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
      delete tooltips[identifier];
    };
  }, [identifier]);

  return (
    <TooltipCtx
      value={{
        showTooltip,
        hideTooltip,
        trigger,
        open,
        setTriggerEle,
        triggerEle,
      }}
    >
      {children}
    </TooltipCtx>
  );
};

/* ———————————————————— Trigger ———————————————————— */

export function TooltipTrigger({
  children,
}: {
  children: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode;
}) {
  const tooltipCtx = useTooltipCtx();

  const isMouseRef = React.useRef(false);

  return (
    <>
      {/* eslint-disable-next-line react-hooks/refs */}
      {children({
        ...{
          ref: tooltipCtx.setTriggerEle,
          'data-open': tooltipCtx.open,
        },
        tabIndex: 0,
        onMouseDown: () => {
          isMouseRef.current = true;
          tooltipCtx.hideTooltip(true);
        },
        onMouseEnter: () => {
          if (tooltipCtx.trigger === 'focus') return;
          tooltipCtx.showTooltip(false);
        },
        onMouseLeave: () => {
          isMouseRef.current = false;
          if (tooltipCtx.trigger === 'focus') return;
          tooltipCtx.hideTooltip(false);
        },
        onKeyDown: (e) => {
          const key = e.key;
          if (key === 'Tab' || (key === 'Tab' && e.shiftKey))
            isMouseRef.current = false;
        },
        onFocus: () => {
          if (tooltipCtx.trigger === 'hover' || isMouseRef.current) return;
          tooltipCtx.showTooltip(true);
        },
        onBlur: () => {
          if (tooltipCtx.trigger === 'hover' || isMouseRef.current) return;
          tooltipCtx.hideTooltip(true);
        },
      })}
    </>
  );
}

/* ———————————————————— Portal ———————————————————— */

export const TooltipPortal = ({ children }: { children?: React.ReactNode }) => {
  const context = useTooltipCtx();

  return (
    <>{context.open && createPortal(children, globalThis?.document?.body)}</>
  );
};

/* ———————————————————— Content ———————————————————— */

export function TooltipContent({
  disableInteractive,
  children,
  className,
  placement,
}: {
  disableInteractive?: boolean;
  children?: React.ReactNode;
  className?: string;
  placement?: Placement;
}) {
  const tooltipCtx = useTooltipCtx();

  const arrowRef = useRef<SVGSVGElement | null>(null);

  const floatingReturn = useFloating<HTMLButtonElement>({
    open: tooltipCtx.open,
    placement: placement || 'top',
    elements: { reference: tooltipCtx.triggerEle },
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

  const onKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      tooltipCtx.hideTooltip(true);
    }
  });

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div
      style={floatingReturn.floatingStyles}
      ref={(node) => {
        floatingReturn.refs.setFloating(node);

        if (!node) return;

        const topLayer = getLayers().at(-1);

        if (node.dataset.layerDepth) return;

        node.dataset.layerDepth = String(
          parseInt(topLayer?.dataset.layerDepth || '0') + 1,
        );
      }}
      role='tooltip'
      onMouseEnter={() => {
        if (disableInteractive) return;
        tooltipCtx.showTooltip(true);
      }}
      onMouseLeave={() => {
        if (disableInteractive) return;
        tooltipCtx.hideTooltip(false);
      }}
      data-hide={!!floatingReturn.middlewareData.hide?.referenceHidden}
      data-layer={true}
      className={cn(
        'bg-background ring-foreground/10 z-50 rounded-md p-2 text-sm shadow-md ring-1 outline-none data-[hide=true]:hidden',
        className,
      )}
    >
      <FloatingArrow
        context={floatingReturn.context}
        ref={arrowRef}
        className='fill-foreground'
      />

      {children}
    </div>
  );
}
