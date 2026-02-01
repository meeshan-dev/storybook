import React from 'react';
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
  disabled?: boolean;
  disableFocusReturn?: boolean;
  disableFocusFirstElement?: boolean;
}

export function useFocusTrap({
  loop = true,
  trapped = true,
  disabled,
  disableFocusReturn,
  disableFocusFirstElement,
}: FocusTrapProps = {}) {
  const lastFocusedElementRef = React.useRef<HTMLElement | null>(null);

  const trapFocus = (container: HTMLElement) => {
    if (!trapped) return;

    const trapTrigger = document.activeElement as HTMLElement | null;

    if (!container.contains(trapTrigger)) {
      const tabbables = getTabbables(container);

      if (!tabbables.length) {
        focus(container);
      } else if (!disableFocusFirstElement && !isLayerPaused(container)) {
        focusFirst(tabbables);
      }
    }

    const handleFocusOut = (event: FocusEvent) => {
      if (disabled || isLayerPaused(container)) return;

      const relatedTarget = event.relatedTarget as HTMLElement | null;

      // No handling needed when focus moves outside the browser window; browser remembers which element was focused before moving focus outside and browser does default behavior on refocus.
      if (relatedTarget === null) return;

      if (container.contains(relatedTarget)) {
        lastFocusedElementRef.current = relatedTarget;
        return;
      }

      if (lastFocusedElementRef.current) {
        lastFocusedElementRef.current.focus();
      } else {
        container.focus();
      }
    };

    /* since focusout happens before focusin, so no need to check whether focus is moving inside or outside the container in focusin event
     */

    document.addEventListener('focusout', handleFocusOut);

    const mutationObserver = new MutationObserver((mutations) => {
      if (isLayerPaused(container)) return;

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
            focus(container);
            break;
          }
        }
      }
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener('focusout', handleFocusOut);
      mutationObserver.disconnect();

      if (!disableFocusReturn) {
        focus(trapTrigger ?? document.body);
      }
    };
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (disabled || isLayerPaused(event.currentTarget)) return;

    /* Only proceed if focus trapping is enabled and loop is enabled
      since without loop, no need to handle keydown for focus trapping
      */
    if (!(loop && trapped)) return;

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

  return {
    onKeyDown: handleKeyDown,
    tabIndex: -1,
    ref: (node: HTMLElement | null) => {
      if (node === null) return;

      return trapFocus(node);
    },
  };
}

// <<--------------------Utils-------------------->>

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
