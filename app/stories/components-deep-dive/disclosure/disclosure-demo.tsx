import { IconChevronDown } from '@tabler/icons-react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  DisclosureContent,
  DisclosureItem,
  DisclosureRoot,
  DisclosureTrigger,
} from './disclosure';

function DisclosureExample({
  type,
  isSingleCollapsible,
}: {
  type: 'multiple' | 'single';
  isSingleCollapsible?: boolean;
}) {
  return (
    <div className='bg-secondary w-full max-w-xl rounded-lg p-3'>
      <Badge className='mb-3'>
        {(() => {
          if (type === 'multiple') {
            return 'Multiple item expansion';
          }

          if (type === 'single' && isSingleCollapsible === true) {
            return 'Single item expansion (collapsible)';
          }

          if (type === 'single' && isSingleCollapsible === false) {
            return 'Single item expansion (non-collapsible)';
          }

          return '';
        })()}
      </Badge>

      <DisclosureRoot
        {...({
          defaultValue: type === 'multiple' ? ['1'] : '1',
          isSingleCollapsible: isSingleCollapsible,
          type: type === 'multiple' ? 'multiple' : 'single',
        } as object)}
      >
        {[
          {
            id: 1,
            title: 'Disclosure no. 1 with dummy content',
          },
          {
            id: 2,
            title: 'Disclosure no. 2 with dummy content',
          },
          {
            id: 3,
            title: 'Disclosure no. 3 with dummy content',
            disabled: true,
          },
          {
            id: 4,
            title: 'Disclosure no. 4 with dummy content',
          },
        ].map(({ id, title, disabled }) => (
          <DisclosureItem key={id} value={`${id}`} disabled={disabled}>
            <DisclosureTrigger>
              {(props) => (
                <Button {...props} variant='ghost' className='group w-full'>
                  {title}

                  <IconChevronDown
                    size={20}
                    className='ml-auto rotate-0 transition-transform group-data-[expanded=true]:-rotate-180'
                  />
                </Button>
              )}
            </DisclosureTrigger>

            <DisclosureContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              pariatur vitae consectetur ullam repellendus illo suscipit
              perspiciatis at maxime neque exercitationem qui doloribus
              architecto reiciendis modi debitis aliquid, ex id!
            </DisclosureContent>

            <hr className='dark:border-ring/10 border-ring/20 last:hidden has-[+_button[aria-expanded=true]]:opacity-0' />
          </DisclosureItem>
        ))}
      </DisclosureRoot>
    </div>
  );
}

export function DisclosureDemo() {
  return (
    <main className='flex grow items-center justify-center py-10'>
      <section>
        <DisclosureExample type='multiple' />
        <div className='mt-5' />
        <DisclosureExample type='single' isSingleCollapsible />
        <div className='mt-5' />
        <DisclosureExample type='single' isSingleCollapsible={false} />
      </section>
    </main>
  );
}
