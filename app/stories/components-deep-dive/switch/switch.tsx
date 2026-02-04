import * as React from 'react';
import { createContextScope } from '~/lib/context-scope';
import { cn } from '~/lib/utils';
import { useControlled } from '~/stories/hooks/use-controlled';

/* ———————————————————— Root ———————————————————— */

const [SwitchProvider, useSwitchCtx] = createContextScope<{
  checked: boolean;
}>();

export function SwitchRoot({
  checked: checkedProp,
  defaultChecked = false,
  children,
  disabled,
  onCheckedChange,
  className,
}: {
  children?: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}) {
  const [checked, setChecked] = useControlled({
    controlled: checkedProp,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
  };

  return (
    <SwitchProvider value={{ checked }}>
      <div
        className={cn(
          'group bg-foreground/20 relative flex h-6 w-11 items-center rounded-full px-0.5 transition-colors has-[input:checked]:bg-emerald-600',
          className,
        )}
      >
        <input
          type='checkbox'
          role='switch'
          checked={checked}
          onChange={handleChange}
          className='sr-only'
          aria-checked={checked}
          disabled={disabled}
        />

        {children}
      </div>
    </SwitchProvider>
  );
}

/* ———————————————————— Icon ———————————————————— */

export function SwitchIcon({
  type,
  children,
}: {
  type: 'on' | 'off';
  children?: React.ReactNode;
}) {
  const { checked } = useSwitchCtx();

  if (checked && type === 'on') return children;
  if (!checked && type === 'off') return children;

  return null;
}

/* ———————————————————— Thumb ———————————————————— */

export function Thumb({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-background flex size-5 items-center justify-center rounded-full shadow transition-transform group-has-[input:checked]:translate-x-5',
        className,
      )}
    >
      {children}
    </div>
  );
}
