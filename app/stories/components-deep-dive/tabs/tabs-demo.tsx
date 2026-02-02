import {
  IconBell,
  IconCode,
  IconCreditCard,
  IconFileText,
  IconHistory,
  IconKey,
  IconLayoutDashboard,
  IconPalette,
  IconSettings,
  IconShield,
  IconUser,
} from '@tabler/icons-react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from './tabs';

export function TabsDemo() {
  return (
    <div className='flex grow flex-col items-center justify-center gap-12 py-10'>
      <DashboardTabs />
      <SettingsTabs />
      <ProductDetailsTabs />
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  1. Dashboard Tabs — Analytics/overview pattern       */
/* ———————————————————————————————————————————————————— */

function DashboardTabs() {
  return (
    <section className='w-full max-w-2xl'>
      <div className='mb-4 text-center'>
        <Badge variant='secondary' className='mb-2'>
          Automatic Activation • Loop
        </Badge>
        <h2 className='text-xl font-bold'>Project Dashboard</h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Arrow keys auto-select tabs, loops at edges
        </p>
      </div>

      <div className='overflow-hidden rounded-xl border'>
        <TabsRoot defaultValue='overview' loop>
          <div className='bg-secondary/50 border-b p-1'>
            <TabsList>
              {[
                { value: 'overview', icon: IconLayoutDashboard, label: 'Overview' },
                { value: 'analytics', icon: IconCode, label: 'Analytics' },
                { value: 'activity', icon: IconHistory, label: 'Activity' },
              ].map(({ value, icon: Icon, label }) => (
                <TabsTrigger key={value} value={value}>
                  {(props) => (
                    <Button
                      {...props}
                      variant={props.tabIndex === 0 ? 'default' : 'ghost'}
                      size='sm'
                      className='gap-2 rounded-lg'
                    >
                      <Icon size={16} />
                      {label}
                    </Button>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value='overview'>
            <div className='p-6'>
              <h3 className='mb-4 text-lg font-semibold'>Project Overview</h3>
              <div className='grid gap-4 sm:grid-cols-3'>
                {[
                  { label: 'Total Users', value: '12,847', change: '+12%' },
                  { label: 'Active Sessions', value: '1,234', change: '+8%' },
                  { label: 'Revenue', value: '$48,290', change: '+24%' },
                ].map(({ label, value, change }) => (
                  <div key={label} className='bg-secondary/30 rounded-lg p-4'>
                    <p className='text-muted-foreground text-sm'>{label}</p>
                    <p className='mt-1 text-2xl font-bold'>{value}</p>
                    <p className='mt-1 text-sm text-emerald-600 dark:text-emerald-400'>
                      {change} from last month
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='analytics'>
            <div className='p-6'>
              <h3 className='mb-4 text-lg font-semibold'>Analytics</h3>
              <div className='bg-secondary/30 flex h-48 items-center justify-center rounded-lg'>
                <p className='text-muted-foreground'>Chart visualization area</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='activity'>
            <div className='p-6'>
              <h3 className='mb-4 text-lg font-semibold'>Recent Activity</h3>
              <div className='space-y-3'>
                {[
                  { action: 'New user signup', time: '2 minutes ago' },
                  { action: 'Payment received', time: '15 minutes ago' },
                  { action: 'Project deployed', time: '1 hour ago' },
                  { action: 'Settings updated', time: '3 hours ago' },
                ].map(({ action, time }) => (
                  <div key={action} className='flex items-center justify-between border-b pb-3 last:border-0'>
                    <span>{action}</span>
                    <span className='text-muted-foreground text-sm'>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </TabsRoot>
      </div>
    </section>
  );
}

/* ———————————————————————————————————————————————————— */
/*  2. Settings Tabs — Vertical navigation pattern       */
/* ———————————————————————————————————————————————————— */

function SettingsTabs() {
  return (
    <section className='w-full max-w-2xl'>
      <div className='mb-4 text-center'>
        <Badge variant='secondary' className='mb-2'>
          Vertical Orientation • Manual Activation
        </Badge>
        <h2 className='text-xl font-bold'>Account Settings</h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Press Enter to activate, uses Up/Down arrows
        </p>
      </div>

      <div className='flex gap-4 overflow-hidden rounded-xl border'>
        <TabsRoot defaultValue='profile' orientation='vertical' activationMode='manual'>
          <div className='bg-secondary/30 w-48 shrink-0 border-r p-2'>
            <TabsList>
              {[
                { value: 'profile', icon: IconUser, label: 'Profile' },
                { value: 'security', icon: IconShield, label: 'Security' },
                { value: 'notifications', icon: IconBell, label: 'Notifications' },
                { value: 'billing', icon: IconCreditCard, label: 'Billing' },
                { value: 'appearance', icon: IconPalette, label: 'Appearance' },
              ].map(({ value, icon: Icon, label }) => (
                <TabsTrigger key={value} value={value}>
                  {(props) => (
                    <Button
                      {...props}
                      variant={props.tabIndex === 0 ? 'secondary' : 'ghost'}
                      className='w-full justify-start gap-2'
                    >
                      <Icon size={16} />
                      {label}
                    </Button>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className='flex-1 p-6'>
            <TabsContent value='profile'>
              <h3 className='mb-1 text-lg font-semibold'>Profile Settings</h3>
              <p className='text-muted-foreground mb-4 text-sm'>
                Manage your public profile information
              </p>
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <div className='bg-primary/10 flex size-16 items-center justify-center rounded-full'>
                    <IconUser size={32} className='text-primary' />
                  </div>
                  <Button variant='outline' size='sm'>Change Avatar</Button>
                </div>
                <div className='grid gap-2'>
                  <label className='text-sm font-medium'>Display Name</label>
                  <input className='border-input rounded-md border px-3 py-2' defaultValue='Muhammad Zeeshan' />
                </div>
              </div>
            </TabsContent>

            <TabsContent value='security'>
              <h3 className='mb-1 text-lg font-semibold'>Security</h3>
              <p className='text-muted-foreground mb-4 text-sm'>
                Protect your account with strong security measures
              </p>
              <div className='space-y-4'>
                <div className='flex items-center justify-between rounded-lg border p-4'>
                  <div className='flex items-center gap-3'>
                    <IconKey size={20} />
                    <div>
                      <p className='font-medium'>Two-Factor Authentication</p>
                      <p className='text-muted-foreground text-sm'>Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button variant='outline' size='sm'>Enable</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value='notifications'>
              <h3 className='mb-1 text-lg font-semibold'>Notifications</h3>
              <p className='text-muted-foreground mb-4 text-sm'>
                Choose what notifications you want to receive
              </p>
              <div className='space-y-3'>
                {['Email notifications', 'Push notifications', 'Weekly digest'].map((item) => (
                  <label key={item} className='flex items-center justify-between rounded-lg border p-3'>
                    <span>{item}</span>
                    <input type='checkbox' defaultChecked className='size-4' />
                  </label>
                ))}
              </div>
            </TabsContent>

            <TabsContent value='billing'>
              <h3 className='mb-1 text-lg font-semibold'>Billing</h3>
              <p className='text-muted-foreground mb-4 text-sm'>
                Manage your subscription and payment methods
              </p>
              <div className='bg-secondary/30 rounded-lg p-4'>
                <p className='font-medium'>Pro Plan</p>
                <p className='text-muted-foreground text-sm'>$29/month • Renews Jan 15, 2026</p>
              </div>
            </TabsContent>

            <TabsContent value='appearance'>
              <h3 className='mb-1 text-lg font-semibold'>Appearance</h3>
              <p className='text-muted-foreground mb-4 text-sm'>
                Customize how the app looks and feels
              </p>
              <div className='space-y-3'>
                {['Light', 'Dark', 'System'].map((theme) => (
                  <label key={theme} className='flex items-center gap-3 rounded-lg border p-3'>
                    <input type='radio' name='theme' defaultChecked={theme === 'System'} />
                    <span>{theme}</span>
                  </label>
                ))}
              </div>
            </TabsContent>
          </div>
        </TabsRoot>
      </div>
    </section>
  );
}

/* ———————————————————————————————————————————————————— */
/*  3. Product Details — E-commerce pattern              */
/* ———————————————————————————————————————————————————— */

function ProductDetailsTabs() {
  return (
    <section className='w-full max-w-2xl'>
      <div className='mb-4 text-center'>
        <Badge variant='secondary' className='mb-2'>
          Non-Looping • Automatic
        </Badge>
        <h2 className='text-xl font-bold'>Product Information</h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Stops at edges, common e-commerce pattern
        </p>
      </div>

      <div className='overflow-hidden rounded-xl border'>
        <TabsRoot defaultValue='description'>
          <div className='border-b'>
            <TabsList className='gap-0'>
              {[
                { value: 'description', label: 'Description' },
                { value: 'specifications', label: 'Specifications' },
                { value: 'reviews', label: 'Reviews (128)' },
                { value: 'shipping', label: 'Shipping' },
              ].map(({ value, label }) => (
                <TabsTrigger key={value} value={value}>
                  {(props) => (
                    <button
                      {...props}
                      className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                        props.tabIndex === 0
                          ? 'text-primary border-primary'
                          : 'text-muted-foreground hover:text-foreground border-transparent'
                      }`}
                    >
                      {label}
                    </button>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value='description'>
            <div className='p-6'>
              <h3 className='mb-3 font-semibold'>Premium Wireless Headphones</h3>
              <p className='text-muted-foreground leading-relaxed'>
                Experience crystal-clear audio with our flagship wireless headphones.
                Featuring advanced noise cancellation, 40-hour battery life, and
                premium comfort for all-day wear. Perfect for music lovers and
                professionals who demand the best sound quality.
              </p>
              <ul className='text-muted-foreground mt-4 space-y-2'>
                <li>• Active Noise Cancellation (ANC)</li>
                <li>• Bluetooth 5.2 with multipoint connection</li>
                <li>• Hi-Res Audio certified</li>
                <li>• Foldable design with carrying case</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value='specifications'>
            <div className='p-6'>
              <div className='space-y-3'>
                {[
                  { label: 'Driver Size', value: '40mm' },
                  { label: 'Frequency Response', value: '20Hz - 40kHz' },
                  { label: 'Battery Life', value: '40 hours (ANC off)' },
                  { label: 'Charging Time', value: '2 hours' },
                  { label: 'Weight', value: '250g' },
                  { label: 'Bluetooth Version', value: '5.2' },
                ].map(({ label, value }) => (
                  <div key={label} className='flex justify-between border-b pb-3 last:border-0'>
                    <span className='text-muted-foreground'>{label}</span>
                    <span className='font-medium'>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='reviews'>
            <div className='p-6'>
              <div className='mb-4 flex items-center gap-4'>
                <div className='text-4xl font-bold'>4.8</div>
                <div>
                  <div className='flex gap-1 text-amber-500'>
                    {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                  </div>
                  <p className='text-muted-foreground text-sm'>Based on 128 reviews</p>
                </div>
              </div>
              <div className='space-y-4'>
                {[
                  { name: 'Alex M.', rating: 5, comment: 'Best headphones I\'ve ever owned!' },
                  { name: 'Sarah K.', rating: 5, comment: 'Amazing sound quality and comfort.' },
                ].map(({ name, rating, comment }) => (
                  <div key={name} className='border-b pb-4'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>{name}</span>
                      <span className='text-amber-500'>{'★'.repeat(rating)}</span>
                    </div>
                    <p className='text-muted-foreground mt-1 text-sm'>{comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='shipping'>
            <div className='p-6'>
              <div className='space-y-4'>
                <div className='rounded-lg border p-4'>
                  <p className='font-medium'>Free Standard Shipping</p>
                  <p className='text-muted-foreground text-sm'>5-7 business days</p>
                </div>
                <div className='rounded-lg border p-4'>
                  <p className='font-medium'>Express Shipping — $9.99</p>
                  <p className='text-muted-foreground text-sm'>2-3 business days</p>
                </div>
                <div className='rounded-lg border p-4'>
                  <p className='font-medium'>Next Day Delivery — $19.99</p>
                  <p className='text-muted-foreground text-sm'>Order before 2PM</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </TabsRoot>
      </div>
    </section>
  );
}
