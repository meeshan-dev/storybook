import { useControlled } from '@base-ui/utils/useControlled';
import React from 'react';
import { createContextScope } from '~/lib/context-scope';

type RadioGroupContextValue = {
  name: string;
  value: string | null;
  onValueChange: (value: string) => void;
};

const [RadioGroupProvider, useRadioGroupCtx] =
  createContextScope<RadioGroupContextValue>();

const [RadioProvider, useRadioCtx] = createContextScope<{ checked: boolean }>();

/* -------------------- Radio Group -------------------- */

export function RadioGroup(props: {
  value?: string | null;
  defaultValue?: string | null;
  name: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}) {
  const {
    value: valueProp,
    defaultValue,
    onValueChange,
    name,
    children,
  } = props;

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue ?? null,
    name: 'RadioGroup',
  });

  const handleChange = (val: string) => {
    setValue(val);
    onValueChange?.(val);
  };

  return (
    <RadioGroupProvider value={{ name, value, onValueChange: handleChange }}>
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

  const checked = group.value === value;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      group.onValueChange(value);
    }
  };

  return (
    <RadioProvider value={{ checked }}>
      <input
        {...restProps}
        type='radio'
        name={group.name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className='sr-only'
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
