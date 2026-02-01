import React, { useState } from 'react';
import { createContextScope } from '~/lib/context-scope';

type RadioGroupContextValue = {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const [RadioGroupProvider, useRadioGroupCtx] =
  createContextScope<RadioGroupContextValue>();

const [RadioProvider, useRadioCtx] = createContextScope<{ checked: boolean }>();

/* -------------------- Radio Group -------------------- */

export function RadioGroup(props: {
  defaultValue?: string;
  name: string;
  children: React.ReactNode;
}) {
  const { defaultValue, name, children } = props;

  const [value, setValue] = useState(defaultValue || '');

  return (
    <RadioGroupProvider value={{ name, value, setValue }}>
      {children}
    </RadioGroupProvider>
  );
}

/* -------------------- Radio -------------------- */

export function Radio(
  props: Omit<React.ComponentPropsWithRef<'input'>, 'value'> & {
    value: string;
  },
) {
  const { value, children, ...restProps } = props;

  const group = useRadioGroupCtx();

  if (!value) throw new Error('Radio component requires a value prop.');

  const checked = group.value === value;

  return (
    <RadioProvider value={{ checked }}>
      <input
        {...restProps}
        type='radio'
        name={group.name}
        value={value}
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

/* -------------------- Radio Icon -------------------- */

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
