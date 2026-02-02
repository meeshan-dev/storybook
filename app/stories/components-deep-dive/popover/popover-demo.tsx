import { useState } from 'react';
import { FloatingArrow } from '@floating-ui/react';
import {
  IconUser,
  IconSettings,
  IconBell,
  IconFilter,
  IconCheck,
  IconMail,
  IconBrandGithub,
  IconBrandTwitter,
  IconCalendar,
  IconMapPin,
  IconX,
} from '@tabler/icons-react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import {
  PopoverClose,
  PopoverContent,
  PopoverDescription,
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
            className='flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm transition-colors hover:bg-muted'
          >
            <div className='flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-xs font-semibold text-white'>
              SK
            </div>
            <span className='font-medium'>Sarah Kim</span>
          </button>
        )}
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent>
          {({ props, arrowProps }) => (
            <div
              {...props}
              className='bg-card ring-foreground/10 z-50 w-80 rounded-xl p-0 text-sm ring-1 shadow-lg outline-none data-[hide=true]:hidden'
            >
              <FloatingArrow {...arrowProps} className='fill-card' />

              {/* Cover */}
              <div className='h-20 rounded-t-xl bg-gradient-to-r from-violet-500 to-purple-600' />

              {/* Avatar & Info */}
              <div className='relative px-4 pb-4'>
                <div className='-mt-10 mb-3 flex items-end justify-between'>
                  <div className='flex size-16 items-center justify-center rounded-full border-4 border-card bg-gradient-to-br from-violet-500 to-purple-600 text-xl font-bold text-white'>
                    SK
                  </div>
                  <Button size='sm'>Follow</Button>
                </div>

                <div className='space-y-1'>
                  <PopoverTitle className='text-lg font-semibold'>Sarah Kim</PopoverTitle>
                  <p className='text-muted-foreground text-sm'>@sarahkim</p>
                </div>

                <PopoverDescription className='mt-3'>
                  Senior Frontend Engineer at Acme Inc. Building accessible
                  components with React and TypeScript.
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
            </div>
          )}
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
            <IconBell className='mr-2 size-4' />
            Notifications
          </Button>
        )}
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent>
          {({ props, arrowProps }) => (
            <div
              {...props}
              className='bg-card ring-foreground/10 z-50 w-72 rounded-xl p-4 text-sm ring-1 shadow-lg outline-none data-[hide=true]:hidden'
            >
              <FloatingArrow {...arrowProps} className='fill-card' />

              <div className='mb-4 flex items-center justify-between'>
                <PopoverTitle className='font-semibold'>
                  Notification Settings
                </PopoverTitle>
                <PopoverClose>
                  {(props) => (
                    <button
                      {...props}
                      className='text-muted-foreground hover:text-foreground rounded p-1 transition-colors'
                    >
                      <IconX className='size-4' />
                    </button>
                  )}
                </PopoverClose>
              </div>

              <PopoverDescription className='sr-only'>
                Configure your notification preferences
              </PopoverDescription>

              <div className='space-y-3'>
                <NotificationToggle
                  label='Email notifications'
                  description='Get notified via email'
                  checked={settings.email}
                  onChange={() =>
                    setSettings((s) => ({ ...s, email: !s.email }))
                  }
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

              <div className='mt-4 flex justify-end'>
                <PopoverClose>
                  {(props) => (
                    <Button {...props} size='sm'>
                      Save preferences
                    </Button>
                  )}
                </PopoverClose>
              </div>
            </div>
          )}
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
      <button
        type='button'
        role='switch'
        aria-checked={checked}
        onClick={onChange}
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors',
          checked ? 'bg-emerald-600' : 'bg-muted',
        )}
      >
        <span
          className={cn(
            'absolute top-1 left-1 size-4 rounded-full bg-white transition-transform',
            checked && 'translate-x-5',
          )}
        />
      </button>
    </label>
  );
}

/* ---------------------------------- */
/* 3. Filter Options                   */
/* ---------------------------------- */

const filterCategories = ['Design', 'Development', 'Marketing', 'Sales', 'Support'];
const filterStatuses = ['Active', 'Pending', 'Completed', 'Archived'];

function FilterPopover() {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(['Design']));
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set(['Active']));

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
            <IconFilter className='mr-2 size-4' />
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
        <PopoverContent>
          {({ props, arrowProps }) => (
            <div
              {...props}
              className='bg-card ring-foreground/10 z-50 w-64 rounded-xl p-4 text-sm ring-1 shadow-lg outline-none data-[hide=true]:hidden'
            >
              <FloatingArrow {...arrowProps} className='fill-card' />

              <PopoverTitle className='mb-3 font-semibold'>
                Filter Results
              </PopoverTitle>
              <PopoverDescription className='sr-only'>
                Select categories and statuses to filter
              </PopoverDescription>

              <div className='space-y-4'>
                <div>
                  <p className='text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wider'>
                    Category
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {filterCategories.map((cat) => (
                      <FilterChip
                        key={cat}
                        label={cat}
                        selected={selectedCategories.has(cat)}
                        onClick={() => toggleCategory(cat)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className='text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wider'>
                    Status
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {filterStatuses.map((status) => (
                      <FilterChip
                        key={status}
                        label={status}
                        selected={selectedStatuses.has(status)}
                        onClick={() => toggleStatus(status)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className='mt-4 flex justify-between border-t pt-4'>
                <button
                  onClick={clearAll}
                  className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                >
                  Clear all
                </button>
                <PopoverClose>
                  {(props) => (
                    <Button {...props} size='sm'>
                      Apply filters
                    </Button>
                  )}
                </PopoverClose>
              </div>
            </div>
          )}
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  );
}

function FilterChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors',
        selected
          ? 'bg-blue-600 text-white'
          : 'bg-muted hover:bg-muted/80 text-foreground',
      )}
    >
      {selected && <IconCheck className='size-3' />}
      {label}
    </button>
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
        <PopoverContent>
          {({ props, arrowProps }) => (
            <div
              {...props}
              className='bg-card ring-foreground/10 z-50 w-56 rounded-xl p-3 text-sm ring-1 shadow-lg outline-none data-[hide=true]:hidden'
            >
              <FloatingArrow {...arrowProps} className='fill-card' />

              <PopoverTitle className='mb-2 px-1 font-semibold'>
                Quick Select
              </PopoverTitle>
              <PopoverDescription className='sr-only'>
                Choose a preset date or select custom
              </PopoverDescription>

              <div className='space-y-1'>
                {presetDates.map((preset) => (
                  <PopoverClose key={preset.label}>
                    {(closeProps) => (
                      <button
                        {...closeProps}
                        onClick={() => {
                          setSelected(preset.days);
                          closeProps.onClick?.({} as React.MouseEvent<HTMLButtonElement>);
                        }}
                        className={cn(
                          'flex w-full items-center justify-between rounded-lg px-3 py-2 transition-colors',
                          selected === preset.days
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-muted',
                        )}
                      >
                        <span>{preset.label}</span>
                        <span className='text-xs opacity-70'>
                          {getFormattedDate(preset.days)}
                        </span>
                      </button>
                    )}
                  </PopoverClose>
                ))}
              </div>

              <div className='mt-2 border-t pt-2'>
                <button className='text-muted-foreground hover:text-foreground flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-muted'>
                  <IconCalendar className='size-4' />
                  Custom date...
                </button>
              </div>
            </div>
          )}
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  );
}
