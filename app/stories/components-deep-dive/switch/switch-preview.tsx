import { IconMoodHappyFilled, IconMoodNeutral } from '@tabler/icons-react';
import { useState } from 'react';
import { cn } from '~/lib/utils';
import { Switch, SwitchIcon } from './switch';

export function SwitchPreview() {
  return (
    <main className='flex grow flex-col items-center justify-center gap-3 py-10'>
      <BasicSwitch />
      <IconSwitch />
      <ControlledSwitch />
      <DisabledSwitch checked={false} />
      <DisabledSwitch checked />
    </main>
  );
}

/* ---------------------------------- */
/* Shared Row Wrapper                  */
/* ---------------------------------- */

function Row({ children }: { children: React.ReactNode }) {
  return (
    <label
      className={cn(
        'group flex w-full max-w-xs cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all select-none',
        'bg-foreground/6 hover:bg-foreground/8',
        'has-[input:checked]:bg-emerald-600/5 dark:has-[input:checked]:bg-emerald-400/5',
        'border border-transparent has-[input:checked]:border-emerald-600/40 dark:has-[input:checked]:border-emerald-400/40',
        'has-[input:disabled]:pointer-events-none has-[input:disabled]:opacity-50',
        'focus-within:ring-ring/50 outline-none focus-within:ring-[3px]',
      )}
    >
      {children}
    </label>
  );
}

/* ---------------------------------- */
/* 1. Basic switch                    */
/* ---------------------------------- */

function BasicSwitch() {
  return (
    <Row>
      <Switch defaultChecked>
        <Track>
          <Thumb />
        </Track>
      </Switch>

      <Label>Enable notifications</Label>
    </Row>
  );
}

/* ---------------------------------- */
/* 2. Icon-based switch (fixed)       */
/* ---------------------------------- */

function IconSwitch() {
  return (
    <Row>
      <Switch defaultChecked>
        <Track>
          <Thumb>
            <SwitchIcon type='off'>
              <IconMoodNeutral className='text-muted-foreground size-4' />
            </SwitchIcon>

            <SwitchIcon type='on'>
              <IconMoodHappyFilled className='size-4 text-amber-500 dark:text-amber-400' />
            </SwitchIcon>
          </Thumb>
        </Track>
      </Switch>

      <Label>Mood mode</Label>
    </Row>
  );
}

/* ---------------------------------- */
/* 3. Controlled switch               */
/* ---------------------------------- */

function ControlledSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Row>
      <Switch checked={enabled} onCheckedChange={setEnabled}>
        <Track>
          <Thumb />
        </Track>
      </Switch>

      <div className='flex flex-col'>
        <Label>Auto updates</Label>
        <span className='text-muted-foreground text-xs'>
          Status: {enabled ? 'On' : 'Off'}
        </span>
      </div>
    </Row>
  );
}

/* ---------------------------------- */
/* 4. Disabled                        */
/* ---------------------------------- */

function DisabledSwitch({ checked }: { checked: boolean }) {
  return (
    <Row>
      <Switch disabled checked={checked}>
        <Track>
          <Thumb />
        </Track>
      </Switch>

      <Label>Disabled ({checked ? 'On' : 'Off'})</Label>
    </Row>
  );
}

/* ---------------------------------- */
/* Switch visuals helpers              */
/* ---------------------------------- */

function Track({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-foreground/20 relative flex h-5 w-9 items-center rounded-full px-0.5 transition-colors group-has-[input:checked]:bg-emerald-600'>
      {children}
    </div>
  );
}

function Thumb({ children }: { children?: React.ReactNode }) {
  return (
    <div className='bg-background flex items-center justify-center rounded-full shadow transition-transform group-has-[input:checked]:translate-x-4 empty:size-4'>
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
