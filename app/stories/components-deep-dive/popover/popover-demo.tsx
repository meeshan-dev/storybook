import {
  IconBell,
  IconBrandGithub,
  IconBrandTwitter,
  IconCalendar,
  IconFilter,
  IconMail,
  IconMapPin,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { SwitchRoot, Thumb } from '../switch/switch';
import {
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPortal,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from './popover';

export function PopoverDemo() {
  return (
    <main className='flex grow flex-col gap-12 py-10'>
      {/* User Profile Card */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>User Profile Card</h3>
          <p className='text-muted-foreground text-sm'>
            Rich profile preview with actions and social links
          </p>
        </div>
        <UserProfilePopover />
      </section>

      {/* Notification Settings */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Quick Settings</h3>
          <p className='text-muted-foreground text-sm'>
            Popover for quick preference adjustments
          </p>
        </div>
        <NotificationSettingsPopover />
      </section>

      {/* Filter Dropdown */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Filter Options</h3>
          <p className='text-muted-foreground text-sm'>
            Multi-select filter with apply/clear actions
          </p>
        </div>
        <FilterPopover />
      </section>

      {/* Date Picker Preview */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Date Selection</h3>
          <p className='text-muted-foreground text-sm'>
            Date picker popover with preset options
          </p>
        </div>
        <DatePickerPopover />
      </section>
    </main>
  );
}

/* ---------------------------------- */
/* 1. User Profile Card                */
/* ---------------------------------- */

function UserProfilePopover() {
  return (
    <PopoverRoot>
      <PopoverTrigger>
        {(props) => (
          <button
            {...props}
            className='bg-card hover:bg-muted flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors'
          >
            <div className='flex size-7 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-purple-600 text-xs font-semibold text-white'>
              SK
            </div>
            <span className='font-medium'>Sarah Kim</span>
          </button>
        )}
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent className='gap-0 p-0' outerWrapperClassName='max-w-xs'>
          <div className='h-10 bg-linear-to-r from-violet-500 to-purple-600' />

          {/* Avatar & Info */}
          <div className='relative px-4 pb-4'>
            <div className='-mt-8 flex items-center justify-between'>
              <div className='border-card flex size-16 items-center justify-center rounded-full border-4 bg-linear-to-br from-violet-500 to-purple-600 text-xl font-bold text-white'>
                SK
              </div>

              <Button size='sm'>Follow</Button>
            </div>

            <div className='mt-2 space-y-1'>
              <PopoverTitle className='text-lg font-semibold'>
                Sarah Kim
              </PopoverTitle>

              <p className='text-muted-foreground text-sm'>@sarahkim</p>
            </div>

            <PopoverDescription className='mt-3'>
              Building accessible components with React and TypeScript.
            </PopoverDescription>

            <div className='mt-4 flex flex-wrap gap-4 text-sm'>
              <div className='text-muted-foreground flex items-center gap-1.5'>
                <IconMapPin className='size-4' />
                San Francisco, CA
              </div>
              <div className='text-muted-foreground flex items-center gap-1.5'>
                <IconCalendar className='size-4' />
                Joined Mar 2021
              </div>
            </div>

            <div className='mt-4 flex gap-2'>
              <a
                href='#'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <IconBrandGithub className='size-5' />
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <IconBrandTwitter className='size-5' />
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <IconMail className='size-5' />
              </a>
            </div>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  );
}

/* ---------------------------------- */
/* 2. Notification Settings            */
/* ---------------------------------- */

function NotificationSettingsPopover() {
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    marketing: false,
  });

  return (
    <PopoverRoot>
      <PopoverTrigger>
        {(props) => (
          <Button {...props} variant='outline'>
            <IconBell />
            Notifications
          </Button>
        )}
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent outerWrapperClassName='max-w-xs'>
          <PopoverHeader>
            <PopoverTitle>Notification Settings</PopoverTitle>

            <PopoverDescription className='sr-only'>
              Configure your notification preferences
            </PopoverDescription>
          </PopoverHeader>

          <div className='space-y-3'>
            <NotificationToggle
              label='Email notifications'
              description='Get notified via email'
              checked={settings.email}
              onChange={() => setSettings((s) => ({ ...s, email: !s.email }))}
            />
            <NotificationToggle
              label='Push notifications'
              description='Browser push alerts'
              checked={settings.push}
              onChange={() => setSettings((s) => ({ ...s, push: !s.push }))}
            />
            <NotificationToggle
              label='Marketing emails'
              description='Product updates and tips'
              checked={settings.marketing}
              onChange={() =>
                setSettings((s) => ({ ...s, marketing: !s.marketing }))
              }
            />
          </div>

          <PopoverFooter>
            <PopoverClose>
              {(props) => (
                <Button {...props} size='sm' variant='ghost'>
                  Cancel
                </Button>
              )}
            </PopoverClose>

            <PopoverClose>
              {(props) => (
                <Button {...props} size='sm' variant='secondary'>
                  Save preferences
                </Button>
              )}
            </PopoverClose>
          </PopoverFooter>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  );
}

function NotificationToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className='flex cursor-pointer items-center justify-between'>
      <div>
        <p className='font-medium'>{label}</p>
        <p className='text-muted-foreground text-xs'>{description}</p>
      </div>

      <SwitchRoot checked={checked} onCheckedChange={onChange}>
        <Thumb />
      </SwitchRoot>
    </label>
  );
}

/* ---------------------------------- */
/* 3. Filter Options                   */
/* ---------------------------------- */

const filterCategories = [
  'Design',
  'Development',
  'Marketing',
  'Sales',
  'Support',
];
const filterStatuses = ['Active', 'Pending', 'Completed', 'Archived'];

function FilterPopover() {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    () => new Set(['Design']),
  );

  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(
    () => new Set(['Active']),
  );

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  const clearAll = () => {
    setSelectedCategories(new Set());
    setSelectedStatuses(new Set());
  };

  const activeCount = selectedCategories.size + selectedStatuses.size;

  return (
    <PopoverRoot>
      <PopoverTrigger>
        {(props) => (
          <Button {...props} variant='outline'>
            <IconFilter />
            Filters
            {activeCount > 0 && (
              <span className='ml-2 flex size-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white'>
                {activeCount}
              </span>
            )}
          </Button>
        )}
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent outerWrapperClassName='max-w-sm'>
          <PopoverHeader>
            <PopoverTitle>Filter Results</PopoverTitle>

            <PopoverDescription className='sr-only'>
              Select categories and statuses to filter
            </PopoverDescription>
          </PopoverHeader>

          <div className='space-y-4'>
            <div>
              <p className='text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase'>
                Category
              </p>
              <div className='flex flex-wrap gap-2'>
                {filterCategories.map((cat) => (
                  <Badge
                    key={cat}
                    variant={
                      selectedCategories.has(cat) ? 'default' : 'secondary'
                    }
                    onClick={() => toggleCategory(cat)}
                    render={<button className='outline-none'>{cat}</button>}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className='text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase'>
                Status
              </p>
              <div className='flex flex-wrap gap-2'>
                {filterStatuses.map((status) => (
                  <Badge
                    key={status}
                    variant={
                      selectedStatuses.has(status) ? 'default' : 'secondary'
                    }
                    onClick={() => toggleStatus(status)}
                    render={<button className='outline-none'>{status}</button>}
                  />
                ))}
              </div>
            </div>
          </div>

          <hr />

          <PopoverFooter>
            <Button onClick={clearAll} variant='ghost'>
              Clear all
            </Button>

            <PopoverClose>
              {(props) => (
                <Button {...props} size='sm'>
                  Apply filters
                </Button>
              )}
            </PopoverClose>
          </PopoverFooter>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  );
}

/* ---------------------------------- */
/* 4. Date Picker Preview              */
/* ---------------------------------- */

const presetDates = [
  { label: 'Today', days: 0 },
  { label: 'Tomorrow', days: 1 },
  { label: 'In 3 days', days: 3 },
  { label: 'In a week', days: 7 },
  { label: 'In 2 weeks', days: 14 },
  { label: 'In a month', days: 30 },
];

function DatePickerPopover() {
  const [selected, setSelected] = useState<number | null>(null);

  const getFormattedDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <PopoverRoot>
      <PopoverTrigger>
        {(props) => (
          <Button {...props} variant='outline'>
            <IconCalendar className='mr-2 size-4' />
            {selected !== null ? getFormattedDate(selected) : 'Select date'}
          </Button>
        )}
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent outerWrapperClassName='max-w-xs'>
          <PopoverHeader>
            <PopoverTitle>Quick Select</PopoverTitle>
            <PopoverDescription className='sr-only'>
              Choose a preset date or select custom
            </PopoverDescription>
          </PopoverHeader>

          <div className='space-y-1'>
            {presetDates.map((preset) => (
              <PopoverClose key={preset.label}>
                {(closeProps) => (
                  <Button
                    {...closeProps}
                    onClick={() => {
                      setSelected(preset.days);
                      closeProps.onClick?.(
                        {} as React.MouseEvent<HTMLButtonElement>,
                      );
                    }}
                    variant={selected === preset.days ? 'secondary' : 'ghost'}
                    className='hover:dark:bg-foreground/5 w-full cursor-pointer justify-between'
                  >
                    <span>{preset.label}</span>
                    <span className='text-muted-foreground text-xs'>
                      {getFormattedDate(preset.days)}
                    </span>
                  </Button>
                )}
              </PopoverClose>
            ))}
          </div>

          <Button variant='secondary' className='w-full'>
            <IconCalendar />
            Custom date...
          </Button>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  );
}
