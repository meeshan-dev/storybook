import React, { useState } from 'react';
import { createContextScope } from '~/lib/context-scope';

/* ———————————————————— Root ———————————————————— */

type RadioGroupContextValue = {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const [RadioGroupProvider, useRadioGroupCtx] =
  createContextScope<RadioGroupContextValue>();

const [RadioProvider, useRadioCtx] = createContextScope<{ checked: boolean }>();

export function RadioGroupRoot({
  defaultValue,
  name,
  children,
}: ChildrenProp & {
  defaultValue?: string;
  name: string;
}) {
  const [value, setValue] = useState(defaultValue || '');

  return (
    <RadioGroupProvider value={{ name, value, setValue }}>
      {children}
    </RadioGroupProvider>
  );
}

/* ———————————————————— Radio ———————————————————— */

export function Radio({
  value,
  children,
  disabled,
}: ChildrenProp & {
  disabled?: boolean;
  value: string;
}) {
  const group = useRadioGroupCtx();

  if (!value) throw new Error('Radio component requires a value prop.');

  const checked = group.value === value;

  return (
    <RadioProvider value={{ checked }}>
      <input
        type='radio'
        name={group.name}
        value={value}
        disabled={disabled}
        checked={checked}
        className='sr-only'
        onChange={(e) => {
          if (e.target.checked) {
            group.setValue(value);
          }
        }}
      />

      {children}
    </RadioProvider>
  );
}

/* ———————————————————— Icon ———————————————————— */

export function RadioIcon({
  type,
  children,
}: {
  type: 'box' | 'check';
  children?: React.ReactNode;
}) {
  const { checked } = useRadioCtx();

  if (checked && type === 'check') return children;
  if (!checked && type === 'box') return children;

  return null;
}
