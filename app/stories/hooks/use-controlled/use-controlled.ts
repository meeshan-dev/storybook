import React, { useCallback, useEffect } from 'react';

export interface UseControlledProps<T> {
  controlled: T | undefined;
  defaultValue: T;
  onChange?: (newValue: T) => void;
}

export const useControlled = <T>(props: UseControlledProps<T>) => {
  const { controlled, defaultValue, onChange } = props;

  const onChangeRef = React.useRef(onChange);

  const [valueState, setValueState] = React.useState(defaultValue);

  const isControlled = controlled !== undefined;

  const value = isControlled ? controlled : valueState;

  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const setValue = useCallback(
    (newValue: React.SetStateAction<T>) => {
      const val =
        typeof newValue === 'function'
          ? (newValue as (prevState: T) => T)(value)
          : newValue;

      if (!isControlled) {
        setValueState(val);
      }

      onChangeRef.current?.(val);
    },
    [isControlled, value],
  );

  return [value, setValue] as [T, typeof setValue];
};
