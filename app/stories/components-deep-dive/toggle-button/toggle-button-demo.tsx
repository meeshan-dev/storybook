import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconBookmark,
  IconFilter,
  IconHeart,
  IconItalic,
  IconLayoutColumns,
  IconLayoutGrid,
  IconLayoutList,
  IconSortAscending,
  IconSortDescending,
  IconStar,
  IconStrikethrough,
  IconUnderline,
} from '@tabler/icons-react';
import { cn } from '~/lib/utils';
import { ToggleButton, ToggleButtonGroup } from './toggle-button';

export function ToggleButtonDemo() {
  return (
    <main className='flex grow flex-col gap-12 py-10'>
      {/* View Switcher */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>View Switcher</h3>
          <p className='text-muted-foreground text-sm'>
            Exclusive selection for switching between layout modes
          </p>
        </div>
        <ViewSwitcher />
      </section>

      {/* Text Formatting */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Text Formatting</h3>
          <p className='text-muted-foreground text-sm'>
            Multiple selection for combining text styles
          </p>
        </div>
        <TextFormatting />
      </section>

      {/* Text Alignment */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Text Alignment</h3>
          <p className='text-muted-foreground text-sm'>
            Exclusive selection for paragraph alignment
          </p>
        </div>
        <TextAlignment />
      </section>

      {/* Quick Actions */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Quick Actions</h3>
          <p className='text-muted-foreground text-sm'>
            Multiple toggles for favoriting, liking, and bookmarking
          </p>
        </div>
        <QuickActions />
      </section>

      {/* Filter & Sort */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Sort Direction</h3>
          <p className='text-muted-foreground text-sm'>
            Exclusive toggle for sorting order
          </p>
        </div>
        <SortDirection />
      </section>
    </main>
  );
}

/* ---------------------------------- */
/* 1. View Switcher                    */
/* ---------------------------------- */

const viewModes = [
  { value: 'grid', icon: IconLayoutGrid, label: 'Grid view' },
  { value: 'list', icon: IconLayoutList, label: 'List view' },
  { value: 'columns', icon: IconLayoutColumns, label: 'Column view' },
];

function ViewSwitcher() {
  return (
    <ToggleButtonGroup exclusive defaultValue='grid'>
      <div className='bg-card inline-flex rounded-lg border p-1'>
        {viewModes.map((mode) => (
          <ToggleButton key={mode.value} value={mode.value}>
            {(props, { isSelected }) => (
              <button
                {...props}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isSelected
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                )}
                aria-label={mode.label}
              >
                <mode.icon className='size-4' />
                <span className='hidden capitalize sm:inline'>
                  {mode.value}
                </span>
              </button>
            )}
          </ToggleButton>
        ))}
      </div>
    </ToggleButtonGroup>
  );
}

/* ---------------------------------- */
/* 2. Text Formatting                  */
/* ---------------------------------- */

const formatOptions = [
  { value: 'bold', icon: IconBold, label: 'Bold' },
  { value: 'italic', icon: IconItalic, label: 'Italic' },
  { value: 'underline', icon: IconUnderline, label: 'Underline' },
  { value: 'strikethrough', icon: IconStrikethrough, label: 'Strikethrough' },
];

function TextFormatting() {
  return (
    <div className='space-y-4'>
      <ToggleButtonGroup defaultValue={['bold']}>
        <div className='inline-flex rounded-lg border'>
          {formatOptions.map((option, index) => (
            <ToggleButton key={option.value} value={option.value}>
              {(props, { isSelected }) => (
                <button
                  {...props}
                  className={cn(
                    'flex size-10 items-center justify-center transition-colors',
                    'border-r last:border-r-0',
                    index === 0 && 'rounded-l-lg',
                    index === formatOptions.length - 1 && 'rounded-r-lg',
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted',
                  )}
                  aria-label={option.label}
                >
                  <option.icon className='size-4' />
                </button>
              )}
            </ToggleButton>
          ))}
        </div>
      </ToggleButtonGroup>

      {/* Preview */}
      <div className='bg-card max-w-md rounded-lg border p-4'>
        <p className='text-sm'>
          <span className='font-bold'>This is bold text. </span>
          Select formatting options above to see how multiple styles can be
          combined together.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* 3. Text Alignment                   */
/* ---------------------------------- */

const alignOptions = [
  { value: 'left', icon: IconAlignLeft, label: 'Align left' },
  { value: 'center', icon: IconAlignCenter, label: 'Align center' },
  { value: 'right', icon: IconAlignRight, label: 'Align right' },
  { value: 'justify', icon: IconAlignJustified, label: 'Justify' },
];

function TextAlignment() {
  return (
    <ToggleButtonGroup exclusive defaultValue='left'>
      <div className='bg-muted inline-flex gap-1 rounded-lg p-1'>
        {alignOptions.map((option) => (
          <ToggleButton key={option.value} value={option.value}>
            {(props, { isSelected }) => (
              <button
                {...props}
                className={cn(
                  'flex size-9 items-center justify-center rounded-md transition-colors',
                  isSelected
                    ? 'bg-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                aria-label={option.label}
              >
                <option.icon className='size-4' />
              </button>
            )}
          </ToggleButton>
        ))}
      </div>
    </ToggleButtonGroup>
  );
}

/* ---------------------------------- */
/* 4. Quick Actions                    */
/* ---------------------------------- */

function QuickActions() {
  return (
    <ToggleButtonGroup defaultValue={['favorite']}>
      <div className='flex gap-2'>
        <ToggleButton value='favorite'>
          {(props, { isSelected }) => (
            <button
              {...props}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                isSelected
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  : 'bg-muted text-muted-foreground hover:text-foreground',
              )}
            >
              <IconStar
                className={cn('size-4', isSelected && 'fill-current')}
              />
              Favorite
            </button>
          )}
        </ToggleButton>

        <ToggleButton value='like'>
          {(props, { isSelected }) => (
            <button
              {...props}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                isSelected
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                  : 'bg-muted text-muted-foreground hover:text-foreground',
              )}
            >
              <IconHeart
                className={cn('size-4', isSelected && 'fill-current')}
              />
              Like
            </button>
          )}
        </ToggleButton>

        <ToggleButton value='bookmark'>
          {(props, { isSelected }) => (
            <button
              {...props}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                isSelected
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'bg-muted text-muted-foreground hover:text-foreground',
              )}
            >
              <IconBookmark
                className={cn('size-4', isSelected && 'fill-current')}
              />
              Save
            </button>
          )}
        </ToggleButton>
      </div>
    </ToggleButtonGroup>
  );
}

/* ---------------------------------- */
/* 5. Sort Direction                   */
/* ---------------------------------- */

function SortDirection() {
  return (
    <div className='flex items-center gap-4'>
      <div className='bg-card flex items-center gap-2 rounded-lg border px-3 py-2'>
        <IconFilter className='text-muted-foreground size-4' />
        <span className='text-sm font-medium'>Sort by: Date</span>
      </div>

      <ToggleButtonGroup exclusive defaultValue='asc'>
        <div className='inline-flex overflow-hidden rounded-lg border'>
          <ToggleButton value='asc'>
            {(props, { isSelected }) => (
              <button
                {...props}
                className={cn(
                  'flex items-center gap-2 border-r px-3 py-2 text-sm font-medium transition-colors',
                  isSelected
                    ? 'bg-emerald-600 text-white'
                    : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted',
                )}
                aria-label='Sort ascending'
              >
                <IconSortAscending className='size-4' />
                Ascending
              </button>
            )}
          </ToggleButton>

          <ToggleButton value='desc'>
            {(props, { isSelected }) => (
              <button
                {...props}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors',
                  isSelected
                    ? 'bg-emerald-600 text-white'
                    : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted',
                )}
                aria-label='Sort descending'
              >
                <IconSortDescending className='size-4' />
                Descending
              </button>
            )}
          </ToggleButton>
        </div>
      </ToggleButtonGroup>
    </div>
  );
}
