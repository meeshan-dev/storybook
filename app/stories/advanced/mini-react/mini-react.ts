/* ———————————————————— TYPES ———————————————————— */

type Props = Record<string, unknown> & { children?: MiniReactElement[] };
type ElementType = string | ((props: Props) => MiniReactElement);

interface MiniReactElement {
  type: ElementType;
  props: Props;
}

interface Fiber {
  type: ElementType;
  props: Props;
  dom: HTMLElement | Text | null;
  parent: Fiber | null;
  child: Fiber | null;
  sibling: Fiber | null;
  alternate: Fiber | null; // Points to old fiber for comparison
  effectTag?: 'PLACEMENT' | 'UPDATE' | 'DELETION';
  hooks?: Hook[];
}

interface Hook {
  state: unknown;
  queue: unknown[];
  // For useEffect: dependencies and cleanup function
  deps?: unknown[];
  cleanup?: (() => void) | void;
}

/* ———————————————————— GLOBAL STATE ———————————————————— */

let wipRoot: Fiber | null = null; // Work in progress root
let currentRoot: Fiber | null = null; // Last committed fiber tree
let nextUnitOfWork: Fiber | null = null;
let deletions: Fiber[] = [];

// Hook management
let wipFiber: Fiber | null = null;
let hookIndex: number = 0;

/* ———————————————————— VIRTUAL DOM - createElement ———————————————————— */

/**
 * Creates a Virtual DOM element (similar to React.createElement)
 *
 * Key Point: JSX like <div className="app">Hello</div>
 * gets transpiled by Babel to:
 * createElement("div", { className: "app" }, "Hello")
 */
function createElement(
  type: ElementType,
  props: Props | null,
  ...children: unknown[]
): MiniReactElement {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' && child !== null
          ? (child as MiniReactElement)
          : createTextElement(child as string | number),
      ),
    },
  };
}

/**
 * Text nodes need special handling in the Virtual DOM
 */
function createTextElement(text: string | number): MiniReactElement {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

/* ———————————————————— FIBER ARCHITECTURE & RECONCILIATION ———————————————————— */

/**
 * Creates a DOM node from a fiber
 */
function createDom(fiber: Fiber): HTMLElement | Text {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type as string);

  updateDom(dom, {}, fiber.props);
  return dom;
}

const isEvent = (key: string) => key.startsWith('on');
const isProperty = (key: string) => key !== 'children' && !isEvent(key);
const isGone = (next: Props, key: string) => !(key in next);
const isNew = (prev: Props, next: Props, key: string) =>
  prev[key] !== next[key];

/**
 * Updates DOM properties and event listeners
 *
 * Key Point: This is the "commit" phase where actual DOM mutations happen
 */
function updateDom(
  dom: HTMLElement | Text,
  prevProps: Props,
  nextProps: Props,
) {
  for (const key in prevProps) {
    if (
      isEvent(key) &&
      (isGone(nextProps, key) || isNew(prevProps, nextProps, key))
    ) {
      const eventType = key.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[key] as EventListener);
    }

    if (isProperty(key) && isGone(nextProps, key)) {
      (dom as unknown as { [key: string]: unknown })[key] = '';
    }
  }

  for (const key in nextProps) {
    if (isEvent(key) && isNew(prevProps, nextProps, key)) {
      const eventType = key.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[key] as EventListener);
    }

    if (isProperty(key) && isNew(prevProps, nextProps, key)) {
      (dom as unknown as { [key: string]: unknown })[key] = nextProps[key];
    }
  }
}

/**
 * Commits the entire fiber tree to the DOM
 *
 * Key Point: React batches DOM updates and commits them all at once
 * This is more efficient than updating the DOM during reconciliation
 */
function commitRoot() {
  deletions.forEach(commitWork);
  if (wipRoot?.child) {
    commitWork(wipRoot.child);
  }
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber: Fiber | null) {
  if (!fiber) return;

  // Find the nearest parent with a DOM node (function components don't have DOM)
  let domParentFiber = fiber.parent;
  while (domParentFiber && !domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber?.dom;

  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null && domParent) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate?.props || {}, fiber.props);
  } else if (fiber.effectTag === 'DELETION' && domParent) {
    commitDeletion(fiber, domParent);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(fiber: Fiber, domParent: HTMLElement | Text) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else if (fiber.child) {
    commitDeletion(fiber.child, domParent);
  }
}

/* ———————————————————— WORK LOOP - CONCURRENT MODE ———————————————————— */

/**
 * Key Point: This mini React uses requestIdleCallback to work during browser's idle time
 * This allows React to pause work and not block the main thread
 * Real React uses a scheduler with priority levels
 */
function workLoop(deadline: IdleDeadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  // Commit phase: when all work is done, commit to DOM
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

// Start the work loop
if (typeof requestIdleCallback !== 'undefined') {
  requestIdleCallback(workLoop);
}

/**
 * Process one fiber and return the next unit of work
 *
 * Key Point: Fiber traversal order:
 * 1. Child (depth-first)
 * 2. Sibling
 * 3. Uncle (parent's sibling)
 */
function performUnitOfWork(fiber: Fiber): Fiber | null {
  /**
   * Handle function components (with hooks support)
   */
  if (typeof fiber.type === 'function') {
    wipFiber = fiber;
    hookIndex = 0;
    wipFiber.hooks = [];

    // Call the function component to get children
    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children);
  } else {
    /**
     * Handle host (DOM) components
     */
    if (!fiber.dom) {
      fiber.dom = createDom(fiber);
    }

    reconcileChildren(fiber, fiber.props.children || []);
  }

  // Return next unit of work
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber: Fiber | null = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    nextFiber = nextFiber.parent;
  }

  return null;
}

