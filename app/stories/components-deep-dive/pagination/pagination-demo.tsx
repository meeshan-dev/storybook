import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconCircleArrowLeft,
  IconCircleArrowRight,
  IconDots,
} from '@tabler/icons-react';
import { Button } from '~/components/ui/button';
import {
  PaginationControl,
  PaginationPages,
  PaginationRoot,
} from './pagination';

export function PaginationDemo() {
  return (
    <div className='flex grow flex-col items-center justify-center gap-4'>
      <PaginationRoot totalPages={20}>
        <PaginationControl type='first'>
          {(props) => (
            <Button {...props} variant='secondary' size='icon'>
              <IconCircleArrowLeft />
            </Button>
          )}
        </PaginationControl>

        <PaginationControl type='previous'>
          {(props) => (
            <Button {...props} variant='secondary' size='icon'>
              <IconArrowNarrowLeft />
            </Button>
          )}
        </PaginationControl>

        <PaginationPages>
          {({ type, page, onClick, disabled, 'data-selected': selected }) => {
            if (type === 'ellipsis') {
              return <IconDots className='size-4' />;
            }

            return (
              <Button
                onClick={onClick}
                disabled={disabled}
                variant={selected ? 'default' : 'outline'}
                size='icon'
              >
                {page}
              </Button>
            );
          }}
        </PaginationPages>

        <PaginationControl type='next'>
          {(props) => (
            <Button {...props} variant='secondary' size='icon'>
              <IconArrowNarrowRight />
            </Button>
          )}
        </PaginationControl>

        <PaginationControl type='last'>
          {(props) => (
            <Button {...props} variant='secondary' size='icon'>
              <IconCircleArrowRight />
            </Button>
          )}
        </PaginationControl>
      </PaginationRoot>
    </div>
  );
}
