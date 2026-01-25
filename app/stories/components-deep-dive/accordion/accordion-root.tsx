import { useControlled } from '@base-ui/utils/useControlled';
import React, { useId } from 'react';
import { createContextScope } from '~/lib/context-scope';

export type AccordionRootProps<Type, IsSingleCollapsible> = {
  disabled?: boolean;
  children: React.ReactNode;
} & (Type extends 'multiple'
  ? {
      type?: Type;
      value?: string[];
      defaultValue?: string[];
      onValueChange?: (value: string[]) => void;
      isSingleCollapsible?: undefined;
    }
  : IsSingleCollapsible extends true
    ? {
        type: Type;
        value?: string | null;
        defaultValue?: string | null;
        onValueChange?: (value: string | null) => void;
        isSingleCollapsible?: IsSingleCollapsible;
      }
    : {
        type: Type;
        value?: string;
        defaultValue?: string;
        onValueChange?: (value: string) => void;
        isSingleCollapsible: IsSingleCollapsible;
      });

interface AccordionCtxProps {
  rootId: string;
  onExpand: (value: string) => void;
  onCollapse: (value: string) => void;
  disabled?: boolean;
  value: string | string[] | null;
  type: 'multiple' | 'single';
}

const [AccordionCtx, useAccordionCtx] = createContextScope<AccordionCtxProps>();

export { useAccordionCtx };

export function AccordionRoot<
  Type extends 'single' | 'multiple' = 'multiple',
  IsSingleCollapsible extends boolean = true,
>(props: AccordionRootProps<Type, IsSingleCollapsible>) {
  const {
    value: valueProp,
    onValueChange,
    defaultValue,
    disabled,
    isSingleCollapsible = true,
    type = 'multiple',
    children,
  } = props;

  const rootId = useId();

  const [value, setValue] = useControlled({
    controlled: valueProp,
    name: 'Accordion',
    default: type === 'multiple' ? (defaultValue ?? []) : defaultValue,
  });

  const handleValueChange = (newValue: typeof value) => {
    setValue(newValue);
    onValueChange?.(newValue as never);
  };

  const onExpand = (expanedItem: string) => {
    if (disabled) return;

    if (type === 'single') {
      handleValueChange(expanedItem);
      return;
    }

    if (type === 'multiple') {
      const next = Array.isArray(value) ? [...value, expanedItem] : value;
      handleValueChange(next);
      return;
    }
  };

  const onCollapse = (collapsedItem: string) => {
    if (disabled) return;

    if (type === 'single' && !isSingleCollapsible) return;

    if (type === 'single' && isSingleCollapsible) {
      handleValueChange(null);
      return;
    }

    if (type === 'multiple') {
      const next = Array.isArray(value)
        ? value.filter((ele) => ele !== collapsedItem)
        : value;

      handleValueChange(next);
      return;
    }
  };

  if (
    valueProp &&
    type === 'single' &&
    !isSingleCollapsible &&
    Array.isArray(value)
  )
    throw new Error(
      `\`value\` must be \`string\` when type is single and isSingleCollapsible is false`,
    );

  if (
    valueProp &&
    type === 'single' &&
    isSingleCollapsible &&
    Array.isArray(value)
  )
    throw new Error(
      `\`value\` must be \`string | null\` when type is single and isSingleCollapsible is true`,
    );

  if (valueProp && type === 'multiple' && !Array.isArray(value))
    throw new Error(`\`value\` must be \`array\` when type is multiple`);

  return (
    <AccordionCtx
      value={{
        rootId,
        value,
        type,
        onCollapse,
        onExpand,
        disabled,
      }}
    >
      {children}
    </AccordionCtx>
  );
}