/**
 * RECONCILIATION - The Diffing Algorithm
 *
 * Key Point: React compares old and new fiber trees to determine:
 * - What to add (PLACEMENT)
 * - What to update (UPDATE)
 * - What to remove (DELETION)
 *
 * Does not handle keys in this simplified version, but in real React, keys help identify which items in a list have changed
 */
function reconcileChildren(wipFiber: Fiber, elements: MiniReactElement[]) {
  let index = 0;
  let oldFiber = wipFiber.alternate?.child || null;
  let prevSibling: Fiber | null = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber: Fiber | null = null;

    const sameType = oldFiber && element && element.type === oldFiber.type;

    // UPDATE: Same type, just update props
    if (sameType && oldFiber) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE',
        child: null,
        sibling: null,
      };
    }

    // PLACEMENT: New element
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT',
        child: null,
        sibling: null,
      };
    }

    // DELETION: Old element no longer exists
    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    // Build fiber tree structure
    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element && prevSibling) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

/* ———————————————————— HOOKS IMPLEMENTATION ———————————————————— */

/**
 * useState Hook
 *
 * Key Point: Hooks work by storing state in a linked list
 * attached to the fiber. The order of hook calls must be consistent
 * (that's why hooks can't be called conditionally)
 */
function useState<T>(initial: T): [T, (action: T | ((prev: T) => T)) => void] {
  const oldHook = wipFiber?.alternate?.hooks?.[hookIndex];

  const hook: Hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  // Process all queued state updates
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action: unknown) => {
    hook.state =
      typeof action === 'function'
        ? (action as (prev: T) => T)(hook.state as T)
        : action;
  });

  const setState = (action: T | ((prev: T) => T)) => {
    hook.queue.push(action);

    // Trigger a re-render
    wipRoot = {
      type: currentRoot!.type,
      props: currentRoot!.props,
      dom: currentRoot!.dom,
      alternate: currentRoot,
      child: null,
      parent: null,
      sibling: null,
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  wipFiber?.hooks?.push(hook);
  hookIndex++;

  return [hook.state as T, setState];
}

/**
 * useEffect Hook
 *
 * Key Point: Effects are scheduled after the commit phase
 * The dependency array controls when effects re-run
 */
function useEffect(callback: () => void | (() => void), deps?: unknown[]) {
  const oldHook = wipFiber?.alternate?.hooks?.[hookIndex];

  const hasChanged = deps
    ? !oldHook?.deps ||
      deps.some((dep, i) => !Object.is(dep, oldHook.deps?.[i]))
    : true;

  const hook = {
    state: null,
    queue: [],
    deps,
    cleanup: oldHook?.cleanup,
    effect: hasChanged ? callback : null,
  };

  // Schedule effect to run after commit
  if (hasChanged) {
    setTimeout(() => {
      // Run cleanup from previous effect
      if (hook.cleanup) {
        hook.cleanup();
      }
      // Run the new effect and store cleanup
      hook.cleanup = callback();
    }, 0);
  }

  wipFiber?.hooks?.push(hook);
  hookIndex++;
}

/**
 * useRef Hook
 *
 * Key Point: useRef persists values across renders without causing re-renders
 * Unlike useState, mutating .current doesn't trigger updates
 */
function useRef<T>(initialValue: T): { current: T } {
  const oldHook = wipFiber?.alternate?.hooks?.[hookIndex];

  const hook: Hook = {
    state: oldHook ? oldHook.state : { current: initialValue },
    queue: [],
  };

  wipFiber?.hooks?.push(hook);
  hookIndex++;

  return hook.state as { current: T };
}

/**
 * useMemo Hook
 *
 * Key Point: Memoizes expensive computations
 * Only recomputes when dependencies change
 */
function useMemo<T>(factory: () => T, deps: unknown[]): T {
  const oldHook = wipFiber?.alternate?.hooks?.[hookIndex];

  const hasChanged = deps
    ? !oldHook?.deps ||
      deps.some((dep, i) => !Object.is(dep, oldHook.deps?.[i]))
    : true;

  const hook: Hook = {
    state: hasChanged ? factory() : oldHook?.state,
    queue: [],
    deps,
  };

  wipFiber?.hooks?.push(hook);
  hookIndex++;

  return hook.state as T;
}

/**
 * useCallback Hook
 *
 * Key Point: Memoizes functions to prevent unnecessary re-renders
 * of child components that depend on function references
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function useCallback<T extends Function>(callback: T, deps: unknown[]): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => callback, deps);
}

/* ———————————————————— RENDER FUNCTION - Entry Point ———————————————————— */

/**
 * Renders a React element tree into a DOM container
 *
 * This is like ReactDOM.render()
 */
function render(element: MiniReactElement, container: HTMLElement) {
  wipRoot = {
    type: 'ROOT',
    props: {
      children: [element],
    },
    dom: container,
    alternate: currentRoot,
    child: null,
    parent: null,
    sibling: null,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

export const MiniReact = {
  createElement,
  render,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
};

export default MiniReact;
