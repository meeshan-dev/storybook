import * as React from 'react';
import { createContextScope } from '~/lib/context-scope';
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
}: {
  children?: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
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
