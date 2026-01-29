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
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverPortal,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from './popover';

export function PopoverPreview() {
  return (
    <div className='flex grow flex-col items-center justify-center gap-6 *:w-full *:max-w-60'>
      <PopoverRoot>
        <PopoverTrigger>
          {(props) => <Button {...props}>What's this?</Button>}
        </PopoverTrigger>

        <PopoverPortal>
          <PopoverContent>
            {(props, floatingArrowProps) => (
              <div
                {...props}
                className='bg-background ring-foreground/10 z-50 grid w-[min(100%,calc(100%-2rem))] max-w-sm gap-4 rounded-xl p-4 text-sm ring-1 duration-100 outline-none'
              >
                <FloatingArrow {...floatingArrowProps} />

                <div className='grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center sm:place-items-start sm:text-left'>
                  <PopoverTitle>Notification Settings</PopoverTitle>

                  <PopoverDescription>
                    This setting controls how notifications are delivered.
                  </PopoverDescription>
                </div>

                <p className='text-muted-foreground'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Aliquam optio vel consectetur quidem fuga nemo soluta error
                </p>

                <div className='flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto'>
                  <PopoverClose>
                    {(props) => (
                      <Button {...props} variant='secondary'>
                        Close
                      </Button>
                    )}
                  </PopoverClose>
                </div>
              </div>
            )}
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>

      <DialogRoot>
        <DialogTrigger>
          {(props) => <Button {...props}>Open dialog</Button>}
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay />

          <DialogContent>
            <div className='grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center sm:place-items-start sm:text-left'>
              <DialogTitle>Popover in dialog</DialogTitle>
              <DialogDescription>
                On escape key press or outside click, popover will close first
                then dialog will close on second escape key press.
              </DialogDescription>
            </div>

            <p className='text-muted-foreground text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos aut
              eaque molestiae dolores dolore libero a perferendis, saepe
            </p>

            <div className='flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto'>
              <DialogClose>
                {(props) => (
                  <Button variant='secondary' {...props}>
                    Close
                  </Button>
                )}
              </DialogClose>

              <PopoverRoot>
                <PopoverTrigger>
                  {(props) => <Button {...props}>Open popover</Button>}
                </PopoverTrigger>

                <PopoverPortal>
                  <PopoverContent>
                    {(props, floatingArrowProps) => (
                      <div
                        {...props}
                        className='bg-background ring-foreground/10 z-50 grid w-[min(100%,calc(100%-2rem))] max-w-sm gap-4 rounded-xl p-4 text-sm ring-1 duration-100 outline-none'
                      >
                        <FloatingArrow {...floatingArrowProps} />

                        <div className='grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center sm:place-items-start sm:text-left'>
                          <PopoverTitle>Popover in dialog</PopoverTitle>

                          <PopoverDescription>
                            This is a popover rendered inside a dialog.
                          </PopoverDescription>
                        </div>

                        <p className='text-muted-foreground'>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Aliquam optio vel consectetur quidem fuga nemo
                          soluta error
                        </p>

                        <div className='flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto'>
                          <PopoverClose>
                            {(props) => (
                              <Button {...props} variant='secondary'>
                                Close
                              </Button>
                            )}
                          </PopoverClose>
                        </div>
                      </div>
                    )}
                  </PopoverContent>
                </PopoverPortal>
              </PopoverRoot>
            </div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
  );
}
