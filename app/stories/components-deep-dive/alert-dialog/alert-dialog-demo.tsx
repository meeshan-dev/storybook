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
} from './alert-dialog';

export function AlertDialogDemo() {
  return (
    <div className='flex grow items-center justify-center'>
      <article className='bg-secondary w-full max-w-lg space-y-4 rounded-lg p-5'>
        <h1 className='text-xl font-semibold text-red-600 dark:text-red-400'>
          Danger Zone
        </h1>

        <p className='text-muted-foreground text-sm'>
          We don't take this action lightly. Your data will be permanently
          deleted. Proceed with caution.
        </p>

        <AlertDialogRoot>
          <AlertDialogTrigger>
            {(props) => (
              <Button {...props} type='submit' className='w-full'>
                Delete My Account
              </Button>
            )}
          </AlertDialogTrigger>

          <AlertDialogPortal>
            <AlertDialogOverlay />

            <AlertDialogContent>
              <div className='grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center sm:place-items-start sm:text-left'>
                <AlertDialogTitle>Confirm Delete Account?</AlertDialogTitle>

                <AlertDialogDescription>
                  Are you sure you want to delete this account ? This action
                  cannot be undone.
                </AlertDialogDescription>
              </div>

              <div className='flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto'>
                <AlertDialogClose>
                  {(props) => (
                    <Button {...props} variant='ghost'>
                      Close
                    </Button>
                  )}
                </AlertDialogClose>

                <AlertDialogClose>
                  {(props) => <Button {...props}>Delete</Button>}
                </AlertDialogClose>
              </div>
            </AlertDialogContent>
          </AlertDialogPortal>
        </AlertDialogRoot>
      </article>
    </div>
  );
}
