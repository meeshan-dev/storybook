import {
  IconArrowRight,
  IconCheck,
  IconLoader2,
  IconMail,
  IconMapPin,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
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
    <div className='flex grow flex-col items-center justify-center gap-8 py-10'>
      <div className='grid w-full max-w-3xl gap-8 md:grid-cols-2'>
        <EditProfileDialog />
        <ContactFormDialog />
        <MultiStepWizardDialog />
        <NestedDialogDemo />
      </div>
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  1. Edit Profile — Form dialog with validation       */
/* ———————————————————————————————————————————————————— */

function EditProfileDialog() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 1500);
  };

  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='secondary'>Form Dialog</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          Edit user profile with loading state
        </p>
      </div>

      <DialogRoot>
        <DialogTrigger>
          {(props) => (
            <Button {...props} className='w-full'>
              <IconUser size={18} />
              Edit Profile
            </Button>
          )}
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <div className='flex items-start justify-between'>
              <div>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your personal information
                </DialogDescription>
              </div>
              <DialogClose>
                {(props) => (
                  <Button {...props} variant='ghost' size='icon'>
                    <IconX size={18} />
                  </Button>
                )}
              </DialogClose>
            </div>

            <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input
                    id='firstName'
                    defaultValue='Muhammad'
                    placeholder='Enter first name'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input
                    id='lastName'
                    defaultValue='Zeeshan'
                    placeholder='Enter last name'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <div className='relative'>
                  <IconMail
                    size={16}
                    className='text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2'
                  />
                  <Input
                    id='email'
                    type='email'
                    defaultValue='zeeshan@example.com'
                    className='pl-9'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='location'>Location</Label>
                <div className='relative'>
                  <IconMapPin
                    size={16}
                    className='text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2'
                  />
                  <Input
                    id='location'
                    defaultValue='San Francisco, CA'
                    className='pl-9'
                  />
                </div>
              </div>

              <div className='flex justify-end gap-3 pt-4'>
                <DialogClose>
                  {(props) => (
                    <Button {...props} variant='outline' type='button'>
                      Cancel
                    </Button>
                  )}
                </DialogClose>
                <Button type='submit' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <IconLoader2 size={16} className='animate-spin' />
                      Saving...
                    </>
                  ) : isSaved ? (
                    <>
                      <IconCheck size={16} />
                      Saved!
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  2. Contact Form — Longer form with textarea         */
/* ———————————————————————————————————————————————————— */

function ContactFormDialog() {
  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='secondary'>Contact Form</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          Full-width dialog with message input
        </p>
      </div>

      <DialogRoot>
        <DialogTrigger>
          {(props) => (
            <Button {...props} variant='outline' className='w-full'>
              <IconMail size={18} />
              Contact Us
            </Button>
          )}
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>Get in Touch</DialogTitle>
            <DialogDescription>
              Have a question or feedback? We'd love to hear from you.
            </DialogDescription>

            <form className='mt-4 space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='contactName'>Your Name</Label>
                <Input id='contactName' placeholder='John Doe' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='contactEmail'>Email Address</Label>
                <Input
                  id='contactEmail'
                  type='email'
                  placeholder='john@example.com'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='subject'>Subject</Label>
                <Input id='subject' placeholder='How can we help?' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='message'>Message</Label>
                <Textarea
                  id='message'
                  placeholder='Tell us more about your inquiry...'
                  rows={4}
                />
              </div>

              <div className='flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end'>
                <DialogClose>
                  {(props) => (
                    <Button {...props} variant='ghost' type='button'>
                      Cancel
                    </Button>
                  )}
                </DialogClose>
                <Button type='submit'>Send Message</Button>
              </div>
            </form>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  3. Multi-Step Wizard — Step navigation pattern      */
/* ———————————————————————————————————————————————————— */

function MultiStepWizardDialog() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const steps = [
    {
      title: 'Personal Info',
      description: 'Basic information about you',
      content: (
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label>Full Name</Label>
            <Input placeholder='Enter your full name' />
          </div>
          <div className='space-y-2'>
            <Label>Date of Birth</Label>
            <Input type='date' />
          </div>
        </div>
      ),
    },
    {
      title: 'Preferences',
      description: 'Customize your experience',
      content: (
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label>Notification Frequency</Label>
            <select className='border-input bg-background w-full rounded-md border px-3 py-2'>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div className='space-y-2'>
            <Label>Language</Label>
            <select className='border-input bg-background w-full rounded-md border px-3 py-2'>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: 'Confirmation',
      description: 'Review and confirm',
      content: (
        <div className='bg-secondary/50 rounded-lg p-4 text-center'>
          <IconCheck
            size={48}
            className='mx-auto mb-3 text-emerald-500 dark:text-emerald-400'
          />
          <p className='font-semibold'>All set!</p>
          <p className='text-muted-foreground mt-1 text-sm'>
            Your preferences have been configured.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='secondary'>Multi-Step Wizard</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          Progressive form with step indicator
        </p>
      </div>

      <DialogRoot>
        <DialogTrigger>
          {(props) => (
            <Button {...props} variant='secondary' className='w-full'>
              Start Setup Wizard
            </Button>
          )}
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            {/* Progress indicator */}
            <div className='mb-6'>
              <div className='mb-2 flex justify-between text-sm'>
                <span className='font-medium'>
                  Step {step} of {totalSteps}
                </span>
                <span className='text-muted-foreground'>
                  {steps[step - 1].title}
                </span>
              </div>
              <div className='bg-secondary h-2 overflow-hidden rounded-full'>
                <div
                  className='bg-primary h-full transition-all duration-300'
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            <DialogTitle>{steps[step - 1].title}</DialogTitle>
            <DialogDescription>{steps[step - 1].description}</DialogDescription>

            <div className='mt-4'>{steps[step - 1].content}</div>

            <div className='mt-6 flex justify-between'>
              <Button
                variant='outline'
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
              >
                Back
              </Button>

              {step < totalSteps ? (
                <Button
                  onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
                >
                  Continue
                  <IconArrowRight size={16} />
                </Button>
              ) : (
                <DialogClose>
                  {(props) => (
                    <Button {...props} onClick={() => setStep(1)}>
                      Complete
                    </Button>
                  )}
                </DialogClose>
              )}
            </div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  4. Nested Dialogs — Layer management demo           */
/* ———————————————————————————————————————————————————— */

function NestedDialogDemo() {
  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='secondary'>Nested Dialogs</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          Stacked dialogs with proper layer handling
        </p>
      </div>

      <DialogRoot>
        <DialogTrigger>
          {(props) => (
            <Button {...props} variant='outline' className='w-full'>
              Open Stacked Dialog
            </Button>
          )}
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>First Layer</DialogTitle>
            <DialogDescription>
              This is the base dialog. Open another to test layer management.
            </DialogDescription>

            <p className='text-muted-foreground mt-4 text-sm'>
              Notice how each layer gets its own overlay and only the topmost
              dialog responds to keyboard and click events.
            </p>

            <div className='mt-4 flex gap-3'>
              <DialogClose>
                {(props) => (
                  <Button {...props} variant='outline'>
                    Close
                  </Button>
                )}
              </DialogClose>

              <DialogRoot>
                <DialogTrigger>
                  {(props) => <Button {...props}>Open Second Dialog</Button>}
                </DialogTrigger>

                <DialogPortal>
                  <DialogOverlay />
                  <DialogContent>
                    <DialogTitle>Second Layer</DialogTitle>
                    <DialogDescription>
                      Escape key and outside click only affect this layer.
                    </DialogDescription>

                    <div className='mt-4 flex gap-3'>
                      <DialogClose>
                        {(props) => (
                          <Button {...props} variant='outline'>
                            Close
                          </Button>
                        )}
                      </DialogClose>

                      <AlertDialogRoot>
                        <AlertDialogTrigger>
                          {(props) => (
                            <Button {...props} variant='destructive'>
                              Confirm Action
                            </Button>
                          )}
                        </AlertDialogTrigger>

                        <AlertDialogPortal>
                          <AlertDialogOverlay />
                          <AlertDialogContent>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This demonstrates Alert Dialog as the third layer.
                              It won't close on outside click.
                            </AlertDialogDescription>

                            <div className='mt-4 flex justify-end gap-3'>
                              <AlertDialogClose>
                                {(props) => (
                                  <Button {...props} variant='outline'>
                                    Cancel
                                  </Button>
                                )}
                              </AlertDialogClose>
                              <AlertDialogClose>
                                {(props) => <Button {...props}>Confirm</Button>}
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
    </div>
  );
}
