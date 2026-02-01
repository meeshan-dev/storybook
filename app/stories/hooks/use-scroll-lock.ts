import React, { useEffectEvent } from 'react';

export const useScrollLock = ({
  direction = 'both',
  isLocked,
  getElement = () => document.body,
}: {
  isLocked: boolean;
  getElement?: () => HTMLElement;
  direction?: 'both' | 'vertical' | 'horizontal';
}) => {
  const handleLock = useEffectEvent(() => {
    const element = getElement();

    const lockHandle = lockManager.get(element);

    // if lockHandle found, increment the lock count
    // else create a new lock handle with lock count 1
    if (lockHandle) {
      lockManager.set(element, {
        style: lockHandle.style,
        lockCount: lockHandle.lockCount + 1,
      });

      return;
    }

    lockManager.set(element, {
      lockCount: 1,
      style: {
        paddingBottom: element.style.paddingBottom,
        paddingRight: element.style.paddingRight,
        overflowY: element.style.overflowY,
        overflowX: element.style.overflowX,
      },
    });

    const isBody = getElement() === document.body;

    const verticalScrollBarWidth = isBody
      ? innerWidth - document?.documentElement.offsetWidth
      : element.offsetWidth - element.clientWidth;

    const horizontalScrollBarHeight = isBody
      ? innerHeight - document?.documentElement.offsetHeight
      : element.offsetHeight - element.clientHeight;

    const computedStyles = getComputedStyle(element);

    const originalPaddingRight = computedStyles.paddingRight;
    const originalPaddingBottom = computedStyles.paddingBottom;

    const paddingRight = `${
      parseInt(originalPaddingRight, 10) + verticalScrollBarWidth
    }px`;

    const paddingBottom = `${
      parseInt(originalPaddingBottom, 10) + horizontalScrollBarHeight
    }px`;

    if (direction === 'both') {
      element.style.overflowY = 'hidden';
      element.style.overflowX = 'hidden';
      element.style.paddingRight = paddingRight;
      element.style.paddingBottom = paddingBottom;
    }

    if (direction === 'vertical') {
      element.style.overflowY = 'hidden';
      element.style.paddingRight = paddingRight;
    }

    if (direction === 'horizontal') {
      element.style.overflowX = 'hidden';
      element.style.paddingBottom = paddingBottom;
    }
  });

  const handleUnlock = useEffectEvent(() => {
    const ele = getElement();

    const lockHandle = lockManager.get(ele);

    if (!lockHandle) return;

    lockManager.set(ele, {
      style: lockHandle.style,
      lockCount: Math.max(0, lockHandle.lockCount - 1),
    });

    const currentLockHandle = lockManager.get(ele);

    if (!currentLockHandle) throw new Error('Lock handle not found');

    if (currentLockHandle.lockCount > 0) return;

    lockManager.delete(ele);

    const { paddingBottom, paddingRight, overflowY, overflowX } =
      currentLockHandle.style;

    if (direction === 'both') {
      ele.style.overflowY = overflowY;
      ele.style.overflowX = overflowX;
      ele.style.paddingRight = paddingRight;
      ele.style.paddingBottom = paddingBottom;
    }

    if (direction === 'vertical') {
      ele.style.overflowY = overflowY;
      ele.style.paddingRight = paddingRight;
    }

    if (direction === 'horizontal') {
      ele.style.overflowX = overflowX;
      ele.style.paddingBottom = paddingBottom;
    }
  });

  React.useEffect(() => {
    if (isLocked) {
      handleLock();
    } else {
      handleUnlock();
    }

    return () => {
      handleUnlock();
    };
  }, [isLocked]);
};

type LockObject = {
  lockCount: number;
  style: {
    paddingBottom: string;
    paddingRight: string;
    overflowY: string;
    overflowX: string;
  };
};

const lockManager = new Map<HTMLElement, LockObject>();
