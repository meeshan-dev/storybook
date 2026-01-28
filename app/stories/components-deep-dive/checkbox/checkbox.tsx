import { useControlled } from '@base-ui/utils/useControlled';
import React from 'react';
import { createContextScope } from '~/lib/context-scope';

const [CheckboxProvider, useCheckboxCtx] = createContextScope<{
  checked: boolean;
  indeterminate: boolean;
}>();

export function Checkbox(
  props: React.ComponentPropsWithRef<'input'> & {
    indeterminate?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  },
) {
  const {
    checked: checkedProp,
    defaultChecked,
    indeterminate,
    onCheckedChange,
    ref,
    children,
    ...restProps
  } = props;

  const innerRef = React.useRef<HTMLInputElement>(null);

  const [checked, setChecked] = useControlled({
    controlled: checkedProp,
    default: !!defaultChecked,
    name: 'Checkbox',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onCheckedChange?.(isChecked);
  };

  React.useEffect(() => {
    if (!innerRef.current) return;

    innerRef.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  return (
    <CheckboxProvider value={{ checked, indeterminate: !!indeterminate }}>
      <input
        {...restProps}
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        type='checkbox'
        checked={checked}
        onChange={handleChange}
        tabIndex={-1}
        className='sr-only'
        aria-checked={indeterminate ? 'mixed' : checked ? 'true' : 'false'}
      />

      {children}
    </CheckboxProvider>
  );
}

// <<--------------------Checkbox Icon-------------------->>

export function CheckboxIcon({
  type,
  children,
}: {
  type: 'box' | 'check' | 'indeterminate';
  children?: React.ReactNode;
}) {
  const { checked, indeterminate } = useCheckboxCtx();

  if (indeterminate && type === 'indeterminate') {
    return children;
  }

  if (checked && type === 'check') {
    return children;
  }

  if (!checked && !indeterminate && type === 'box') {
    return children;
  }

  return null;
}
