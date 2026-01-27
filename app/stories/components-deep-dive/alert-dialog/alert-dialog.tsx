import { useControlled } from '@base-ui/utils/useControlled';
import { useScrollLock } from '@base-ui/utils/useScrollLock';
import { FocusTrap, type FocusTrapProps } from 'focus-trap-react';
import React, { useCallback, useEffectEvent } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { createContextScope } from '~/lib/context-scope';

export interface AlertDialogRootRef {
  close: () => void;
  open: () => void;
}

export interface AlertDialogRootProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  ref?: React.Ref<AlertDialogRootRef>;
}

const [AlertDialogCtx, useAlertDialogCtx] = createContextScope<{
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}>();

export function AlertDialogRoot(props: AlertDialogRootProps) {
  const { ref, children, open: openProp, defaultOpen, onOpenChange } = props;

  const [open, setOpen] = useControlled({
    default: defaultOpen ?? false,
    controlled: openProp,
    name: 'AlertDialog',
    state: 'open',
  });

  useScrollLock(open);

  const handleChange = useCallback(
    (value: boolean) => {
      setOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange, setOpen],
  );

  const handleOpen = useCallback(() => {
    handleChange(true);
  }, [handleChange]);

  const handleClose = useCallback(() => {
    // TODO: handle if paused

    if (!open) return;

    handleChange(false);
  }, [handleChange, open]);

  React.useImperativeHandle(
    ref,
    () => ({
      close: handleClose,
      open: handleOpen,
    }),
    [handleClose, handleOpen],
  );

  const handleKeydown = useEffectEvent((e: KeyboardEvent) => {
    if (!open) return;

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
    <AlertDialogCtx
      value={{
        open,
        handleOpen,
        handleClose,
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

  const { open } = useAlertDialogCtx();

  if (!open) return null;

  return (
    <div
      {...restProps}
      className='fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs'
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
  focusTrapProps?: FocusTrapProps;
}

const [AlertDialogContentCtx, useAlertDialogContentCtx] = createContextScope<{
  titleId: string;
  descriptionId: string;
}>();

export function AlertDialogContent(props: AlertDialogContentProps) {
  const { ref, children, id, className, focusTrapProps, ...restProps } = props;

  const { open } = useAlertDialogCtx();

  const titleId = React.useId();
  const descriptionId = React.useId();
  const __contentId = React.useId();

  const contentId = id ?? __contentId;

  if (!open) return null;

  return (
    <AlertDialogContentCtx value={{ titleId, descriptionId }}>
      <FocusTrap {...focusTrapProps}>
        <div
          ref={ref}
          id={contentId}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          {...restProps}
          role='alertdialog'
          aria-modal={true}
          className={twMerge(
            'bg-background ring-foreground/10 fixed top-1/2 left-1/2 z-50 grid w-full max-w-xs -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 ring-1 duration-100 outline-none sm:max-w-sm',
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
