import React, { useMemo } from 'react';
import { createContextScope } from '~/lib/context-scope';
import { cn } from '~/lib/utils';
import { useControlled } from '~/stories/hooks/use-controlled/use-controlled';

/* ———————————————————— Root ———————————————————— */

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const [PaginationProvider, usePaginationCtx] = createContextScope<{
  currentPage: number;
  totalPages: number;
  disabled?: boolean;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  pages: Array<number | 'ellipsis'>;
}>();

export function PaginationRoot({
  page: pageProp,
  defaultPage = 1,
  totalPages = 10,
  boundaryCount = 1,
  siblingCount = 1,
  disabled,
  onPageChange,
  children,
  className,
}: {
  children?: React.ReactNode;
  totalPages?: number;
  boundaryCount?: number;
  siblingCount?: number;
  page?: number;
  defaultPage?: number;
  disabled?: boolean;
  onPageChange?: (page: number) => void;
  className?: string;
}) {
  const [currentPage, setCurrentPage] = useControlled({
    controlled: pageProp,
    defaultValue: defaultPage,
    onChange: onPageChange,
  });

  const pages = useMemo(() => {
    // if boundaryCount is greater than count then render all pages from 1 to count
    const startPages = range(1, Math.min(boundaryCount, totalPages));

    // if boundaryCount is greater than count then dont render any page because all pages have shown above by startPages
    const endPages =
      boundaryCount > totalPages
        ? []
        : range(
            Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
            totalPages,
          );

    const siblingsStart = Math.max(
      Math.min(
        currentPage - siblingCount,
        totalPages - (siblingCount * 2 + 1 + boundaryCount),
      ),
      boundaryCount + 2,
    );

    const siblingsEnd = Math.min(
      Math.max(
        currentPage + siblingCount,
        boundaryCount + 2 + siblingCount * 2,
      ),
      endPages.length > 0 ? endPages[0]! - 2 : totalPages - 1,
    );

    return [
      ...startPages,

      ...(siblingsStart > boundaryCount + 2
        ? ['ellipsis']
        : boundaryCount + 1 < totalPages - boundaryCount
          ? [boundaryCount + 1]
          : []),

      ...range(siblingsStart, siblingsEnd),

      ...(siblingsEnd < totalPages - boundaryCount - 1
        ? ['ellipsis']
        : totalPages - boundaryCount > boundaryCount
          ? [totalPages - boundaryCount]
          : []),

      ...endPages,
    ] as (number | 'ellipsis')[];
  }, [boundaryCount, totalPages, currentPage, siblingCount]);

  return (
    <PaginationProvider
      value={{
        currentPage,
        totalPages,
        disabled,
        setCurrentPage,
        pages,
      }}
    >
      <ul
        className={cn(
          'flex flex-wrap items-center justify-center gap-2',
          className,
        )}
      >
        {children}
      </ul>
    </PaginationProvider>
  );
}

/* ———————————————————— Pages ———————————————————— */

export function PaginationPages(props: {
  className?: string;
  children: (args: {
    type: 'page' | 'ellipsis';
    page?: number;
    onClick?: () => void;
    disabled?: boolean;
    'data-selected'?: boolean;
    'aria-current'?: 'page';
  }) => React.ReactNode;
}) {
  const { children, className } = props;

  const { currentPage, disabled, setCurrentPage, pages } = usePaginationCtx();

  return (
    <>
      {pages.map((ele, i) => (
        // NOTE: Using index as key to make smooth page change in boundary otherwise page change will cause ui jump issues)
        // eslint-disable-next-line @eslint-react/no-array-index-key
        <li key={i} className={className} data-selected={currentPage === ele}>
          {children({
            type: ele === 'ellipsis' ? 'ellipsis' : 'page',
            page: typeof ele === 'number' ? ele : undefined,
            disabled,
            'data-selected': currentPage === ele,
            'aria-current': currentPage === ele ? 'page' : undefined,
            onClick: () => {
              if (typeof ele === 'number') {
                setCurrentPage(ele);
              }
            },
          })}
        </li>
      ))}
    </>
  );
}

/* ———————————————————— Control ———————————————————— */

export function PaginationControl({
  type,
  children,
  className,
}: {
  type: 'first' | 'last' | 'next' | 'previous';
  children: (props: React.ComponentProps<'button'>) => React.ReactNode;
  className?: string;
}) {
  const { setCurrentPage, disabled, currentPage, totalPages } =
    usePaginationCtx();

  if (type === 'first') {
    return (
      <li className={cn('flex items-center', className)}>
        {children?.({
          disabled: !!disabled || currentPage === 1,
          onClick: () => {
            setCurrentPage(1);
          },
        })}
      </li>
    );
  }

  if (type === 'previous') {
    return (
      <li className={cn('flex items-center', className)}>
        {children?.({
          disabled: !!disabled || currentPage === 1,
          onClick: () => {
            setCurrentPage((prev) => prev - 1);
          },
        })}
      </li>
    );
  }

  if (type === 'next') {
    return (
      <li className={cn('flex items-center', className)}>
        {children?.({
          disabled: !!disabled || currentPage === totalPages,
          onClick: () => {
            setCurrentPage((prev) => prev + 1);
          },
        })}
      </li>
    );
  }

  if (type === 'last') {
    return (
      <li className={cn('flex items-center', className)}>
        {children?.({
          disabled: !!disabled || currentPage === totalPages,
          onClick: () => setCurrentPage(totalPages),
        })}
      </li>
    );
  }

  return null;
}
