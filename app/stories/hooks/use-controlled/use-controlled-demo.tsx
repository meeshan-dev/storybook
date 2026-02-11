import { useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '~/components/ui/input-group';
import { useControlled } from './use-controlled';

export function UseControlledDemo() {
  const [internalValue, setInternalValue] = useState<string>('');

  const [value, setValue] = useControlled({
    controlled: internalValue,
    defaultValue: 'Default Value',
    onChange: setInternalValue,
  });

  const [uncontrolledValue, setUncontrolledValue] = useControlled({
    controlled: undefined,
    defaultValue: 'Uncontrolled',
  });

  return (
    <section data-demo className='flex flex-col items-center'>
      <h3 className='text-lg font-bold'>Controlled Mode</h3>

      <p className='text-muted-foreground mt-1 text-center text-sm text-balance'>
        The value is controlled by the parent component state.
      </p>

      <InputGroup className='mt-2 w-[min(100%,400px)]'>
        <InputGroupInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Type something...'
          maxLength={15}
        />

        <InputGroupAddon align='inline-end'>
          <InputGroupText className='tabular-nums'>
            {value.length}/15
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <h3 className='mt-12 text-lg font-bold'>Uncontrolled Mode</h3>

      <p className='text-muted-foreground mt-1 text-center text-sm text-balance'>
        The value is managed internally by the hook.
      </p>

      <InputGroup className='mt-2 w-[min(100%,400px)]'>
        <InputGroupInput
          value={uncontrolledValue}
          onChange={(e) => setUncontrolledValue(e.target.value)}
          placeholder='Type something...'
          maxLength={15}
        />

        <InputGroupAddon align='inline-end'>
          <InputGroupText className='tabular-nums'>
            {uncontrolledValue.length}/15
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </section>
  );
}
