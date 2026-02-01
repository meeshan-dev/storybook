import * as React from 'react';
import { createContextScope } from '~/lib/context-scope';

const [SwitchProvider, useSwitchCtx] = createContextScope<{
  checked: boolean;
}>();

export function Switch(props: React.ComponentPropsWithRef<'input'>) {
  const { defaultChecked, ref, children, ...restProps } = props;

  const innerRef = React.useRef<HTMLInputElement>(null);

  const [checked, setChecked] = React.useState(!!defaultChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
  };

  return (
    <SwitchProvider value={{ checked }}>
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
        role='switch'
        checked={checked}
        onChange={handleChange}
        className='sr-only'
        aria-checked={checked}
      />

      {children}
    </SwitchProvider>
  );
}

// <<--------------------Switch Icon-------------------->>

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
