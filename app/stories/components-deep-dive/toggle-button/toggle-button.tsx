import { useControlled } from '@base-ui/utils/useControlled';
import React from 'react';
import { createContextScope } from '~/lib/context-scope';

export type ToggleButtonGroupProps<Exclusive> = {
  children: React.ReactNode;
} & (Exclusive extends true
  ? {
      exclusive: Exclusive;
      value?: string | null;
      defaultValue?: string;
      onChange?: (value: string | null) => void;
    }
  : {
      exclusive?: Exclusive;
      value?: string[];
      defaultValue?: string[];
      onChange?: (value: string[]) => void;
    });

interface GroupCtxProps {
  value: string | null | string[];
  setValue: (value: string | null | string[]) => void;
  exclusive: boolean;
}

const [ToggleButtonCtx, useToggleButtonCtx] =
  createContextScope<GroupCtxProps>();

export const ToggleButtonGroup = <Exclusive extends boolean = false>(
  props: ToggleButtonGroupProps<Exclusive>,
) => {
  const {
    exclusive = false,
    value: valueProp,
    onChange,
    defaultValue,
    children,
  } = props;

  const [value, setValue] = useControlled({
    default: exclusive ? (defaultValue ?? null) : (defaultValue ?? []),
    controlled: valueProp,
    name: 'ToggleButtonGroup',
    state: 'value',
  });

  const handleValueChange = (val: typeof value) => {
    setValue(val);
    onChange?.(val as never);
  };

  if (exclusive && Array.isArray(value))
    throw new Error(
      `ToggleButtonGroup, \`value\` must be \`string\`, when \`exclusive\` is true`,
    );

  if (!exclusive && !Array.isArray(value))
    throw new Error(
      `ToggleButtonGroup, \`value\` must be \`string[]\`, when \`exclusive\` is false`,
    );

  return (
    <ToggleButtonCtx
      value={{
        value,
        setValue: handleValueChange,
        exclusive,
      }}
    >
      {children}
    </ToggleButtonCtx>
  );
};

// <<--------------------Toggle Button-------------------->>

export function ToggleButton({
  value: valueProp,
  children,
}: {
  value: string;
  children?: (
    props: React.ComponentProps<'button'>,
    state: { isSelected: boolean },
  ) => React.ReactNode;
}) {
  const groupCtx = useToggleButtonCtx({ shouldThrow: false });

  // Standalone state ONLY if no group
  const [standalone, setStandalone] = React.useState(false);

  const selected = groupCtx
    ? groupCtx.exclusive
      ? groupCtx.value === valueProp
      : Array.isArray(groupCtx.value) && groupCtx.value.includes(valueProp)
    : standalone;

  const handleClick = () => {
    if (groupCtx) {
      if (groupCtx.exclusive) {
        groupCtx.setValue(selected ? null : valueProp);
      } else {
        const value = groupCtx.value as string[];
        const next = selected
          ? value.filter((v) => v !== valueProp)
          : [...value, valueProp];

        groupCtx.setValue(next);
      }
    } else {
      setStandalone((prev) => !prev);
    }
  };

  return (
    <>
      {children?.(
        {
          ...{ 'data-selected': selected },
          'aria-pressed': selected,
          onClick: handleClick,
        },
        { isSelected: selected },
      )}
    </>
  );
}
