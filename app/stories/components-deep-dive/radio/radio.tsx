import React from 'react';
import { useControlled } from '~/stories/hooks/use-controlled/use-controlled';
import { createContextScope } from '~/stories/utils/context-scope/context-scope';

/* ———————————————————— Root ———————————————————— */

type RadioGroupContextValue = {
  name: string;
  value: string;
  setValue: (value: string) => void;
};

const [RadioGroupProvider, useRadioGroupCtx] =
  createContextScope<RadioGroupContextValue>();

const [RadioProvider, useRadioCtx] = createContextScope<{ checked: boolean }>();

export function RadioGroupRoot({
  value: valueProp,
  defaultValue = '',
  name,
  onValueChange,
  children,
}: {
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  name: string;
  onValueChange?: (value: string) => void;
}) {
  const [value, setValue] = useControlled({
    controlled: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

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
}: {
  children?: React.ReactNode;
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
