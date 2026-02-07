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
import { Button } from '~/components/ui/button';
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
    <ToggleButtonGroup
      exclusive
      defaultValue='grid'
      className='inline-flex rounded-lg border p-1'
    >
      {viewModes.map((mode) => (
        <ToggleButton key={mode.value} value={mode.value}>
          {(props, { isSelected }) => (
            <Button
              {...props}
              aria-label={mode.label}
              variant={isSelected ? 'default' : 'ghost'}
            >
              <mode.icon className='size-4' />
              <span className='hidden capitalize sm:inline'>{mode.value}</span>
            </Button>
          )}
        </ToggleButton>
      ))}
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
    <ToggleButtonGroup
      defaultValue={['bold']}
      className='inline-flex gap-1 rounded-lg border p-1'
    >
      {formatOptions.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {(props, { isSelected }) => (
            <Button
              {...props}
              variant={isSelected ? 'default' : 'ghost'}
              aria-label={option.label}
            >
              <option.icon className='size-4' />
            </Button>
          )}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
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
    <ToggleButtonGroup
      exclusive
      defaultValue='left'
      className='inline-flex rounded-lg border p-1'
    >
      {alignOptions.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {(props, { isSelected }) => (
            <Button
              {...props}
              variant={isSelected ? 'default' : 'ghost'}
              aria-label={option.label}
            >
              <option.icon className='size-4' />
            </Button>
          )}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

/* ---------------------------------- */
/* 4. Quick Actions                    */
/* ---------------------------------- */

function QuickActions() {
  return (
    <ToggleButtonGroup
      defaultValue={['favorite']}
      className='flex flex-wrap gap-2'
    >
      <ToggleButton value='favorite'>
        {(props, { isSelected }) => (
          <Button
            {...props}
            variant='ghost'
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
              isSelected
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                : 'bg-muted text-muted-foreground hover:text-foreground',
            )}
          >
            <IconStar className={cn('size-4', isSelected && 'fill-current')} />
            Favorite
          </Button>
        )}
      </ToggleButton>

      <ToggleButton value='like'>
        {(props, { isSelected }) => (
          <Button
            {...props}
            variant='ghost'
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
              isSelected
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                : 'bg-muted text-muted-foreground hover:text-foreground',
            )}
          >
            <IconHeart className={cn('size-4', isSelected && 'fill-current')} />
            Like
          </Button>
        )}
      </ToggleButton>

      <ToggleButton value='bookmark'>
        {(props, { isSelected }) => (
          <Button
            {...props}
            variant='ghost'
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
          </Button>
        )}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

/* ---------------------------------- */
/* 5. Sort Direction                   */
/* ---------------------------------- */

function SortDirection() {
  return (
    <ToggleButtonGroup
      exclusive
      defaultValue='asc'
      className='flex flex-wrap gap-2'
    >
      <div className='bg-card flex items-center gap-2 rounded-lg border px-3 py-2'>
        <IconFilter className='text-muted-foreground size-4' />
        <span className='text-sm font-medium'>Sort by: Date</span>
      </div>

      <ToggleButton value='asc'>
        {(props, { isSelected }) => (
          <Button
            {...props}
            variant={isSelected ? 'default' : 'ghost'}
            aria-label='Sort ascending'
          >
            <IconSortAscending className='size-4' />
            Ascending
          </Button>
        )}
      </ToggleButton>

      <ToggleButton value='desc'>
        {(props, { isSelected }) => (
          <Button
            {...props}
            variant={isSelected ? 'default' : 'ghost'}
            aria-label='Sort descending'
          >
            <IconSortDescending className='size-4' />
            Descending
          </Button>
        )}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
