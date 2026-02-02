import { Button } from '~/components/ui/button';
import {
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../alert-dialog/alert-dialog';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './dialog';

export function DialogDemo() {
  return (
    <div className='flex grow flex-col items-center justify-center gap-6 *:w-full *:max-w-60'>
      <BasicDialog />
      <NestedDialog />
    </div>
  );
}

function BasicDialog() {
  return (
    <DialogRoot>
      <DialogTrigger>
        {(props) => <Button {...props}>Open dialog</Button>}
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />

        <DialogContent>
          <div className='grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center sm:place-items-start sm:text-left'>
            <DialogTitle>Basic dialog</DialogTitle>
            <DialogDescription>
              This dialog closes on Escape, outside click, or the close button.
            </DialogDescription>
          </div>

          <p className='text-muted-foreground text-sm'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos aut
            eaque molestiae dolores dolore libero a perferendis, saepe eveniet!
            Explicabo similique atque voluptate vero odit architecto nostrum
            dolores harum eligendi?
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
  );
}

function NestedDialog() {
  return (
    <DialogRoot>
      <DialogTrigger>
        {(props) => (
          <Button variant='outline' {...props}>
            Open stacked dialog
          </Button>
        )}
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />

        <DialogContent>
          <DialogTitle>First dialog</DialogTitle>

          <p className='text-muted-foreground text-sm'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos aut
            eaque molestiae dolores dolore
          </p>

          <div className='flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto'>
            <DialogClose>
              {(props) => (
                <Button variant='ghost' {...props}>
                  Close
                </Button>
              )}
            </DialogClose>

            <DialogRoot>
              <DialogTrigger>
                {(props) => <Button {...props}>Open second</Button>}
              </DialogTrigger>

              <DialogPortal>
                <DialogOverlay />

                <DialogContent>
                  <div className='grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center sm:place-items-start sm:text-left'>
                    <DialogTitle>Second dialog</DialogTitle>
                    <DialogDescription>
                      Only the top dialog should respond to Escape or outside
                      clicks.
                    </DialogDescription>
                  </div>

                  <p className='text-muted-foreground text-sm'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Eos aut eaque molestiae dolores dolore libero a perferendis,
                    saepe eveniet! Explicabo similique atque voluptate vero odit
                    architecto nostrum dolores harum eligendi?
                  </p>

                  <div className='flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto'>
                    <DialogClose>
                      {(props) => (
                        <Button size='sm' {...props} variant='ghost'>
                          Close
                        </Button>
                      )}
                    </DialogClose>

                    <AlertDialogRoot>
                      <AlertDialogTrigger>
                        {(props) => (
                          <Button {...props} variant='secondary'>
                            Open Alert Dialog
                          </Button>
                        )}
                      </AlertDialogTrigger>

                      <AlertDialogPortal>
                        <AlertDialogOverlay />

                        <AlertDialogContent>
                          <div className='grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center sm:place-items-start sm:text-left'>
                            <AlertDialogTitle>
                              Confirm Lorem ipsum
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Quae, sint!
                            </AlertDialogDescription>
                          </div>

                          <div className='flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto'>
                            <AlertDialogClose>
                              {(props) => (
                                <Button {...props} variant='secondary'>
                                  Close
                                </Button>
                              )}
                            </AlertDialogClose>
                          </div>
                        </AlertDialogContent>
                      </AlertDialogPortal>
                    </AlertDialogRoot>
                  </div>
                </DialogContent>
              </DialogPortal>
            </DialogRoot>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
}
