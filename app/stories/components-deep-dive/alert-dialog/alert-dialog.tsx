import React, { useEffectEvent, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getLayers } from '~/lib/get-layers';
import { cn } from '~/lib/utils';
import { useControlled } from '~/stories/hooks/use-controlled/use-controlled';
import { useFocusTrap } from '~/stories/hooks/use-focus-trap/use-focus-trap';
import { useScrollLock } from '~/stories/hooks/use-scroll-lock/use-scroll-lock';
import { createContextScope } from '~/stories/utils/context-scope/context-scope';

/* ———————————————————— Root ———————————————————— */

const [AlertDialogCtx, useAlertDialogCtx] = createContextScope<{
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
}>();

export function AlertDialogRoot({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useControlled({
    controlled: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

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

/* ———————————————————— Trigger ———————————————————— */

export const AlertDialogTrigger = ({
  children,
}: {
  children?: (
    props: Omit<React.ComponentProps<'button'>, 'children'>,
  ) => React.ReactNode;
}) => {
  const { handleOpen } = useAlertDialogCtx();

  return <>{children?.({ onClick: handleOpen })}</>;
};

/* ———————————————————— Close ———————————————————— */

export const AlertDialogClose = ({
  children,
}: {
  children?: (
    props: Omit<React.ComponentProps<'button'>, 'children'>,
  ) => React.ReactNode;
}) => {
  const { handleClose } = useAlertDialogCtx();

  return (
    <>
      {children?.({
        onClick: handleClose,
      })}
    </>
  );
};

/* ———————————————————— Portal ———————————————————— */

export const AlertDialogPortal = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { open } = useAlertDialogCtx();

  if (!open) return null;

  return <>{createPortal(children, document?.body)}</>;
};

/* ———————————————————— Overlay ———————————————————— */

export const AlertDialogOverlay = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 isolate z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs',
        className,
      )}
    >
      {children}
    </div>
  );
};

/* ———————————————————— Content ———————————————————— */

const [AlertDialogContentCtx, useAlertDialogContentCtx] = createContextScope<{
  titleId: string;
  descriptionId: string;
}>();

export function AlertDialogContent({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { contentRef, handleClose } = useAlertDialogCtx();

  const focusTrapProps = useFocusTrap({ enabled: true });

  const titleId = React.useId();
  const descriptionId = React.useId();
  const contentId = React.useId();

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
      <div
        ref={(node) => {
          contentRef.current = node;
          focusTrapProps.ref(node);

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
        onKeyDown={focusTrapProps.onKeyDown}
        tabIndex={focusTrapProps.tabIndex}
        role='alertdialog'
        aria-modal={true}
        className={cn(
          'bg-background ring-foreground/10 fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100%-2rem)] w-[min(100%,calc(100%-2rem))] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-6 overflow-auto rounded-xl p-6 text-sm ring-1 duration-100 outline-none',
          className,
        )}
      >
        {children}
      </div>
    </AlertDialogContentCtx>
  );
}

/* ———————————————————— Header ———————————————————— */

export function AlertDialogHeader({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('space-y-2', className)}>{children}</div>;
}

/* ———————————————————— Footer ———————————————————— */

export function AlertDialogFooter({
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

export function AlertDialogTitle({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { titleId } = useAlertDialogContentCtx();

  return (
    <div id={titleId} className={cn('text-base font-medium', className)}>
      {children}
    </div>
  );
}

/* ———————————————————— Description ———————————————————— */

export function AlertDialogDescription({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { descriptionId } = useAlertDialogContentCtx();

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
