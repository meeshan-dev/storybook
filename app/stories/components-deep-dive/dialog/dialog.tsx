import { useControlled } from '@base-ui/utils/useControlled';
import { useScrollLock } from '@base-ui/utils/useScrollLock';
import { FocusTrap, type FocusTrapProps } from 'focus-trap-react';
import React, { useEffectEvent, useRef } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { createContextScope } from '~/lib/context-scope';
import { getLayers } from '~/lib/get-layers';
import { useOnClickOutside } from '~/stories/hooks/use-on-click-outside';

type Reason = 'close-button' | 'escape' | 'outside';

export interface DialogRootProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  onClose?: (reason: Reason) => void;
}

interface DialogCtxProps {
  handleOpen: () => void;
  handleClose: (reason: Reason) => void;
  open: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const [DialogCtx, useDialogCtx] = createContextScope<DialogCtxProps>();

export { useDialogCtx };

export function DialogRoot(props: DialogRootProps) {
  const {
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    onClose,
  } = props;

  const contentId = React.useId();
  const titleId = React.useId();
  const descriptionId = React.useId();

  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useControlled({
    default: defaultOpen ?? false,
    controlled: openProp,
    name: 'Dialog',
    state: 'open',
  });

  const handleStateChange = (isOpen: boolean) => {
    setOpen(isOpen);
    onOpenChange?.(isOpen);
  };

  const handleOpen = () => {
    handleStateChange(true);
  };

  const handleClose = (reason: Reason) => {
    if (!contentRef.current) throw new Error('Content ref is not assigned');

    const topLayer = getLayers().at(-1);

    const isPaused = topLayer !== contentRef.current;

    if (!open || isPaused) return;

    handleStateChange(false);
    onClose?.(reason);
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

// <<--------------------Portal-------------------->>

export const DialogPortal = (props: {
  children?: React.ReactNode;
  container?: HTMLElement;
}) => {
  const { children, container = globalThis?.document?.body } = props;

  const dialogCtx = useDialogCtx();

  return dialogCtx.open ? createPortal(children, container) : null;
};

// <<--------------------Trigger-------------------->>

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

// <<--------------------Overlay-------------------->>

export function DialogOverlay(props: React.ComponentPropsWithRef<'div'>) {
  const { ...restProps } = props;

  return (
    <div
      {...restProps}
      className='fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs'
    />
  );
}

// <<--------------------Content-------------------->>

export interface DialogContentProps extends React.ComponentPropsWithRef<'div'> {
  focusTrapProps?: Omit<
    FocusTrapProps,
    'allowOutsideClick' | 'escapeDeactivates'
  >;
}

export function DialogContent(props: DialogContentProps) {
  const { ref, children, className, focusTrapProps, ...restProps } = props;

  const { contentRef, open, contentId, titleId, descriptionId, handleClose } =
    useDialogCtx();

  useScrollLock(open);

  useOnClickOutside(
    contentRef,
    () => {
      if (!contentRef.current) throw new Error('Content ref is not assigned');

      const topLayer = getLayers().at(-1);

      const isPaused = topLayer !== contentRef.current;

      if (isPaused) return;

      handleClose('outside');
    },
    'mousedown',
  );

  const onEscapeKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose('escape');
    }
  });

  React.useEffect(() => {
    document.addEventListener('keydown', onEscapeKeyDown);

    return () => {
      document.removeEventListener('keydown', onEscapeKeyDown);
    };
  }, []);

  return (
    <FocusTrap
      {...focusTrapProps}
      focusTrapOptions={{
        ...focusTrapProps?.focusTrapOptions,
        allowOutsideClick: true,
        escapeDeactivates: false,
      }}
    >
      <div
        {...restProps}
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
        data-layer
        role='dialog'
        aria-modal={true}
        id={contentId}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={twMerge(
          'bg-background ring-foreground/10 fixed top-1/2 left-1/2 z-50 grid w-[min(100%,calc(100%-2rem))] max-w-sm -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 ring-1 duration-100 outline-none',
          className,
        )}
      >
        {children}
      </div>
    </FocusTrap>
  );
}

// <<--------------------Close-------------------->>

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
          handleClose('close-button');
        },
      })}
    </>
  );
}

// <<--------------------Dialog Title-------------------->>

export function DialogTitle(props: React.ComponentPropsWithRef<'div'>) {
  const { children, ...restProps } = props;

  const { titleId } = useDialogCtx();

  return (
    <div id={titleId} {...restProps} className='text-base font-medium'>
      {children}
    </div>
  );
}

// <<--------------------Dialog Description-------------------->>

export function DialogDescription(props: React.ComponentPropsWithRef<'div'>) {
  const { children, ...restProps } = props;

  const { descriptionId } = useDialogCtx();

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
