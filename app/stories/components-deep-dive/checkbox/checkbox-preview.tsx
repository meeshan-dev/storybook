import {
  IconCheck,
  IconLineDashed,
  IconMoodHappyFilled,
  IconMoodNeutral,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { Checkbox, CheckboxIcon } from './checkbox';

export function CheckboxPreview() {
  return (
    <main className='flex grow flex-col items-center justify-center gap-3'>
      <BasicCheckbox />
      <IconCheckbox />
      <ControlledCheckbox />
      <ErrorCheckbox />
      <DisabledCheckbox checked={false} />
      <DisabledCheckbox checked />
    </main>
  );
}

/* ---------------------------------- */
/* Shared Row Wrapper                  */
/* ---------------------------------- */

function Row({
  children,
  state,
}: {
  children: React.ReactNode;
  state?: 'checked' | 'mixed' | 'error';
}) {
  return (
    <label
      className={cn(
        'group flex w-full max-w-xs cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all select-none',
        'bg-foreground/6 hover:bg-foreground/8',
        'has-[input:checked]:bg-emerald-600/5 dark:has-[input:checked]:bg-emerald-400/5',
        'border border-transparent has-[input:checked]:border-emerald-600/40 has-[input:disabled]:pointer-events-none has-[input:disabled]:opacity-50 dark:has-[input:checked]:border-emerald-400/40',
        'focus-within:ring-ring/50 outline-none focus-within:ring-[3px]',
        state === 'error' &&
          'border-red-600/30 bg-red-600/5 dark:border-red-400/30 dark:bg-red-400/5',
      )}
    >
      {children}
    </label>
  );
}

/* ---------------------------------- */
/* 1. Basic checkbox                   */
/* ---------------------------------- */

function BasicCheckbox() {
  return (
    <Row>
      <Box>
        <Checkbox defaultChecked>
          <CheckboxIcon type='check'>
            <IconCheck />
          </CheckboxIcon>
        </Checkbox>
      </Box>

      <Label>Accept terms and conditions</Label>
    </Row>
  );
}

/* ---------------------------------- */
/* 2. Icon swap checkbox               */
/* ---------------------------------- */

function IconCheckbox() {
  return (
    <Row>
      <div className='flex size-6 items-center justify-center *:[svg]:size-6'>
        <Checkbox defaultChecked>
          <CheckboxIcon type='box'>
            <IconMoodNeutral className='text-muted-foreground' />
          </CheckboxIcon>
          <CheckboxIcon type='check'>
            <IconMoodHappyFilled className='text-amber-500 dark:text-amber-400' />
          </CheckboxIcon>
        </Checkbox>
      </div>

      <Label>Emoji toggle</Label>
    </Row>
  );
}

/* ---------------------------------- */
/* 3. Controlled + indeterminate       */
/* ---------------------------------- */

function ControlledCheckbox() {
  const [value, setValue] = useState<boolean | 'mixed'>('mixed');

  return (
    <Row state={value === 'mixed' ? 'mixed' : value ? 'checked' : undefined}>
      <Box>
        <Checkbox
          checked={value === true}
          indeterminate={value === 'mixed'}
          onCheckedChange={setValue}
        >
          <CheckboxIcon type='check'>
            <IconCheck />
          </CheckboxIcon>
          <CheckboxIcon type='indeterminate'>
            <IconLineDashed />
          </CheckboxIcon>
        </Checkbox>
      </Box>

      <div className='flex flex-col'>
        <Label>Controlled checkbox</Label>
        <span className='text-muted-foreground text-xs'>
          State: {String(value)}
        </span>
      </div>

      <Button
        size='xs'
        variant='ghost'
        className='ml-auto'
        disabled={value === 'mixed'}
        onClick={() => setValue('mixed')}
      >
        Reset
      </Button>
    </Row>
  );
}

/* ---------------------------------- */
/* 4. Disabled                         */
/* ---------------------------------- */

function DisabledCheckbox({ checked }: { checked: boolean }) {
  return (
    <Row>
      <Box>
        <Checkbox disabled checked={checked}>
          <CheckboxIcon type='check'>
            <IconCheck />
          </CheckboxIcon>
        </Checkbox>
      </Box>

      <Label>Disabled ({checked ? 'checked' : 'unchecked'})</Label>
    </Row>
  );
}

/* ---------------------------------- */
/* 5. Error                            */
/* ---------------------------------- */

function ErrorCheckbox() {
  return (
    <Row state='error'>
      <Box>
        <Checkbox aria-invalid>
          <CheckboxIcon type='check'>
            <IconCheck />
          </CheckboxIcon>
        </Checkbox>
      </Box>

      <div className='flex flex-col'>
        <Label className='text-red-600 dark:text-red-400'>Required field</Label>
        <span className='text-xs text-red-600 group-has-[input:checked]:hidden dark:text-red-400'>
          This must be checked
        </span>
        <span className='hidden text-xs text-emerald-600 group-has-[input:checked]:block dark:text-emerald-400'>
          Awesome
        </span>
      </div>
    </Row>
  );
}

/* ---------------------------------- */
/* Small helpers                       */
/* ---------------------------------- */

function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className='border-foreground/30 flex size-4 items-center justify-center rounded-sm border *:[svg]:size-4'>
      {children}
    </div>
  );
}

function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'text-muted-foreground group-has-[input:checked]:text-emerald-600 dark:group-has-[input:checked]:text-emerald-400',
        className,
      )}
    >
      {children}
    </span>
  );
}
