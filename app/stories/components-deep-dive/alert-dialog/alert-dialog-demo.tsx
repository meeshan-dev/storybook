import {
  IconAlertTriangle,
  IconLogout,
  IconTrash,
  IconUserMinus,
} from '@tabler/icons-react';
import { Badge } from '~/components/ui/badge';
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
    <div className='flex grow flex-col items-center justify-center gap-8 py-10'>
      <div className='grid w-full max-w-3xl gap-8 md:grid-cols-2'>
        <DeleteAccountDialog />
        <DeleteItemDialog />
        <LogoutDialog />
        <UnsavedChangesDialog />
      </div>
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  1. Delete Account — High-severity destructive action */
/* ———————————————————————————————————————————————————— */

function DeleteAccountDialog() {
  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='destructive'>Destructive</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          High-severity account deletion
        </p>
      </div>

      <div className='bg-destructive/5 border-destructive/20 w-full rounded-lg border p-4'>
        <div className='flex items-start gap-3'>
          <div className='bg-destructive/10 text-destructive flex size-10 shrink-0 items-center justify-center rounded-lg'>
            <IconUserMinus size={20} />
          </div>
          <div className='flex-1'>
            <h3 className='font-semibold text-red-600 dark:text-red-400'>
              Danger Zone
            </h3>
            <p className='text-muted-foreground mt-1 text-sm'>
              Permanently delete your account and all associated data.
            </p>
          </div>
        </div>

        <AlertDialogRoot>
          <AlertDialogTrigger>
            {(props) => (
              <Button {...props} variant='destructive' className='mt-4 w-full'>
                <IconTrash size={16} />
                Delete My Account
              </Button>
            )}
          </AlertDialogTrigger>

          <AlertDialogPortal>
            <AlertDialogOverlay />
            <AlertDialogContent>
              <div className='flex gap-4'>
                <div className='bg-destructive/10 text-destructive flex size-12 shrink-0 items-center justify-center rounded-full'>
                  <IconAlertTriangle size={24} />
                </div>
                <div>
                  <AlertDialogTitle>Delete Account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action is permanent and cannot be undone. All your
                    data, including projects, files, and settings, will be
                    permanently deleted.
                  </AlertDialogDescription>
                </div>
              </div>

              <div className='bg-secondary/50 mt-4 rounded-lg p-3'>
                <p className='text-sm font-medium'>This will delete:</p>
                <ul className='text-muted-foreground mt-2 space-y-1 text-sm'>
                  <li>• All 47 projects and their files</li>
                  <li>• 1,234 saved items and bookmarks</li>
                  <li>• Team memberships and shared access</li>
                  <li>• Payment history and subscription</li>
                </ul>
              </div>

              <div className='mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                <AlertDialogClose>
                  {(props) => (
                    <Button {...props} variant='outline'>
                      Cancel
                    </Button>
                  )}
                </AlertDialogClose>
                <AlertDialogClose>
                  {(props) => (
                    <Button {...props} variant='destructive'>
                      <IconTrash size={16} />
                      Yes, Delete Everything
                    </Button>
                  )}
                </AlertDialogClose>
              </div>
            </AlertDialogContent>
          </AlertDialogPortal>
        </AlertDialogRoot>
      </div>
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  2. Delete Item — Common item deletion pattern        */
/* ———————————————————————————————————————————————————— */

function DeleteItemDialog() {
  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='secondary'>Item Deletion</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          Standard item removal confirmation
        </p>
      </div>

      <div className='bg-secondary/50 w-full rounded-lg border p-4'>
        <div className='flex items-center gap-3'>
          <div className='bg-background flex-1 rounded border p-3'>
            <p className='text-sm font-medium'>project-proposal-v2.pdf</p>
            <p className='text-muted-foreground text-xs'>
              2.4 MB • PDF Document
            </p>
          </div>

          <AlertDialogRoot>
            <AlertDialogTrigger>
              {(props) => (
                <Button {...props} variant='ghost' size='icon'>
                  <IconTrash size={18} className='text-muted-foreground' />
                </Button>
              )}
            </AlertDialogTrigger>

            <AlertDialogPortal>
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogTitle>Delete File?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "project-proposal-v2.pdf"?
                  This action cannot be undone.
                </AlertDialogDescription>

                <div className='mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                  <AlertDialogClose>
                    {(props) => (
                      <Button {...props} variant='outline'>
                        Keep File
                      </Button>
                    )}
                  </AlertDialogClose>
                  <AlertDialogClose>
                    {(props) => (
                      <Button {...props} variant='destructive'>
                        Delete File
                      </Button>
                    )}
                  </AlertDialogClose>
                </div>
              </AlertDialogContent>
            </AlertDialogPortal>
          </AlertDialogRoot>
        </div>
      </div>
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  3. Logout — Session termination confirmation         */
/* ———————————————————————————————————————————————————— */

function LogoutDialog() {
  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='secondary'>Session</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          Logout confirmation with context
        </p>
      </div>

      <AlertDialogRoot>
        <AlertDialogTrigger>
          {(props) => (
            <Button {...props} variant='outline' className='w-full'>
              <IconLogout size={18} />
              Sign Out
            </Button>
          )}
        </AlertDialogTrigger>

        <AlertDialogPortal>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <div className='flex gap-4'>
              <div className='bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full'>
                <IconLogout size={24} />
              </div>
              <div>
                <AlertDialogTitle>Sign Out?</AlertDialogTitle>
                <AlertDialogDescription>
                  You'll need to sign in again to access your account. Any
                  unsaved changes may be lost.
                </AlertDialogDescription>
              </div>
            </div>

            <div className='mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
              <AlertDialogClose>
                {(props) => (
                  <Button {...props} variant='ghost'>
                    Stay Signed In
                  </Button>
                )}
              </AlertDialogClose>
              <AlertDialogClose>
                {(props) => <Button {...props}>Sign Out</Button>}
              </AlertDialogClose>
            </div>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  4. Unsaved Changes — Navigation guard pattern        */
/* ———————————————————————————————————————————————————— */

function UnsavedChangesDialog() {
  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='secondary'>Navigation Guard</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          Prevent accidental data loss
        </p>
      </div>

      <AlertDialogRoot>
        <AlertDialogTrigger>
          {(props) => (
            <Button {...props} variant='secondary' className='w-full'>
              <IconAlertTriangle size={18} />
              Leave Page (Unsaved)
            </Button>
          )}
        </AlertDialogTrigger>

        <AlertDialogPortal>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <div className='flex gap-4'>
              <div className='flex size-12 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400'>
                <IconAlertTriangle size={24} />
              </div>
              <div>
                <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                <AlertDialogDescription>
                  You have unsaved changes that will be lost if you leave this
                  page. Do you want to save before leaving?
                </AlertDialogDescription>
              </div>
            </div>

            <div className='mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
              <AlertDialogClose>
                {(props) => (
                  <Button {...props} variant='ghost'>
                    Cancel
                  </Button>
                )}
              </AlertDialogClose>
              <AlertDialogClose>
                {(props) => (
                  <Button {...props} variant='outline'>
                    Don't Save
                  </Button>
                )}
              </AlertDialogClose>
              <AlertDialogClose>
                {(props) => <Button {...props}>Save & Leave</Button>}
              </AlertDialogClose>
            </div>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>
    </div>
  );
}
