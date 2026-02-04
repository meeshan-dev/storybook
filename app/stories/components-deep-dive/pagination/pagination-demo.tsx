import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDots,
  IconMail,
  IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';
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
    </main>
  );
}

/* ---------------------------------- */
/* 1. Data Table Pagination            */
/* ---------------------------------- */

const mockUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    date: '2024-01-15',
  },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', date: '2024-01-14' },
  {
    id: 3,
    name: 'Carol White',
    email: 'carol@example.com',
    date: '2024-01-13',
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@example.com',
    date: '2024-01-12',
  },
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
          <thead className='bg-muted/30 border-b'>
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
                <td className='text-muted-foreground px-4 py-3'>
                  {user.email}
                </td>
                <td className='text-muted-foreground px-4 py-3'>{user.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className='flex flex-col items-center justify-between gap-4 border-t px-4 py-3 sm:flex-row'>
        <div className='flex items-center gap-4'>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className='bg-background rounded-lg border px-2 py-1 text-sm'
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>

        <PaginationRoot
          totalPages={totalPages}
          siblingCount={1}
          boundaryCount={1}
        >
          <div className='order-1 basis-full sm:hidden' />

          <PaginationControl type='first' className='order-2 sm:order-0'>
            {(props) => (
              <Button {...props} variant='outline' size='icon-xs'>
                <IconChevronsLeft className='size-4' />
              </Button>
            )}
          </PaginationControl>

          <PaginationControl type='previous' className='order-3 sm:order-0'>
            {(props) => (
              <Button {...props} variant='outline' size='icon-xs'>
                <IconChevronLeft className='size-4' />
              </Button>
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
                <Button
                  onClick={onClick}
                  disabled={disabled}
                  variant={selected ? 'default' : 'outline'}
                  size='icon-xs'
                  className='w-auto min-w-6'
                >
                  {page}
                </Button>
              );
            }}
          </PaginationPages>

          <PaginationControl type='next' className='order-4 sm:order-0'>
            {(props) => (
              <Button {...props} variant='outline' size='icon-xs'>
                <IconChevronRight className='size-4' />
              </Button>
            )}
          </PaginationControl>

          <PaginationControl type='last' className='order-5 sm:order-0'>
            {(props) => (
              <Button {...props} variant='outline' size='icon-xs'>
                <IconChevronsRight className='size-4' />
              </Button>
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
    <PaginationRoot
      totalPages={50}
      siblingCount={0}
      boundaryCount={0}
      className='flex-nowrap justify-start gap-0'
    >
      <PaginationControl type='previous'>
        {(props) => (
          <Button
            {...props}
            variant='outline'
            size='icon'
            className='rounded-r-none'
          >
            <IconChevronLeft />
          </Button>
        )}
      </PaginationControl>

      <PaginationPages className='w-37.5 content-center self-stretch border-y px-3 data-[selected=false]:hidden'>
        {({ type, page, 'data-selected': selected }) => {
          if (type === 'ellipsis' || !selected) return null;

          return (
            <p className='w-full text-center text-sm font-medium'>
              Page {page} of 50
            </p>
          );
        }}
      </PaginationPages>

      <PaginationControl type='next'>
        {(props) => (
          <Button
            {...props}
            variant='outline'
            size='icon'
            className='rounded-l-none'
          >
            <IconChevronRight />
          </Button>
        )}
      </PaginationControl>
    </PaginationRoot>
  );
}
