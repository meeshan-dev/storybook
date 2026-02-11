import { IconMoon, IconSun } from '@tabler/icons-react';
import { useState } from 'react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { createContextScope } from './context-scope';

export function ContextScopeDemo() {
  return (
    <section data-demo className='flex flex-col items-center gap-12'>
      <BasicUsage />
      <NestedScopes />
      <OptionalContext />
    </section>
  );
}

/* ——————————————————————————————————————————————————————— */
/*  1. Basic usage — theme context                        */
/* ——————————————————————————————————————————————————————— */

type ThemeCtx = { mode: 'light' | 'dark' };
const [ThemeProvider, useThemeCtx] = createContextScope<ThemeCtx>();

function BasicUsage() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  return (
    <div className='w-full'>
      <div className='text-center'>
        <Badge variant='secondary' className='mb-2'>
          Basic Usage
        </Badge>
        <h2 className='text-2xl font-bold'>Theme Context</h2>
        <p className='text-muted-foreground mt-1 text-center text-balance'>
          Provide and consume a typed context without boilerplate
        </p>
      </div>

      <div className='mt-6 flex flex-col items-center gap-4'>
        <Button
          variant='secondary'
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
        >
          Toggle theme: {mode}
        </Button>

        <ThemeProvider value={{ mode }}>
          <ThemeConsumer />
        </ThemeProvider>
      </div>
    </div>
  );
}

function ThemeConsumer() {
  const theme = useThemeCtx();

  return (
    <div
      data-mode={theme.mode}
      className='flex w-full items-center gap-3 rounded-lg border p-4 text-sm'
    >
      <p className='font-medium capitalize'>Mode: {theme.mode}</p>

      {theme.mode === 'dark' ? <IconMoon /> : <IconSun />}
    </div>
  );
}

/* ——————————————————————————————————————————————————————— */
/*  2. Nested scopes — inner overrides outer              */
/* ——————————————————————————————————————————————————————— */

type LevelCtx = { level: number; label: string };
const [LevelProvider, useLevelCtx] = createContextScope<LevelCtx>();

function NestedScopes() {
  return (
    <div className='w-full'>
      <div className='text-center'>
        <Badge variant='secondary' className='mb-2'>
          Nested Scopes
        </Badge>
        <h2 className='text-2xl font-bold'>Scope Overriding</h2>
        <p className='text-muted-foreground mt-1'>
          Inner providers override outer values for their subtree
        </p>
      </div>

      <div className='mt-6'>
        <LevelProvider value={{ level: 1, label: 'Root' }}>
          <LevelDisplay />
          <div className='mt-2 ml-6 border-l-2 border-blue-300 pl-4'>
            <LevelProvider value={{ level: 2, label: 'Nested' }}>
              <LevelDisplay />
              <div className='mt-2 ml-6 border-l-2 border-green-300 pl-4'>
                <LevelProvider value={{ level: 3, label: 'Deep nested' }}>
                  <LevelDisplay />
                </LevelProvider>
              </div>
            </LevelProvider>
          </div>
        </LevelProvider>
      </div>
    </div>
  );
}

function LevelDisplay() {
  const ctx = useLevelCtx();
  return (
    <div className='rounded border p-3 text-sm'>
      <span className='font-medium'>Level {ctx.level}:</span> {ctx.label}
    </div>
  );
}

/* ——————————————————————————————————————————————————————— */
/*  3. Optional context with shouldThrow: false           */
/* ——————————————————————————————————————————————————————— */

type UserCtx = { name: string; role: string };
const [UserProvider, useUserCtx] = createContextScope<UserCtx>();

function OptionalContext() {
  const [showProvider, setShowProvider] = useState(false);

  return (
    <div className='w-full'>
      <div className='text-center'>
        <Badge variant='secondary' className='mb-2'>
          Optional Context
        </Badge>
        <h2 className='text-2xl font-bold'>Graceful Fallback</h2>
        <p className='text-muted-foreground mt-1'>
          Use <code className='font-mono text-sm'>shouldThrow:false</code> for
          optional context consumption
        </p>
      </div>

      <div className='mt-6 flex flex-col items-center gap-4'>
        <Button
          variant='secondary'
          onClick={() => setShowProvider(!showProvider)}
        >
          {showProvider ? 'Remove' : 'Add'} provider
        </Button>

        {showProvider ? (
          <UserProvider value={{ name: 'Alice', role: 'Admin' }}>
            <OptionalConsumer />
          </UserProvider>
        ) : (
          <OptionalConsumer />
        )}
      </div>
    </div>
  );
}

function OptionalConsumer() {
  const user = useUserCtx({ shouldThrow: false });

  return (
    <div className='w-full rounded-lg border p-4 text-sm'>
      {user ? (
        <p>
          <span className='font-medium'>User:</span> {user.name} ({user.role})
        </p>
      ) : (
        <p className='text-muted-foreground italic'>
          No user context provided, returned <code>null</code>
        </p>
      )}
    </div>
  );
}
