import React from 'react';
import { useControlled } from '~/stories/hooks/use-controlled/use-controlled';
import { createContextScope } from '~/stories/utils/context-scope/context-scope';

/* ———————————————————— Group ———————————————————— */

type ToggleButtonGroupProps<Exclusive> = {
  children?: React.ReactNode;
  className?: string;
} & (Exclusive extends true
  ? {
      exclusive: Exclusive;
      value?: string | null;
      defaultValue?: string | null;
      onValueChange?: (value: string | null) => void;
    }
  : {
      exclusive?: Exclusive;
      value?: string[];
      defaultValue?: string[];
      onValueChange?: (value: string[]) => void;
    });

interface GroupCtxProps {
  value: string | null | string[];
  setValue: (
    value:
      | string
      | null
      | string[]
      | ((prev: string | null | string[]) => string | null | string[]),
  ) => void;
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
    defaultValue,
    onValueChange,
    children,
    className,
  } = props;

  const [value, setValue] = useControlled({
    controlled: valueProp,
    defaultValue: exclusive ? (defaultValue ?? null) : (defaultValue ?? []),
    onChange: onValueChange as
      | ((value: string | null | string[]) => void)
      | undefined,
  });

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
      <div className={className}>{children}</div>
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
