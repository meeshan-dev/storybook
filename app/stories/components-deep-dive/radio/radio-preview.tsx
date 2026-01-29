import {
  IconCheck,
  IconMoodHappyFilled,
  IconMoodNeutral,
} from '@tabler/icons-react';
import { cn } from '~/lib/utils';
import { Radio, RadioGroup, RadioIcon } from './radio'; // use context-based Radio

export function RadioPreview() {
  return (
    <main className='flex grow flex-col items-center justify-center gap-3 py-10'>
      <BasicRadioGroup />
      <div className='mt-5' />
      <IconRadioGroup />
      <div className='mt-5' />
      <ErrorRadioGroup />
      <div className='mt-5' />
      <DisabledRadioGroup />
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
  state?: 'checked' | 'error';
}) {
  return (
    <label
      className={cn(
        'group flex w-full max-w-xs cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all select-none',
        'bg-foreground/6 hover:bg-foreground/8',
        'has-[input:checked]:bg-emerald-600/5 dark:has-[input:checked]:bg-emerald-400/5',
        'border border-transparent has-[input:checked]:border-emerald-600/40 dark:has-[input:checked]:border-emerald-400/40',
        'has-[input:disabled]:pointer-events-none has-[input:disabled]:opacity-50',
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
/* 1. Basic radio group                */
/* ---------------------------------- */

function BasicRadioGroup() {
  return (
    <RadioGroup name='billing' defaultValue='monthly'>
      {['monthly', 'yearly'].map((option) => (
        <Row key={option}>
          <Circle>
            <Radio value={option}>
              <RadioIcon type='check'>
                <IconCheck />
              </RadioIcon>
            </Radio>
          </Circle>

          <Label>
            {option === 'monthly' ? 'Monthly billing' : 'Yearly billing'}
          </Label>
        </Row>
      ))}
    </RadioGroup>
  );
}

/* ---------------------------------- */
/* 2. Icon-based radio group           */
/* ---------------------------------- */

function IconRadioGroup() {
  return (
    <RadioGroup name='mood' defaultValue='neutral'>
      <Row>
        <IconBox>
          <Radio value='neutral'>
            <RadioIcon type='box'>
              <IconMoodNeutral className='text-muted-foreground' />
            </RadioIcon>
            <RadioIcon type='check'>
              <IconMoodNeutral className='text-emerald-600 dark:text-emerald-400' />
            </RadioIcon>
          </Radio>
        </IconBox>

        <Label>Neutral mood</Label>
      </Row>

      <Row>
        <IconBox>
          <Radio value='happy'>
            <RadioIcon type='box'>
              <IconMoodHappyFilled className='text-muted-foreground' />
            </RadioIcon>
            <RadioIcon type='check'>
              <IconMoodHappyFilled className='text-amber-500 dark:text-amber-400' />
            </RadioIcon>
          </Radio>
        </IconBox>

        <Label>Happy mood</Label>
      </Row>
    </RadioGroup>
  );
}

/* ---------------------------------- */
/* 3. Error (required selection)       */
/* ---------------------------------- */

function ErrorRadioGroup() {
  return (
    <>
      <RadioGroup name='required'>
        {['A', 'B'].map((option) => (
          <Row key={option} state='error'>
            <Circle>
              <Radio value={option} aria-invalid={true}>
                <RadioIcon type='check'>
                  <IconCheck />
                </RadioIcon>
              </Radio>
            </Circle>

            <Label className='text-red-600 dark:text-red-400'>
              Option {option}
            </Label>
          </Row>
        ))}
      </RadioGroup>
    </>
  );
}

/* ---------------------------------- */
/* 4. Disabled group                   */
/* ---------------------------------- */

function DisabledRadioGroup() {
  return (
    <RadioGroup name='disabled' defaultValue=''>
      <Row>
        <Circle>
          <Radio value='' disabled>
            <RadioIcon type='check'>
              <IconCheck />
            </RadioIcon>
          </Radio>
        </Circle>

        <Label>Disabled option</Label>
      </Row>

      <Row>
        <Circle>
          <Radio value='selected' disabled>
            <RadioIcon type='check'>
              <IconCheck />
            </RadioIcon>
          </Radio>
        </Circle>

        <Label>Disabled (selected)</Label>
      </Row>
    </RadioGroup>
  );
}

/* ---------------------------------- */
/* Small helpers                       */
/* ---------------------------------- */

function Circle({ children }: { children: React.ReactNode }) {
  return (
    <div className='border-foreground/30 flex size-4 items-center justify-center rounded-full border *:[svg]:size-3'>
      {children}
    </div>
  );
}

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex size-6 items-center justify-center *:[svg]:size-6'>
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
