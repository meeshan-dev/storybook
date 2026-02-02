import * as React from 'react';
import { createContextScope } from '~/lib/context-scope';

/* ———————————————————— Root ———————————————————— */

const [SwitchProvider, useSwitchCtx] = createContextScope<{
  checked: boolean;
}>();

export function SwitchRoot({
  defaultChecked,
  children,
  disabled,
}: ChildrenProp & { disabled?: boolean; defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(!!defaultChecked);

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
