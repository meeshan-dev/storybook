import { Button } from '~/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '../dialog/dialog';
import { FloatingArrow } from '../floating-arrow/floating-arrow';
import {
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from './tooltip';

export function TooltipPreview() {
  return (
    <main className='flex grow flex-col items-center justify-center gap-4 py-10 *:w-full *:max-w-50'>
      {/* Default */}
      <TooltipRoot>
        <TooltipTrigger>
          {(props) => <Button {...props}>Default tooltip</Button>}
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent placement='top'>
            {(props, floatingArrowProps) => (
              <div
                {...props}
                className='bg-background ring-foreground/10 relative z-50 rounded-full px-3 py-1.5 text-sm ring-1'
              >
                <FloatingArrow {...floatingArrowProps} />
                <span>Shows on hover and focus</span>
              </div>
            )}
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>

      {/* Focus only (keyboard-friendly) */}
      <TooltipRoot trigger='focus'>
        <TooltipTrigger>
          {(props) => (
            <Button {...props} variant='secondary'>
              Keyboard Focus only
            </Button>
          )}
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent placement='top'>
            {(props, floatingArrowProps) => (
              <div
                {...props}
                className='bg-background ring-foreground/10 relative z-50 rounded-full px-3 py-1.5 text-sm ring-1'
              >
                <FloatingArrow {...floatingArrowProps} />
                <span>Appears only via keyboard focus</span>
              </div>
            )}
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>

      {/* Hover only */}
      <TooltipRoot trigger='hover'>
        <TooltipTrigger>
          {(props) => (
            <Button {...props} variant='secondary'>
              Hover only
            </Button>
          )}
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent placement='top'>
            {(props, floatingArrowProps) => (
              <div
                {...props}
                className='bg-background ring-foreground/10 relative z-50 rounded-full px-3 py-1.5 text-sm ring-1'
              >
                <FloatingArrow {...floatingArrowProps} />
                <span>Mouse hover only</span>
              </div>
            )}
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>

      {/* Interactive tooltip */}
      <TooltipRoot>
        <TooltipTrigger>
          {(props) => (
            <Button {...props} variant='secondary'>
              Interactive
            </Button>
          )}
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent disableInteractive={false}>
            {(props, floatingArrowProps) => (
              <div
                {...props}
                className='bg-background ring-foreground/10 relative z-50 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ring-1'
              >
                <FloatingArrow {...floatingArrowProps} />
                <p>You can hover this.</p>
                <Button size='xs'>Action</Button>
              </div>
            )}
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>

      {/* Disabled */}
      <TooltipRoot>
        <TooltipTrigger>
          {(props) => (
            <Button disabled {...props}>
              Disabled
            </Button>
          )}
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent placement='top'>
            {({ ...props }) => (
              <div
                {...props}
                className='bg-background ring-foreground/10 relative z-50 rounded-full px-3 py-1.5 text-sm ring-1'
              >
                You should not see this
              </div>
            )}
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>

      <DialogRoot>
        <DialogTrigger>
          {(props) => (
            <Button {...props} variant='secondary'>
              Open dialog
            </Button>
          )}
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay />

          <DialogContent>
            <div className='grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center sm:place-items-start sm:text-left'>
              <DialogTitle>Basic dialog</DialogTitle>
              <DialogDescription>
                This dialog closes on Escape, outside click, or the close
                button.
              </DialogDescription>
            </div>

            <p className='text-muted-foreground text-sm'>
              Hover over{' '}
              <TooltipRoot>
                <TooltipTrigger>
                  {(props) => (
                    <Button {...props} size='xs'>
                      Tooltip
                    </Button>
                  )}
                </TooltipTrigger>

                <TooltipPortal>
                  <TooltipContent placement='top'>
                    {(props, floatingArrowProps) => (
                      <div
                        {...props}
                        className='bg-background ring-foreground/10 relative z-50 rounded-full px-3 py-1.5 text-sm ring-1'
                      >
                        <FloatingArrow {...floatingArrowProps} />
                        <span>I am in dialog</span>
                      </div>
                    )}
                  </TooltipContent>
                </TooltipPortal>
              </TooltipRoot>{' '}
              inside dialog to see tooltip. if tooltip is open and you press
              Escape key, tooltip should close first then dialog should close on
              next Escape key press.
            </p>

            <div className='flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto'>
              <DialogClose>
                {(props) => (
                  <Button variant='secondary' {...props}>
                    Close
                  </Button>
                )}
              </DialogClose>
            </div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </main>
  );
}
