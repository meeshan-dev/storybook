import {
  IconBell,
  IconCloud,
  IconDeviceAnalytics,
  IconLock,
  IconMail,
  IconMoon,
  IconMoodHappyFilled,
  IconMoodNeutral,
  IconShield,
  IconWifi,
} from '@tabler/icons-react';
import { Badge } from '~/components/ui/badge';
import { cn } from '~/lib/utils';
import { SwitchIcon, SwitchRoot } from './switch';

export function SwitchDemo() {
  return (
    <div className='flex grow flex-col items-center justify-center gap-12 py-10'>
      <NotificationPreferences />
      <PrivacySettings />
      <FeatureToggles />
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  1. Notification Preferences — Settings panel pattern */
/* ———————————————————————————————————————————————————— */

const notificationSettings = [
  {
    id: 'email',
    icon: IconMail,
    title: 'Email Notifications',
    description: 'Receive updates via email',
    defaultChecked: true,
  },
  {
    id: 'push',
    icon: IconBell,
    title: 'Push Notifications',
    description: 'Get notified on your device',
    defaultChecked: true,
  },
  {
    id: 'marketing',
    icon: IconDeviceAnalytics,
    title: 'Marketing Updates',
    description: 'News about products and features',
    defaultChecked: false,
  },
];

function NotificationPreferences() {
  return (
    <section className='w-full max-w-md'>
      <div className='mb-4 text-center'>
        <Badge variant='secondary' className='mb-2'>
          Settings Panel
        </Badge>
        <h2 className='text-xl font-bold'>Notification Preferences</h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Choose how you want to be notified
        </p>
      </div>

      <div className='divide-border divide-y rounded-xl border'>
        {notificationSettings.map(
          ({ id, icon: Icon, title, description, defaultChecked }) => (
            <label
              key={id}
              className='group flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-secondary/50'
            >
              <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg'>
                <Icon size={20} />
              </div>
              <div className='flex-1'>
                <p className='font-medium'>{title}</p>
                <p className='text-muted-foreground text-sm'>{description}</p>
              </div>
              <SwitchRoot defaultChecked={defaultChecked}>
                <Track>
                  <Thumb />
                </Track>
              </SwitchRoot>
            </label>
          ),
        )}
      </div>
    </section>
  );
}

/* ———————————————————————————————————————————————————— */
/*  2. Privacy Settings — Security-focused toggles       */
/* ———————————————————————————————————————————————————— */

const privacySettings = [
  {
    id: 'two-factor',
    icon: IconShield,
    title: 'Two-Factor Authentication',
    description: 'Add an extra layer of security',
    defaultChecked: true,
  },
  {
    id: 'private-profile',
    icon: IconLock,
    title: 'Private Profile',
    description: 'Only approved followers can see your content',
    defaultChecked: false,
  },
  {
    id: 'activity-status',
    icon: IconWifi,
    title: 'Show Activity Status',
    description: 'Let others see when you\'re online',
    defaultChecked: true,
    disabled: true,
  },
];

function PrivacySettings() {
  return (
    <section className='w-full max-w-md'>
      <div className='mb-4 text-center'>
        <Badge variant='secondary' className='mb-2'>
          Privacy & Security
        </Badge>
        <h2 className='text-xl font-bold'>Privacy Settings</h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Control your privacy and security
        </p>
      </div>

      <div className='space-y-3'>
        {privacySettings.map(
          ({ id, icon: Icon, title, description, defaultChecked, disabled }) => (
            <label
              key={id}
              className={cn(
                'group flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors',
                'hover:bg-secondary/50',
                'has-[input:checked]:border-emerald-600/30 has-[input:checked]:bg-emerald-600/5',
                disabled && 'pointer-events-none opacity-50',
              )}
            >
              <div
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-lg',
                  'bg-secondary text-muted-foreground',
                  'group-has-[input:checked]:bg-emerald-600/10 group-has-[input:checked]:text-emerald-600 dark:group-has-[input:checked]:text-emerald-400',
                )}
              >
                <Icon size={20} />
              </div>
              <div className='flex-1'>
                <p className='font-medium'>{title}</p>
                <p className='text-muted-foreground text-sm'>{description}</p>
              </div>
              <SwitchRoot defaultChecked={defaultChecked} disabled={disabled}>
                <Track>
                  <Thumb />
                </Track>
              </SwitchRoot>
            </label>
          ),
        )}
      </div>
    </section>
  );
}

