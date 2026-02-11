import { IconLock, IconLockOpen } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { Button } from '~/components/ui/button';
import { useScrollLock } from './use-scroll-lock';

export function UseScrollLockDemo() {
  const [isLocked, setIsLocked] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useScrollLock({
    isLocked,
    getElement: () => scrollContainerRef.current!,
  });

  return (
    <section data-demo>
      <p className='font-medium'>
        Scroll Lock Status: {isLocked ? 'LOCKED' : 'UNLOCKED'}
      </p>

      <p className='text-muted-foreground mt-1 text-sm'>
        Controls the scrollability of the container below.
      </p>

      <Button className='mt-4 w-full' onClick={() => setIsLocked(!isLocked)}>
        {isLocked ? <IconLock /> : <IconLockOpen />}
        {isLocked ? 'Unlock Scroll' : 'Lock Scroll'}
      </Button>

      <div className='relative mt-8 flex h-64 overflow-hidden rounded-lg border-2'>
        {isLocked ? (
          <div className='bg-background/20 absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col content-center items-center rounded-md border p-4 shadow-md backdrop-blur-xs'>
            <div className='bg-foreground/15 inline-block rounded-full p-3'>
              <IconLock size={32} />
            </div>

            <p className='mt-3 text-center text-sm font-bold text-balance'>
              Scroll is locked!
            </p>

            <p className='mt-3 text-center text-sm text-balance'>
              Try scrolling inside the container.
            </p>
          </div>
        ) : null}

        <div
          ref={scrollContainerRef}
          className='text-muted-foreground grow space-y-4 overflow-auto p-4 text-sm'
        >
          <h3 className='text-base font-semibold'>Scrollable Container</h3>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>

          <div className='bg-foreground/10 text-muted-foreground flex h-32 items-center justify-center rounded-md text-sm'>
            Spacer Block
          </div>

          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>

          <div className='bg-foreground/10 text-muted-foreground flex h-32 items-center justify-center rounded-md text-sm'>
            Spacer Block
          </div>

          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>
        </div>
      </div>
    </section>
  );
}
