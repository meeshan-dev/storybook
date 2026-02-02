import React, { useState } from 'react';
import { createContextScope } from '~/lib/context-scope';

/* ———————————————————— Group ———————————————————— */

type ToggleButtonGroupProps<Exclusive> = {
  children?: React.ReactNode;
} & (Exclusive extends true
    ? {
        exclusive: Exclusive;
        defaultValue?: string;
      }
    : {
        exclusive?: Exclusive;
        defaultValue?: string[];
      });

interface GroupCtxProps {
  value: string | null | string[];
  setValue: React.Dispatch<React.SetStateAction<string | null | string[]>>;
  exclusive: boolean;
}

const [ToggleButtonCtx, useToggleButtonCtx] =
  createContextScope<GroupCtxProps>();

export const ToggleButtonGroup = <Exclusive extends boolean = false>(
  props: ToggleButtonGroupProps<Exclusive>,
) => {
  const { exclusive = false, defaultValue, children } = props;

  const [value, setValue] = useState(
    exclusive ? (defaultValue ?? null) : (defaultValue ?? []),
  );

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
        setValue,
        exclusive,
      }}
    >
      {children}
    </ToggleButtonCtx>
  );
};

/* ———————————————————— Button ———————————————————— */

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
        groupCtx.setValue((prev) => {
          if (!Array.isArray(prev))
            throw new Error(
              'ToggledButton: Expected value to be an array in non-exclusive mode',
            );

          return selected
            ? prev.filter((v) => v !== valueProp)
            : [...prev, valueProp];
        });
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
