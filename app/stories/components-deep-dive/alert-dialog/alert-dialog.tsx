import { FocusTrap, type FocusTrapProps } from 'focus-trap-react';
import React, { useEffectEvent, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { createContextScope } from '~/lib/context-scope';
import { getLayers } from '~/lib/get-layers';
import { useScrollLock } from '~/stories/hooks/use-scroll-lock';

export interface AlertDialogRootProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

const [AlertDialogCtx, useAlertDialogCtx] = createContextScope<{
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
}>();

export function AlertDialogRoot(props: AlertDialogRootProps) {
  const { children, defaultOpen } = props;

  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(!!defaultOpen);

  useScrollLock({ isLocked: open });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!contentRef.current) throw new Error('Content ref is not assigned');

    const topLayer = getLayers().at(-1);

    const isPaused = topLayer !== contentRef.current;

    if (!open || isPaused) return;

    setOpen(false);
  };

  return (
    <AlertDialogCtx
      value={{
        open,
        handleOpen,
        handleClose,
        contentRef,
      }}
    >
      {children}
    </AlertDialogCtx>
  );
}

// <<--------------------Alert Dialog Trigger-------------------->>

export const AlertDialogTrigger = (
  props: Omit<React.ComponentPropsWithRef<'button'>, 'children'> & {
    children?: (
      props: Omit<React.ComponentPropsWithRef<'button'>, 'children'>,
    ) => React.ReactNode;
  },
) => {
  const { onClick, children, ...restProps } = props;

  const { handleOpen } = useAlertDialogCtx();

  return (
    <>
      {children?.({
        ...restProps,
        onClick: (e) => {
          handleOpen();
          onClick?.(e);
        },
      })}
    </>
  );
};

// <<--------------------Alert Dialog Close-------------------->>

export const AlertDialogClose = (
  props: Omit<React.ComponentPropsWithRef<'button'>, 'children'> & {
    children?: (
      props: Omit<React.ComponentPropsWithRef<'button'>, 'children'>,
    ) => React.ReactNode;
  },
) => {
  const { onClick, children, ...restProps } = props;

  const { handleClose } = useAlertDialogCtx();

  return (
    <>
      {children?.({
        ...restProps,
        onClick: (e) => {
          handleClose();
          onClick?.(e);
        },
      })}
    </>
  );
};

// <<--------------------Alert Dialog Portal-------------------->>

export const AlertDialogPortal = (props: {
  container?: HTMLElement;
  children?: React.ReactNode;
}) => {
  const { children, container = globalThis?.document?.body } = props;

  const { open } = useAlertDialogCtx();

  if (!open) return null;

  return <>{createPortal(children, container)}</>;
};

// <<--------------------Alert Dialog Overlay-------------------->>

export const AlertDialogOverlay = (
  props: React.ComponentPropsWithRef<'div'>,
) => {
  const { children, ...restProps } = props;

  return (
    <div
      {...restProps}
      className='fixed inset-0 isolate z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs'
    >
      {children}
    </div>
  );
};

// <<--------------------Alert Dialog Content-------------------->>

export interface AlertDialogContentProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  'role' | 'aria-modal'
> {
  focusTrapProps?: Omit<
    FocusTrapProps,
    'allowOutsideClick' | 'escapeDeactivates'
  >;
}

const [AlertDialogContentCtx, useAlertDialogContentCtx] = createContextScope<{
  titleId: string;
  descriptionId: string;
}>();

export function AlertDialogContent(props: AlertDialogContentProps) {
  const { ref, children, id, className, focusTrapProps, ...restProps } = props;

  const { contentRef, handleClose } = useAlertDialogCtx();

  const titleId = React.useId();
  const descriptionId = React.useId();
  const __contentId = React.useId();

  const contentId = id ?? __contentId;

  const handleKeydown = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  });

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <AlertDialogContentCtx value={{ titleId, descriptionId }}>
      <FocusTrap
        {...focusTrapProps}
        focusTrapOptions={{
          ...focusTrapProps?.focusTrapOptions,
          allowOutsideClick: true,
          escapeDeactivates: false,
        }}
      >
        <div
          ref={(node) => {
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
          id={contentId}
          data-layer
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          {...restProps}
          role='alertdialog'
          aria-modal={true}
          className={twMerge(
            'bg-background ring-foreground/10 fixed top-1/2 left-1/2 z-50 grid w-[min(100%,calc(100%-2rem))] max-w-sm -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 ring-1 outline-none',
            className,
          )}
        >
          {children}
        </div>
      </FocusTrap>
      ,
    </AlertDialogContentCtx>
  );
}

// <<--------------------Alert Dialog Title-------------------->>

export function AlertDialogTitle(props: React.ComponentPropsWithRef<'div'>) {
  const { children, ...restProps } = props;

  const { titleId } = useAlertDialogContentCtx();

  return (
    <div id={titleId} {...restProps} className='text-base font-medium'>
      {children}
    </div>
  );
}

// <<--------------------Alert Dialog Description-------------------->>

export function AlertDialogDescription(
  props: React.ComponentPropsWithRef<'div'>,
) {
  const { children, ...restProps } = props;

  const { descriptionId } = useAlertDialogContentCtx();

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
