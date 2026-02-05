import {
  IconCode,
  IconHistory,
  IconLayoutDashboard,
} from '@tabler/icons-react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from './tabs';

export function TabsDemo() {
  return (
    <div className='flex grow flex-col items-center justify-center gap-12 py-10'>
      <DashboardTabs />
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

      <TabsRoot
        defaultValue='overview'
        loop
        className='overflow-hidden rounded-xl border'
      >
        <TabsList className='bg-secondary/50 border-b p-1'>
          {[
            {
              value: 'overview',
              icon: IconLayoutDashboard,
              label: 'Overview',
            },
            { value: 'analytics', icon: IconCode, label: 'Analytics' },
            { value: 'activity', icon: IconHistory, label: 'Activity' },
          ].map(({ value, icon: Icon, label }) => (
            <TabsTrigger key={value} value={value}>
              {(props) => (
                <Button
                  {...props}
                  variant={props.tabIndex === 0 ? 'default' : 'ghost'}
                  size='sm'
                  className='rounded-lg'
                >
                  <Icon />
                  <span className='hidden sm:inline'>{label}</span>
                </Button>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value='overview' className='p-6'>
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
        </TabsContent>

        <TabsContent value='analytics' className='p-6'>
          <h3 className='mb-4 text-lg font-semibold'>Analytics</h3>
          <div className='bg-secondary/30 flex h-48 items-center justify-center rounded-lg'>
            <p className='text-muted-foreground'>Chart visualization area</p>
          </div>
        </TabsContent>

        <TabsContent value='activity' className='p-6'>
          <h3 className='mb-4 text-lg font-semibold'>Recent Activity</h3>
          <div className='space-y-3'>
            {[
              { action: 'New user signup', time: '2 minutes ago' },
              { action: 'Payment received', time: '15 minutes ago' },
              { action: 'Project deployed', time: '1 hour ago' },
              { action: 'Settings updated', time: '3 hours ago' },
            ].map(({ action, time }) => (
              <div
                key={action}
                className='flex items-center justify-between border-b pb-3 last:border-0'
              >
                <span>{action}</span>
                <span className='text-muted-foreground text-end text-sm'>
                  {time}
                </span>
              </div>
            ))}
          </div>
        </TabsContent>
      </TabsRoot>
    </section>
  );
}
