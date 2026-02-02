import React, { useEffectEvent, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createContextScope } from '~/lib/context-scope';
import { getLayers } from '~/lib/get-layers';
import { cn } from '~/lib/utils';
import { useFocusTrap } from '~/stories/hooks/use-focus-trap';
import { useOnClickOutside } from '~/stories/hooks/use-on-click-outside';
import { useScrollLock } from '~/stories/hooks/use-scroll-lock';

/* ———————————————————— Root ———————————————————— */

interface DialogCtxProps {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const [DialogCtx, useDialogCtx] = createContextScope<DialogCtxProps>();

export function DialogRoot({ children }: { children?: React.ReactNode }) {
  const contentId = React.useId();
  const titleId = React.useId();
  const descriptionId = React.useId();

  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

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
    <DialogCtx
      value={{
        handleClose,
        handleOpen,
        open,
        contentId,
        contentRef,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </DialogCtx>
  );
}

/* ———————————————————— Portal ———————————————————— */

export const DialogPortal = ({ children }: { children?: React.ReactNode }) => {
  const dialogCtx = useDialogCtx();

  return dialogCtx.open
    ? createPortal(children, globalThis?.document?.body)
    : null;
};

/* ———————————————————— Trigger ———————————————————— */

export function DialogTrigger({
  children,
}: {
  children: (props: React.ComponentPropsWithRef<'button'>) => React.ReactNode;
}) {
  const dialogCtx = useDialogCtx();

  return (
    <>
      {children({
        role: 'button',
        'aria-haspopup': 'dialog',
        'aria-expanded': dialogCtx.open,
        'aria-controls': dialogCtx.open ? dialogCtx.contentId : undefined,
        onClick: dialogCtx.handleOpen,
        ...{ 'data-open': dialogCtx.open },
      })}
    </>
  );
}

/* ———————————————————— Overlay ———————————————————— */

export function DialogOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs',
        className,
      )}
    />
  );
}

/* ———————————————————— Content ———————————————————— */

export function DialogContent({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { contentRef, open, contentId, titleId, descriptionId, handleClose } =
    useDialogCtx();

  useScrollLock({ isLocked: open });

  const focusTrapProps = useFocusTrap();

  useOnClickOutside(
    contentRef,
    () => {
      if (!contentRef.current) throw new Error('Content ref is not assigned');

      const topLayer = getLayers().at(-1);

      const isPaused = topLayer !== contentRef.current;

      if (isPaused) return;

      handleClose();
    },
    'mousedown',
  );

  const onEscapeKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  });

  React.useEffect(() => {
    document.addEventListener('keydown', onEscapeKeyDown);

    return () => {
      document.removeEventListener('keydown', onEscapeKeyDown);
    };
  }, []);

  return (
    <div
      ref={(node) => {
        contentRef.current = node;
        const cleanup = focusTrapProps.ref(node);

        if (!node) return;

        const topLayer = getLayers().at(-1);

        if (node.dataset.layerDepth) return;

        node.dataset.layerDepth = String(
          parseInt(topLayer?.dataset.layerDepth || '0') + 1,
        );

        return cleanup;
      }}
      onKeyDown={focusTrapProps.onKeyDown}
      tabIndex={focusTrapProps.tabIndex}
      data-layer
      role='dialog'
      aria-modal={true}
      id={contentId}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={cn(
        'bg-background ring-foreground/10 fixed top-1/2 left-1/2 z-50 grid w-[min(100%,calc(100%-2rem))] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 ring-1 duration-100 outline-none',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ———————————————————— Close ———————————————————— */

export function DialogClose({
  children,
}: {
  children: (props: React.ComponentPropsWithRef<'button'>) => React.ReactNode;
}) {
  const { handleClose } = useDialogCtx();

  return (
    <>
      {children({
        onClick: () => {
          handleClose();
        },
      })}
    </>
  );
}

/* ———————————————————— Title ———————————————————— */

export function DialogTitle({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { titleId } = useDialogCtx();

  return (
    <div id={titleId} className={cn('text-base font-medium', className)}>
      {children}
    </div>
  );
}

/* ———————————————————— Description ———————————————————— */

export function DialogDescription({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { descriptionId } = useDialogCtx();

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
