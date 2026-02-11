import React from 'react';
import { cn } from '~/lib/utils';
import { useControlled } from '~/stories/hooks/use-controlled/use-controlled';
import { createContextScope } from '~/stories/utils/context-scope/context-scope';

/* ———————————————————— Root ———————————————————— */

type CheckboxRootProps = Omit<
  React.ComponentPropsWithRef<'input'>,
  'checked'
> & {
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
};

const [CheckboxProvider, useCheckboxCtx] = createContextScope<{
  checked: boolean | 'indeterminate';
}>();

export function CheckboxRoot(props: CheckboxRootProps) {
  const {
    checked: checkedProp,
    defaultChecked = false,
    children,
    onCheckedChange,
    className,
    disabled,
    ...restProps
  } = props;

  const [checked, setChecked] = useControlled({
    controlled: checkedProp,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  const handleChecked = () => {
    if (checked === 'indeterminate') {
      setChecked(true);
    } else {
      setChecked(!checked);
    }
  };

  return (
    <CheckboxProvider value={{ checked }}>
      <div
        {...restProps}
        data-checked={checked === true ? '' : undefined}
        data-indeterminate={checked === 'indeterminate' ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        data-invalid={restProps['aria-invalid'] ? 'true' : undefined}
        className={cn(
          'border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary data-invalid:data-checked:border-primary data-invalid:border-destructive dark:data-invalid:border-destructive/50 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 data-invalid:ring-destructive/20 dark:data-invalid:ring-destructive/40 relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border shadow-xs transition-shadow outline-none has-[input:focus-visible]:ring-[3px] data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:ring-[3px]',
          className,
        )}
      >
        {/* Visually hidden native input for label association & form submission */}
        <input
          {...restProps}
          type='checkbox'
          checked={checked === true}
          disabled={disabled}
          aria-checked={checked === 'indeterminate' ? 'mixed' : undefined}
          onChange={handleChecked}
          className='sr-only'
        />
        {children}
      </div>
    </CheckboxProvider>
  );
}

/* ———————————————————— Icon ———————————————————— */

export function CheckboxIcon({
  type,
  children,
}: {
  type: 'box' | 'check' | 'indeterminate';
  children?: React.ReactNode;
}) {
  const { checked } = useCheckboxCtx();

  if (checked === 'indeterminate' && type === 'indeterminate') {
    return children;
  }

  if (checked === true && type === 'check') {
    return children;
  }

  if (checked === false && type === 'box') {
    return children;
  }

  return null;
}
