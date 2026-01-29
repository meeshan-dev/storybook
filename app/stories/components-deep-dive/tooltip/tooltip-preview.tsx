import { Button } from '~/components/ui/button';
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
            {({ floatingArrowProps, ...props }) => (
              <div
                {...props}
                className='bg-background ring-foreground/10 relative z-50 rounded-full px-3 py-1.5 text-sm ring-1'
              >
                <FloatingArrow {...floatingArrowProps} />
                Shows on hover and focus
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
            {({ ...props }) => (
              <div
                {...props}
                className='bg-background ring-foreground/10 relative z-50 rounded-full px-3 py-1.5 text-sm ring-1'
              >
                Appears only via keyboard focus
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
            {({ ...props }) => (
              <div
                {...props}
                className='bg-background ring-foreground/10 relative z-50 rounded-full px-3 py-1.5 text-sm ring-1'
              >
                Mouse hover only
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
            {({ ...props }) => (
              <div
                {...props}
                className='bg-background ring-foreground/10 relative z-50 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ring-1'
              >
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
    </main>
  );
}
