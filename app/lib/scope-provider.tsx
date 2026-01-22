import * as React from 'react';

export const ScopeContext = React.createContext<unknown | null>(null);

// *-*-* ScopeProvider *-*-* //

export function ScopeProvider({
  value,
  children,
}: {
  value: unknown;
  children: React.ReactNode;
}) {
  return <ScopeContext value={value}>{children}</ScopeContext>;
}

// *-*-* useScopeCtx *-*-* //

export type UseScopeCtxOptions = {
  /** Whether to throw an error if the context is not found
   * @default true
   */
  shouldThrow?: boolean;
};

/**
 * - it throws error when shouldThrow is true and context is missing
 * - it returns null when shouldThrow is false and context is missing
 */
export function useScopeCtx<Return>(props?: { shouldThrow?: true }): Return;
export function useScopeCtx<Return>(props: {
  shouldThrow: false;
}): Return | null;
export function useScopeCtx(props?: UseScopeCtxOptions) {
  const { shouldThrow = true } = props ?? {};

  const ctx = React.use(ScopeContext);

  if (!ctx && shouldThrow) {
    throw new Error('useScopeCtx must be used within ScopeProvider');
  }

  return ctx;
}
