import React, { useEffectEvent, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createContextScope } from '~/lib/context-scope';
import { getLayers } from '~/lib/get-layers';
import { useFocusTrap } from '~/stories/hooks/use-focus-trap';
import { useScrollLock } from '~/stories/hooks/use-scroll-lock';

/* ———————————————————— Root ———————————————————— */

const [AlertDialogCtx, useAlertDialogCtx] = createContextScope<{
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
}>();

export function AlertDialogRoot({ children }: ChildrenProp) {
  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

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

export const AlertDialogPortal = ({ children }: ChildrenProp) => {
  const { open } = useAlertDialogCtx();

  if (!open) return null;

  return <>{createPortal(children, document?.body)}</>;
};

/* ———————————————————— Overlay ———————————————————— */

export const AlertDialogOverlay = ({ children }: ChildrenProp) => {
  return (
    <div className='fixed inset-0 isolate z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs'>
      {children}
    </div>
  );
};

/* ———————————————————— Content ———————————————————— */

const [AlertDialogContentCtx, useAlertDialogContentCtx] = createContextScope<{
  titleId: string;
  descriptionId: string;
}>();

export function AlertDialogContent({ children }: ChildrenProp) {
  const { contentRef, handleClose } = useAlertDialogCtx();

  const focusTrapProps = useFocusTrap();

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
          const cleanup = focusTrapProps.ref(node);

          if (!node) return;

          const topLayer = getLayers().at(-1);

          if (node.dataset.layerDepth) return;

          node.dataset.layerDepth = String(
            parseInt(topLayer?.dataset.layerDepth || '0') + 1,
          );

          return cleanup;
        }}
        id={contentId}
        data-layer
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onKeyDown={focusTrapProps.onKeyDown}
        tabIndex={focusTrapProps.tabIndex}
        role='alertdialog'
        aria-modal={true}
        className='bg-background ring-foreground/10 fixed top-1/2 left-1/2 z-50 grid w-[min(100%,calc(100%-2rem))] max-w-sm -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 ring-1 outline-none'
      >
        {children}
      </div>
    </AlertDialogContentCtx>
  );
}

/* ———————————————————— Title ———————————————————— */

export function AlertDialogTitle({ children }: ChildrenProp) {
  const { titleId } = useAlertDialogContentCtx();

  return (
    <div id={titleId} className='text-base font-medium'>
      {children}
    </div>
  );
}

/* ———————————————————— Description ———————————————————— */

export function AlertDialogDescription({ children }: ChildrenProp) {
  const { descriptionId } = useAlertDialogContentCtx();

  return (
    <div
      id={descriptionId}
      className='text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3'
    >
      {children}
    </div>
  );
}
