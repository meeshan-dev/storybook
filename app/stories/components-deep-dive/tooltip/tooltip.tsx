import { useControlled } from '@base-ui/utils/useControlled';
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
import React, { useEffectEvent, useRef } from 'react';
import { createPortal } from 'react-dom';
import { createContextScope } from '~/lib/context-scope';
import { getLayers } from '~/lib/get-layers';

type Trigger = 'hover' | 'focus';

export interface TooltipRootProps {
  children?: React.ReactNode;
  showDelay?: number;
  hideDelay?: number;
  /**
   * On which action tooltip shows. undefined means show tooltip on both 'hover' and 'keyboard focus'
   * @default undefined
   */
  trigger?: Trigger;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

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

export const TooltipRoot = (props: TooltipRootProps) => {
  const {
    children,
    showDelay = 100,
    hideDelay = 300,
    trigger,
    open: openProp,
    onOpenChange,
    defaultOpen,
    disabled,
  } = props;

  const [open, setOpen] = useControlled({
    default: defaultOpen ?? false,
    controlled: openProp,
    name: 'Tooltip',
    state: 'open',
  });

  const handleSetOpen = (value: boolean) => {
    setOpen(value);
    onOpenChange?.(value);
  };

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
      handleSetOpen(false);
    } else {
      hideTimeoutRef.current = setTimeout(() => {
        hideTimeoutRef.current = undefined;
        handleSetOpen(false);
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
        handleSetOpen(true);
      }, showDelay);
    } else {
      handleSetOpen(true);
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

// <<--------------------Trigger-------------------->>

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

// <<--------------------Portal-------------------->>

export const TooltipPortal = ({
  children,
  container = globalThis?.document?.body,
}: {
  children?: React.ReactNode;
  container?: Element;
}) => {
  const context = useTooltipCtx();

  return <>{context.open && createPortal(children, container)}</>;
};

// <<--------------------Content-------------------->>

type FloatingArrowProps = Partial<Coords> & {
  placement: Placement;
  centerOffset?: number;
  alignmentOffset?: number;
  setFloatingArrow: React.Dispatch<
    React.SetStateAction<HTMLElement | SVGSVGElement | null>
  >;
};

export interface TooltipContentProps {
  disableInteractive?: boolean;
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

export function TooltipContent(props: TooltipContentProps) {
  const {
    disableInteractive,
    children,
    offset = 5,
    arrowPadding = 10,
    placement = 'bottom',
    strategy = 'absolute',
  } = props;

  const tooltipCtx = useTooltipCtx();

  const [floatingArrow, setFloatingArrow] = React.useState<
    HTMLElement | SVGSVGElement | null
  >(null);

  const floatingReturn = useFloating<HTMLButtonElement>({
    open: tooltipCtx.open,
    placement,
    elements: { reference: tooltipCtx.triggerEle },
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

  const arrowData = floatingReturn.middlewareData.arrow;

  const floatingArrowProps: FloatingArrowProps = {
    x: arrowData?.x,
    y: arrowData?.y,
    centerOffset: arrowData?.centerOffset,
    alignmentOffset: arrowData?.alignmentOffset,
    placement,
    setFloatingArrow,
  };

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
    <>
      {children?.(
        {
          style: floatingReturn.floatingStyles,
          ref: (node) => {
            floatingReturn.refs.setFloating(node);

            if (!node) return;

            const topLayer = getLayers().at(-1);

            if (node.dataset.layerDepth) return;

            node.dataset.layerDepth = String(
              parseInt(topLayer?.dataset.layerDepth || '0') + 1,
            );
          },
          role: 'tooltip',
          onMouseEnter: () => {
            if (disableInteractive) return;
            tooltipCtx.showTooltip(true);
          },
          onMouseLeave: () => {
            if (disableInteractive) return;
            tooltipCtx.hideTooltip(false);
          },
          ...{
            'data-hide': !!floatingReturn.middlewareData.hide?.referenceHidden,
            'data-layer': true,
          },
        },
        floatingArrowProps,
      )}
    </>
  );
}
