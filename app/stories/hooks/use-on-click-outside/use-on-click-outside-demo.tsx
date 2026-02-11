import { useRef, useState } from 'react';
import { Button } from '~/components/ui/button';
import { useOnClickOutside } from './use-on-click-outside';

export function UseOnClickOutsideDemo() {
  const ref = useRef<HTMLDivElement>(null);

  const [clickCount, setClickCount] = useState(0);

  useOnClickOutside(ref, (e) => {
    if (e.target instanceof HTMLElement && e.target.dataset.reset) {
      return;
    }

    setClickCount((prev) => prev + 1);
  });

  return (
    <section data-demo className='select-none'>
      <p className='font-medium'>
        <strong>Outside Clicks Detected:</strong> {clickCount}
      </p>

      <p className='text-muted-foreground mt-2 text-sm'>
        Click the blue box (inside) vs the surrounding area (outside).
      </p>

      <div
        ref={ref}
        className='my-8 flex h-32 w-full cursor-pointer items-center justify-center rounded bg-blue-600/50 p-4 text-center text-sm transition-colors select-none hover:bg-blue-700/50 dark:bg-blue-400/50 dark:hover:bg-blue-500/50'
      >
        Click inside me
        <br />
        (Does NOT trigger handler)
      </div>

      <Button data-reset variant='outline' onClick={() => setClickCount(0)}>
        Reset Counter
      </Button>
    </section>
  );
}
