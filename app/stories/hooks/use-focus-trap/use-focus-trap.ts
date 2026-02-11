import React, { useEffect } from 'react';
import { isLayerPaused } from '~/lib/get-layers';

export interface FocusTrapProps {
  /**
   * This prop is used when `trapped` is true. When this prop is true, focus with keyboard will loop.
   *
   * @default true
   */
  loop?: boolean;
  /**
   * When this prop is true, focus cannot go outside with **keyboard**
   * @default true
   */
  trapped?: boolean;
  enabled: boolean;
  disableFocusReturn?: boolean;
  disableFocusFirstElement?: boolean;
}

export function useFocusTrap({
  loop = true,
  trapped = true,
  enabled,
  disableFocusReturn,
  disableFocusFirstElement,
}: FocusTrapProps) {
  const lastFocusedElementRef = React.useRef<HTMLElement | null>(null);

  const [element, setElement] = React.useState<HTMLElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    // loop=true does not trap focus, trap is managed by useEffect below. This only manages keyboard  focus loop when focus trap is enabled. if trapped=false and loop=true, focus trap is disabled but keyboard focus loop is enabled.

    if (!(enabled && loop) || isLayerPaused(event.currentTarget)) return;

    const container = event.currentTarget;

    const isTabKey =
      event.key === 'Tab' && !event.ctrlKey && !event.altKey && !event.metaKey;

    const focusedElement = document.activeElement as HTMLElement | null;

    if (!isTabKey || !focusedElement) return;

    const tabbables = getTabbables(container);

    const first = tabbables.at(0);
    const last = tabbables.at(-1);

    // if container does not have more than one focusable elements, prevent default and exit
    if (tabbables.length <= 1 || !first || !last) {
      event.preventDefault();
      return;
    }

    if (!event.shiftKey && focusedElement === last && !isHidden(first)) {
      event.preventDefault();
      focus(first);
    }

    if (event.shiftKey && focusedElement === first && !isHidden(last)) {
      event.preventDefault();
      focus(last);
    }
  };

  useEffect(() => {
    if (!(enabled && element)) return;

    const trapTrigger = document.activeElement as HTMLElement | null;

    if (!element.contains(trapTrigger)) {
      const tabbables = getTabbables(element);

      if (!tabbables.length) {
        focus(element);
      } else if (!disableFocusFirstElement && !isLayerPaused(element)) {
        focusFirst(tabbables);
      }
    }

    const handleFocusIn = (event: FocusEvent) => {
      if (!trapped || isLayerPaused(element)) return;

      const target = event.target as HTMLElement;

      if (element.contains(target)) {
        lastFocusedElementRef.current = target;
      } else if (lastFocusedElementRef.current) {
        lastFocusedElementRef.current.focus();
      } else {
        element.focus();
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (!trapped || isLayerPaused(element)) return;

      const relatedTarget = event.relatedTarget as HTMLElement | null;

      // No handling needed when focus moves outside the browser window; browser remembers which element was focused before moving focus outside and browser does default behavior on refocus.
      if (relatedTarget === null) return;

      if (element.contains(relatedTarget)) {
        lastFocusedElementRef.current = relatedTarget;
        return;
      }

      if (lastFocusedElementRef.current) {
        lastFocusedElementRef.current.focus();
      } else {
        element.focus();
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    const mutationObserver = new MutationObserver((mutations) => {
      if (isLayerPaused(element)) return;

      const focusedElement = document.activeElement as HTMLElement | null;

      /* When focused element is removed from DOM, broswer moves focus to body. So only proceed if focused element is body.
       */

      if (focusedElement !== document.body) return;

      for (const mutation of mutations) {
        /* 
        i only care about focused element being removed that is lastFocusedElementRef.current
        if focused element is removed, move focus to container
        */

        if (mutation.removedNodes.length && lastFocusedElementRef.current) {
          if (
            Array.from(mutation.removedNodes).includes(
              lastFocusedElementRef.current,
            )
          ) {
            focus(element);
            break;
          }
        }
      }
    });

    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      mutationObserver.disconnect();

      if (!disableFocusReturn) {
        focus(trapTrigger ?? document.body);
      }
    };
  }, [disableFocusFirstElement, disableFocusReturn, element, enabled, trapped]);

  return {
    onKeyDown: handleKeyDown,
    tabIndex: -1,
    ref: setElement,
  };
}

// <<-------------------- Utils -------------------->>

const getTabbables = (container: HTMLElement) => {
  const nodes: HTMLElement[] = [];

  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_ELEMENT,
    (node) => {
      if (node instanceof HTMLElement === false)
        return NodeFilter.FILTER_REJECT;

      if (
        node instanceof HTMLAnchorElement &&
        node.hasAttribute('href') === false
      )
        return NodeFilter.FILTER_SKIP;

      if (node instanceof HTMLInputElement && node.type === 'hidden')
        return NodeFilter.FILTER_SKIP;

      if (node instanceof HTMLButtonElement && node.disabled)
        return NodeFilter.FILTER_SKIP;

      const styles = getComputedStyle(node);

      if (styles.visibility === 'hidden' || styles.display === 'none')
        return NodeFilter.FILTER_SKIP;

      if (node.closest('fieldset[disabled]')) {
        return NodeFilter.FILTER_SKIP;
      }

      return node.tabIndex >= 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  );

  while (walker.nextNode()) nodes.push(walker.currentNode as HTMLElement);

  return nodes;
};

const isHidden = (element: HTMLElement) => {
  let node: HTMLElement | null = element;

  while (node) {
    if (getComputedStyle(element).visibility === 'hidden') return true;
    if (getComputedStyle(element).display === 'none') return true;

    node = node.parentElement;
  }

  return false;
};

type FocusableTarget = HTMLElement | { focus(): void };

const focus = (element: FocusableTarget) => {
  const previousFocusedElement = document.activeElement;

  element.focus?.({ preventScroll: true });

  if (
    element !== previousFocusedElement &&
    'select' in element &&
    (element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement)
  ) {
    element.select();
  }
};

const focusFirst = (elements: HTMLElement[]) => {
  const previouslyFocusedElement = document.activeElement;

  for (const ele of elements) {
    if (ele instanceof HTMLAnchorElement) continue;

    focus(ele);

    if (document.activeElement !== previouslyFocusedElement) return;
  }
};
