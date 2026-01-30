import { useControlled } from '@base-ui/utils/useControlled';
import { useMemo } from 'react';
import { createContextScope } from '~/lib/context-scope';

export interface PaginationProps {
  totalPages?: number;
  boundaryCount?: number;
  siblingCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  defaultPage?: number;
  disabled?: boolean;
  children: React.ReactNode;
  listProps?: Omit<React.ComponentPropsWithRef<'ul'>, 'className'>;
  className?: string;
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const [PaginationProvider, usePaginationCtx] = createContextScope<{
  currentPage: number;
  totalPages: number;
  disabled?: boolean;
  handlePageChange: (page: number) => void;
  pages: Array<number | 'ellipsis'>;
}>();

export function PaginationRoot(props: PaginationProps) {
  const {
    currentPage: currentPageProp,
    onPageChange,
    defaultPage = 1,
    totalPages = 10,
    boundaryCount = 1,
    siblingCount = 1,
    disabled,
    children,
    listProps,
    className,
  } = props;

  const [currentPage, setCurrentPage] = useControlled({
    default: defaultPage,
    controlled: currentPageProp,
    name: 'Pagination',
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

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
        handlePageChange,
        pages,
      }}
    >
      <ul {...listProps} className={className}>
        {children}
      </ul>
    </PaginationProvider>
  );
}

export function PaginationPages(props: {
  children: (args: {
    type: 'page' | 'ellipsis';
    page?: number;
    onClick?: () => void;
    disabled?: boolean;
    'data-selected'?: boolean;
  }) => React.ReactNode;
}) {
  const { children } = props;

  const { currentPage, disabled, handlePageChange, pages } = usePaginationCtx();

  return (
    <>
      {pages.map((ele, i) => (
        // NOTE: Using index as key to make smooth page change in boundary otherwise page change will cause ui jump issues)
        // eslint-disable-next-line @eslint-react/no-array-index-key
        <li key={i}>
          {children({
            type: ele === 'ellipsis' ? 'ellipsis' : 'page',
            page: typeof ele === 'number' ? ele : undefined,
            disabled,
            'data-selected': currentPage === ele,
            onClick: () => {
              if (typeof ele === 'number') {
                handlePageChange(ele);
              }
            },
          })}
        </li>
      ))}
    </>
  );
}

export function PaginationControl({
  type,
  children,
}: {
  type: 'first' | 'last' | 'next' | 'previous';
  children: (props: React.ComponentProps<'button'>) => React.ReactNode;
}) {
  const { handlePageChange, disabled, currentPage, totalPages } =
    usePaginationCtx();

  if (type === 'first') {
    return (
      <li>
        {children?.({
          disabled: !!disabled || currentPage === 1,
          onClick: () => {
            handlePageChange(1);
          },
        })}
      </li>
    );
  }

  if (type === 'previous') {
    return (
      <li>
        {children?.({
          disabled: !!disabled || currentPage === 1,
          onClick: () => {
            const newValue = currentPage - 1;
            handlePageChange(newValue);
          },
        })}
      </li>
    );
  }

  if (type === 'next') {
    return (
      <li>
        {children?.({
          disabled: !!disabled || currentPage === totalPages,
          onClick: () => {
            const newValue = currentPage + 1;
            handlePageChange(newValue);
          },
        })}
      </li>
    );
  }

  if (type === 'last') {
    return (
      <li>
        {children?.({
          disabled: !!disabled || currentPage === totalPages,
          onClick: () => handlePageChange(totalPages),
        })}
      </li>
    );
  }

  return null;
}
