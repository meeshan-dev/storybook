import { useState } from 'react';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDots,
  IconPhoto,
  IconUser,
  IconMail,
  IconCalendar,
} from '@tabler/icons-react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import {
  PaginationControl,
  PaginationPages,
  PaginationRoot,
} from './pagination';

export function PaginationDemo() {
  return (
    <main className='flex grow flex-col gap-12 py-10'>
      {/* Data Table Pagination */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Data Table</h3>
          <p className='text-muted-foreground text-sm'>
            Full-featured pagination with page size selector and item count
          </p>
        </div>
        <DataTablePagination />
      </section>

      {/* Gallery Pagination */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Image Gallery</h3>
          <p className='text-muted-foreground text-sm'>
            Minimal pagination for browsing visual content
          </p>
        </div>
        <GalleryPagination />
      </section>

      {/* Compact Pagination */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Compact Style</h3>
          <p className='text-muted-foreground text-sm'>
            Space-efficient pagination for dense interfaces
          </p>
        </div>
        <CompactPagination />
      </section>

      {/* Simple Pagination */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Simple Navigation</h3>
          <p className='text-muted-foreground text-sm'>
            Previous/Next only for linear navigation
          </p>
        </div>
        <SimplePagination />
      </section>
    </main>
  );
}

/* ---------------------------------- */
/* 1. Data Table Pagination            */
/* ---------------------------------- */

const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', date: '2024-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', date: '2024-01-14' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', date: '2024-01-13' },
  { id: 4, name: 'David Brown', email: 'david@example.com', date: '2024-01-12' },
  { id: 5, name: 'Eva Martinez', email: 'eva@example.com', date: '2024-01-11' },
];

function DataTablePagination() {
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 156;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className='max-w-4xl rounded-xl border'>
      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead className='border-b bg-muted/30'>
            <tr>
              <th className='px-4 py-3 text-left font-medium'>
                <div className='flex items-center gap-2'>
                  <IconUser className='size-4' />
                  Name
                </div>
              </th>
              <th className='px-4 py-3 text-left font-medium'>
                <div className='flex items-center gap-2'>
                  <IconMail className='size-4' />
                  Email
                </div>
              </th>
              <th className='px-4 py-3 text-left font-medium'>
                <div className='flex items-center gap-2'>
                  <IconCalendar className='size-4' />
                  Date
                </div>
              </th>
            </tr>
          </thead>
          <tbody className='divide-y'>
            {mockUsers.map((user) => (
              <tr key={user.id} className='hover:bg-muted/30 transition-colors'>
                <td className='px-4 py-3 font-medium'>{user.name}</td>
                <td className='text-muted-foreground px-4 py-3'>{user.email}</td>
                <td className='text-muted-foreground px-4 py-3'>{user.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className='flex flex-col items-center justify-between gap-4 border-t px-4 py-3 sm:flex-row'>
        <div className='flex items-center gap-4'>
          <span className='text-muted-foreground text-sm'>
            Showing 1-5 of {totalItems} results
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className='rounded-lg border bg-background px-2 py-1 text-sm'
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>

        <PaginationRoot totalPages={totalPages} siblingCount={1}>
          <PaginationControl type='first'>
            {(props) => (
              <button
                {...props}
                className='flex size-8 items-center justify-center rounded-lg border transition-colors hover:bg-muted disabled:opacity-50 disabled:pointer-events-none'
              >
                <IconChevronsLeft className='size-4' />
              </button>
            )}
          </PaginationControl>

          <PaginationControl type='previous'>
            {(props) => (
              <button
                {...props}
                className='flex size-8 items-center justify-center rounded-lg border transition-colors hover:bg-muted disabled:opacity-50 disabled:pointer-events-none'
              >
                <IconChevronLeft className='size-4' />
              </button>
            )}
          </PaginationControl>

          <PaginationPages>
            {({ type, page, onClick, disabled, 'data-selected': selected }) => {
              if (type === 'ellipsis') {
                return (
                  <span className='text-muted-foreground flex size-8 items-center justify-center'>
                    <IconDots className='size-4' />
                  </span>
                );
              }
              return (
                <button
                  onClick={onClick}
                  disabled={disabled}
                  className={cn(
                    'flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-colors',
                    selected
                      ? 'bg-foreground text-background'
                      : 'border hover:bg-muted',
                  )}
                >
                  {page}
                </button>
              );
            }}
          </PaginationPages>

          <PaginationControl type='next'>
            {(props) => (
              <button
                {...props}
                className='flex size-8 items-center justify-center rounded-lg border transition-colors hover:bg-muted disabled:opacity-50 disabled:pointer-events-none'
              >
                <IconChevronRight className='size-4' />
              </button>
            )}
          </PaginationControl>

          <PaginationControl type='last'>
            {(props) => (
              <button
                {...props}
                className='flex size-8 items-center justify-center rounded-lg border transition-colors hover:bg-muted disabled:opacity-50 disabled:pointer-events-none'
              >
                <IconChevronsRight className='size-4' />
              </button>
            )}
          </PaginationControl>
        </PaginationRoot>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* 2. Gallery Pagination               */
/* ---------------------------------- */

const galleryImages = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Photo ${i + 1}`,
  color: ['bg-rose-100', 'bg-blue-100', 'bg-emerald-100', 'bg-amber-100', 'bg-violet-100', 'bg-cyan-100'][i],
}));

function GalleryPagination() {
  return (
    <div className='max-w-2xl space-y-6'>
      {/* Gallery Grid */}
      <div className='grid grid-cols-3 gap-4'>
        {galleryImages.map((img) => (
          <div
            key={img.id}
            className={cn(
              'flex aspect-square items-center justify-center rounded-xl',
              img.color,
            )}
          >
            <IconPhoto className='text-muted-foreground/50 size-8' />
          </div>
        ))}
      </div>

      {/* Centered Pagination */}
      <div className='flex justify-center'>
        <PaginationRoot totalPages={12} boundaryCount={1} siblingCount={2}>
          <PaginationControl type='previous'>
            {(props) => (
              <button
                {...props}
                className='mr-2 flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50 disabled:pointer-events-none'
              >
                <IconChevronLeft className='size-4' />
                Previous
              </button>
            )}
          </PaginationControl>

          <PaginationPages>
            {({ type, page, onClick, disabled, 'data-selected': selected }) => {
              if (type === 'ellipsis') {
                return (
                  <span className='text-muted-foreground px-2'>
                    <IconDots className='size-4' />
                  </span>
                );
              }
              return (
                <button
                  onClick={onClick}
                  disabled={disabled}
                  className={cn(
                    'flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors',
                    selected
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-muted',
                  )}
                >
                  {page}
                </button>
              );
            }}
          </PaginationPages>

          <PaginationControl type='next'>
            {(props) => (
              <button
                {...props}
                className='ml-2 flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50 disabled:pointer-events-none'
              >
                Next
                <IconChevronRight className='size-4' />
              </button>
            )}
          </PaginationControl>
        </PaginationRoot>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* 3. Compact Pagination               */
/* ---------------------------------- */

function CompactPagination() {
  return (
    <div className='inline-flex items-center rounded-lg border bg-card'>
      <PaginationRoot totalPages={50} siblingCount={0} boundaryCount={0}>
        <PaginationControl type='previous'>
          {(props) => (
            <button
              {...props}
              className='flex size-9 items-center justify-center border-r transition-colors hover:bg-muted disabled:opacity-50 disabled:pointer-events-none'
            >
              <IconChevronLeft className='size-4' />
            </button>
          )}
        </PaginationControl>

        <PaginationPages>
          {({ type, page, 'data-selected': selected }) => {
            if (type === 'ellipsis' || !selected) return null;
            return (
              <span className='flex min-w-[80px] items-center justify-center px-3 py-2 text-sm font-medium'>
                Page {page} of 50
              </span>
            );
          }}
        </PaginationPages>

        <PaginationControl type='next'>
          {(props) => (
            <button
              {...props}
              className='flex size-9 items-center justify-center border-l transition-colors hover:bg-muted disabled:opacity-50 disabled:pointer-events-none'
            >
              <IconChevronRight className='size-4' />
            </button>
          )}
        </PaginationControl>
      </PaginationRoot>
    </div>
  );
}

/* ---------------------------------- */
/* 4. Simple Pagination                */
/* ---------------------------------- */

function SimplePagination() {
  return (
    <div className='flex items-center gap-4'>
      <PaginationRoot totalPages={10}>
        <PaginationControl type='previous'>
          {(props) => (
            <Button {...props} variant='outline'>
              <IconChevronLeft className='mr-2 size-4' />
              Previous
            </Button>
          )}
        </PaginationControl>

        <PaginationPages>
          {({ 'data-selected': selected, page }) => {
            if (!selected) return null;
            return (
              <span className='text-muted-foreground text-sm'>
                Page {page} of 10
              </span>
            );
          }}
        </PaginationPages>

        <PaginationControl type='next'>
          {(props) => (
            <Button {...props} variant='outline'>
              Next
              <IconChevronRight className='ml-2 size-4' />
            </Button>
          )}
        </PaginationControl>
      </PaginationRoot>
    </div>
  );
}