/* ———————————————————————————————————————————————————— */
/*  3. Feature Toggles — App customization options       */
/* ———————————————————————————————————————————————————— */

function FeatureToggles() {
  return (
    <section className='w-full max-w-md'>
      <div className='mb-4 text-center'>
        <Badge variant='secondary' className='mb-2'>
          Custom Icons
        </Badge>
        <h2 className='text-xl font-bold'>App Features</h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Toggle features with custom visual indicators
        </p>
      </div>

      <div className='space-y-3'>
        {/* Dark Mode with moon icon */}
        <label className='group flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-secondary/50 has-[input:checked]:border-blue-600/30 has-[input:checked]:bg-blue-600/5'>
          <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground group-has-[input:checked]:bg-blue-600/10 group-has-[input:checked]:text-blue-600 dark:group-has-[input:checked]:text-blue-400'>
            <IconMoon size={20} />
          </div>
          <div className='flex-1'>
            <p className='font-medium'>Dark Mode</p>
            <p className='text-muted-foreground text-sm'>
              Reduce eye strain in low light
            </p>
          </div>
          <SwitchRoot defaultChecked>
            <TrackBlue>
              <Thumb>
                <SwitchIcon type='off'>
                  <span className='text-xs'>☀️</span>
                </SwitchIcon>
                <SwitchIcon type='on'>
                  <span className='text-xs'>🌙</span>
                </SwitchIcon>
              </Thumb>
            </TrackBlue>
          </SwitchRoot>
        </label>

        {/* Auto-Sync with cloud icon */}
        <label className='group flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-secondary/50 has-[input:checked]:border-purple-600/30 has-[input:checked]:bg-purple-600/5'>
          <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground group-has-[input:checked]:bg-purple-600/10 group-has-[input:checked]:text-purple-600 dark:group-has-[input:checked]:text-purple-400'>
            <IconCloud size={20} />
          </div>
          <div className='flex-1'>
            <p className='font-medium'>Auto-Sync</p>
            <p className='text-muted-foreground text-sm'>
              Keep data synced across devices
            </p>
          </div>
          <SwitchRoot>
            <TrackPurple>
              <Thumb />
            </TrackPurple>
          </SwitchRoot>
        </label>

        {/* Mood toggle with emoji icons */}
        <label className='group flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-secondary/50 has-[input:checked]:border-amber-600/30 has-[input:checked]:bg-amber-600/5'>
          <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground group-has-[input:checked]:bg-amber-600/10 group-has-[input:checked]:text-amber-600 dark:group-has-[input:checked]:text-amber-400'>
            <IconMoodHappyFilled size={20} />
          </div>
          <div className='flex-1'>
            <p className='font-medium'>Happy Mode</p>
            <p className='text-muted-foreground text-sm'>
              Add positive vibes to your experience
            </p>
          </div>
          <SwitchRoot defaultChecked>
            <TrackAmber>
              <Thumb>
                <SwitchIcon type='off'>
                  <IconMoodNeutral size={14} className='text-muted-foreground' />
                </SwitchIcon>
                <SwitchIcon type='on'>
                  <IconMoodHappyFilled
                    size={14}
                    className='text-amber-500 dark:text-amber-400'
                  />
                </SwitchIcon>
              </Thumb>
            </TrackAmber>
          </SwitchRoot>
        </label>
      </div>
    </section>
  );
}

/* ———————————————————————————————————————————————————— */
/*  Visual Helpers                                       */
/* ———————————————————————————————————————————————————— */

function Track({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-foreground/20 relative flex h-6 w-11 items-center rounded-full px-0.5 transition-colors group-has-[input:checked]:bg-emerald-600'>
      {children}
    </div>
  );
}

function TrackBlue({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-foreground/20 relative flex h-6 w-11 items-center rounded-full px-0.5 transition-colors group-has-[input:checked]:bg-blue-600'>
      {children}
    </div>
  );
}

function TrackPurple({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-foreground/20 relative flex h-6 w-11 items-center rounded-full px-0.5 transition-colors group-has-[input:checked]:bg-purple-600'>
      {children}
    </div>
  );
}

function TrackAmber({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-foreground/20 relative flex h-6 w-11 items-center rounded-full px-0.5 transition-colors group-has-[input:checked]:bg-amber-500'>
      {children}
    </div>
  );
}

function Thumb({ children }: { children?: React.ReactNode }) {
  return (
    <div className='bg-background flex size-5 items-center justify-center rounded-full shadow transition-transform group-has-[input:checked]:translate-x-5'>
      {children}
    </div>
  );
}
