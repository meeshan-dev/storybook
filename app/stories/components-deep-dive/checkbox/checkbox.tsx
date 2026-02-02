import React, { useState } from 'react';
import { createContextScope } from '~/lib/context-scope';

/* ———————————————————— Root ———————————————————— */

const [CheckboxProvider, useCheckboxCtx] = createContextScope<{
  checked: boolean;
  indeterminate: boolean;
}>();

export function CheckboxRoot(
  props: React.ComponentPropsWithRef<'input'> & {
    indeterminate?: boolean;
  },
) {
  const { defaultChecked, indeterminate, ref, children, ...restProps } = props;

  const innerRef = React.useRef<HTMLInputElement>(null);

  const [checked, setChecked] = useState(!!defaultChecked);

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
        className='sr-only'
        aria-checked={indeterminate ? 'mixed' : checked ? 'true' : 'false'}
        onChange={(e) => {
          const isChecked = e.target.checked;
          setChecked(isChecked);
        }}
      />

      {children}
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
